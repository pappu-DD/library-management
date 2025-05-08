// app/api/borrowings/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { borrowings, books, users } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all borrowings for current user with book details
    const userBorrowings = await db
      .select({
        book: books,
        borrowing: borrowings,
      })
      .from(borrowings)
      .where(eq(borrowings.userId, user.id))
      .leftJoin(books, eq(borrowings.bookId, books.id));

    const formattedBorrowings = userBorrowings.map(({ book, borrowing }) => ({
      ...book,
      borrowDate: borrowing.borrowDate,
      returnDate: borrowing.returnDate,
      dueDate: borrowing.dueDate,
      status: borrowing.status,
      borrowingId: borrowing.id,
    }));

    return NextResponse.json(formattedBorrowings);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch borrowed books' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookId, returnDate, studentId, studentName } = await request.json();

    // Get user from database
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.clerkId, clerkUserId),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create borrowing record
    const borrowDate = new Date().toISOString();
    const dueDate = returnDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    const [newBorrowing] = await db.insert(borrowings).values({
      bookId,
      userId: user.id,
      studentId,
      studentName,
      borrowDate,
      dueDate,
      status: 'Borrowed',
    }).returning();

    return NextResponse.json(newBorrowing);
  } catch (error) {
    console.error('Error creating borrowing:', error);
    return NextResponse.json(
      { error: 'Failed to create borrowing record' },
      { status: 500 }
    );
  }
}