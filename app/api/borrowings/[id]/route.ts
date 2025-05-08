// app/api/borrowings/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { borrowings, users } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    // Verify authentication
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Parse and validate request body
    const requestBody = await request.json();
    const { bookId, returnDate, studentId, studentName } = requestBody;

    if (!bookId || !returnDate || !studentId || !studentName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.clerkId, clerkUserId),
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create borrowing record
    const [newBorrowing] = await db.insert(borrowings).values({
      bookId,
      userId: user.id,
      studentId,
      studentName,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: returnDate,
      status: 'Borrowed',
    }).returning();

    return NextResponse.json(newBorrowing);

  } catch (error) {
    console.error('Error creating borrowing:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}