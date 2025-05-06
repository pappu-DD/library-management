"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, Clock, User, Calendar } from "lucide-react";
import { useBookContext } from "../context/BookContext";
import { useBooksContext } from "../context/BooksContext";

// Remove mockBooks array since we'll use the context

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status: string;
  cover: string;
  description: string;
}

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [borrowForm, setBorrowForm] = useState({
    studentId: "",
    studentName: "",
    returnDate: "",
  });
  const { addBorrowedBook } = useBookContext();
  const { books } = useBooksContext();

  const categories = [
    "All",
    "Classic",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
  ];

  // Filter books based on search and category
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBorrowSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedBook) {
      const borrowedBook = {
        ...selectedBook,
        status: "Borrowed",
        borrowDate: new Date().toISOString().split('T')[0],
        returnDate: borrowForm.returnDate,
      };
      addBorrowedBook(borrowedBook);
      alert(`Book borrowed successfully! Return by: ${borrowForm.returnDate}`);
      setSelectedBook(null);
      setBorrowForm({
        studentId: "",
        studentName: "",
        returnDate: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-yellow-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Library Catalog
          </h1>
          <p className="text-white">Browse and borrow from our collection</p>
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

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-green-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedBook(book)}
            >
              {/* Book Cover Image */}
              <div className="h-48 bg-blue-400 flex items-center justify-center">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    className="h-full w-full object-contain p-4"
                    onError={(e) => {
                      // Fallback if image fails to load
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

              {/* Book Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{book.category}</span>
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
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No books found matching your criteria
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
                      // Fallback if image fails to load
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
                        {selectedBook.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">
                          Category
                        </h3>
                        <p className="text-gray-600">{selectedBook.category}</p>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student ID
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={borrowForm.studentId}
                            onChange={(e) =>
                              setBorrowForm({
                                ...borrowForm,
                                studentId: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={borrowForm.studentName}
                            onChange={(e) =>
                              setBorrowForm({
                                ...borrowForm,
                                studentName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
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
