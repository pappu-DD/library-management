// app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db"; // adjust path to your Drizzle setup
import { books } from "@/configs/schema"; // adjust to your actual schema path
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookId = parseInt(params.id);
    const body = await req.json();

    // Update the book's status to "Borrowed"
    await db.update(books)
      .set({
        status: "Borrowed"
      })
      .where(eq(books.id, bookId));

    return NextResponse.json({ message: "Book borrowed successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json({ error: "Failed to borrow book" }, { status: 500 });
  }
}
