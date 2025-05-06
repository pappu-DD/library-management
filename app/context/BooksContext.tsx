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
}

interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (bookId: number) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (newBook: Omit<Book, 'id'>) => {
    setBooks((prev) => [...prev, { ...newBook, id: Date.now() }]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const deleteBook = (bookId: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  return (
    <BooksContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksContext() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
} 