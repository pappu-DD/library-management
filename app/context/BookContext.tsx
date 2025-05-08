// context/BookContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

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
  dueDate?: string;
  borrowingId?: number;
}

interface BookContextType {
  borrowedBooks: Book[];
  loading: boolean;
  refreshBorrowedBooks: () => Promise<void>;
  borrowBook: (bookId: number) => Promise<void>;
  returnBook: (borrowingId: number) => Promise<void>;
  // No addBorrowedBook here - we'll use borrowBook instead
}

const BookContext = createContext<BookContextType>({
  borrowedBooks: [],
  loading: true,
  refreshBorrowedBooks: async () => {},
  borrowBook: async () => {},
  returnBook: async () => {},
});

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshBorrowedBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/borrowings');
      if (response.ok) {
        const data = await response.json();
        setBorrowedBooks(data);
      }
    } catch (error) {
      console.error('Failed to fetch borrowed books:', error);
    } finally {
      setLoading(false);
    }
  };

  const borrowBook = async (bookId: number) => {
    try {
      const response = await fetch('/api/borrowings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });
      
      if (response.ok) {
        await refreshBorrowedBooks();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to borrow book');
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      throw error;
    }
  };

  const returnBook = async (borrowingId: number) => {
    try {
      const response = await fetch(`/api/borrowings/${borrowingId}`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        await refreshBorrowedBooks();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to return book');
      }
    } catch (error) {
      console.error('Error returning book:', error);
      throw error;
    }
  };

  useEffect(() => {
    refreshBorrowedBooks();
  }, []);

  return (
    <BookContext.Provider value={{ 
      borrowedBooks, 
      loading, 
      refreshBorrowedBooks,
      borrowBook, 
      returnBook 
    }}>
      {children}
    </BookContext.Provider>
  );
}

export const useBookContext = () => useContext(BookContext);