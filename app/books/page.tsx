"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, BookOpen, Clock, User, Calendar } from "lucide-react";
import { useBookContext } from "../context/BookContext";
import { useUser } from "@clerk/nextjs";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status: string;
  cover: string;
  description: string;
  borrowDate?: string | null;
  returnDate?: string | null;
  dueDate?: string | null;
}
export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [borrowForm, setBorrowForm] = useState({
    returnDate: "",
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addBorrowedBook } = useBookContext();
  const { user } = useUser();

  const categories = [
    "All",
    "Classic",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
  ];

  const fetchBooks = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/books?userId=${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (e: any) {
      console.error("Failed to fetch books:", e);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = books.filter((book) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const titleLower = book.title?.toLowerCase() || "";
    const authorLower = book.author?.toLowerCase() || "";

    const matchesSearch =
      titleLower.includes(searchQueryLower) ||
      authorLower.includes(searchQueryLower) ||
      book.description?.toLowerCase().includes(searchQueryLower);

    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBorrowSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedBook && user) {
      const borrowData = {
        bookId: selectedBook.id,
        userId: user.id,
        status: "Borrowed",
        borrowDate: new Date().toISOString(),
        dueDate: borrowForm.returnDate,
      };

      try {
        const bookResponse = await fetch(`/api/books`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedBook.id,
            status: "Borrowed",
          }),
        });

        if (!bookResponse.ok) {
          throw new Error("Failed to update book status");
        }

        const borrowResponse = await fetch(`/api/borrowed-books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(borrowData),
        });

        if (!borrowResponse.ok) {
          throw new Error("Failed to create borrowed book record");
        }

        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === selectedBook.id
              ? {
                  ...book,
                  status: "Borrowed",
                  borrowDate: borrowData.borrowDate,
                  dueDate: borrowData.dueDate,
                }
              : book
          )
        );

        const borrowedBook = {
          ...selectedBook,
          status: "Borrowed",
          borrowDate: borrowData.borrowDate,
          dueDate: borrowData.dueDate,
          returnDate: undefined, // or null if you prefer
        };

        addBorrowedBook(borrowedBook);
        alert(`Book borrowed successfully! Due date: ${borrowForm.returnDate}`);
        setSelectedBook(null);
        setBorrowForm({
          returnDate: "",
        });
      } catch (error) {
        console.error("Error borrowing book:", error);
        alert("Failed to borrow book. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-yellow-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            My Borrowed Books
          </h1>
          <p className="text-white">View and manage your borrowed books</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-2xs mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or description..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" />
              <select
                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading your books...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-green-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="h-48 bg-blue-400 flex items-center justify-center">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      className="h-full w-full object-contain p-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/default-book-cover.png";
                        (e.target as HTMLImageElement).className =
                          "h-32 w-32 object-contain";
                      }}
                    />
                  ) : (
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {book.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                  {book.dueDate && (
                    <div className="mt-2 text-xs text-gray-500">
                      Due: {new Date(book.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {books.length === 0
                ? "You haven't borrowed any books yet."
                : "No books found matching your criteria"}
            </p>
          </div>
        )}

        {/* Book Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedBook.title}
                    </h2>
                    <p className="text-gray-600">{selectedBook.author}</p>
                  </div>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-1 bg-gray-100 rounded-lg flex items-center justify-center p-4">
                    <div className="h-48 bg-blue-400 flex items-center justify-center">
                      {selectedBook.cover ? (
                        <img
                          src={selectedBook.cover}
                          alt={`Cover of ${selectedBook.title}`}
                          className="h-full w-full object-contain p-4"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/default-book-cover.png";
                            (e.target as HTMLImageElement).className =
                              "h-32 w-32 object-contain";
                          }}
                        />
                      ) : (
                        <BookOpen className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-1">
                        Description
                      </h3>
                      <p className="text-gray-600">
                        {selectedBook.description ||
                          "No description available."}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">
                          Category
                        </h3>
                        <p className="text-gray-600">
                          {selectedBook.category || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">
                          Status
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedBook.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedBook.status}
                        </span>
                      </div>
                    </div>
                    {selectedBook.borrowDate && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-1">
                          Borrow Date
                        </h3>
                        <p className="text-gray-600">
                          {new Date(
                            selectedBook.borrowDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {selectedBook.dueDate && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-1">
                          Due Date
                        </h3>
                        <p className="text-gray-600">
                          {new Date(selectedBook.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Borrow Form */}
                {selectedBook.status === "Available" && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Borrow This Book
                    </h3>
                    <form onSubmit={handleBorrowSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Return Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={borrowForm.returnDate}
                            onChange={(e) =>
                              setBorrowForm({
                                ...borrowForm,
                                returnDate: e.target.value,
                              })
                            }
                            required
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setSelectedBook(null)}
                          className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Borrow Book
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
