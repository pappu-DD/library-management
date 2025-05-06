"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status: string;
  cover: string;
  description: string;
  borrowDate?: string;
  returnDate?: string;
}

interface BookContextType {
  borrowedBooks: Book[];
  addBorrowedBook: (book: Book) => void;
  removeBorrowedBook: (bookId: number) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  const addBorrowedBook = (book: Book) => {
    setBorrowedBooks((prev) => [...prev, book]);
  };

  const removeBorrowedBook = (bookId: number) => {
    setBorrowedBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  return (
    <BookContext.Provider value={{ borrowedBooks, addBorrowedBook, removeBorrowedBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
} 