// app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { books } from "@/configs/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

// GET all books (no auth required)
export async function GET() {
  try {
    const allBooks = await db.select().from(books);
    return NextResponse.json(allBooks);
  } catch (error) {
    console.error("[BOOKS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

// POST: Create a book (requires auth)
export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    await db.insert(books).values(data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[BOOKS_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}

// PUT: Update book (requires auth)
export async function PUT(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    await db.update(books).set(data).where(eq(books.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BOOKS_PUT_ERROR]", error);
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}

// DELETE: Delete book (requires auth)
export async function DELETE(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    await db.delete(books).where(eq(books.id, id));
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("[BOOKS_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
