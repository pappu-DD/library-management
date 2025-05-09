// app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { books } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // gets the 'id' from the URL
    const bookId = parseInt(id || "");

    const body = await req.json();

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
