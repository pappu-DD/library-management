"use client";

import { useState, useEffect } from "react";
import { BookOpen, Clock, History, BookCheck } from "lucide-react";
import { useBookContext } from "../../context/BookContext";

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

export default function StudentDashboard() {
  const { borrowedBooks } = useBookContext();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const stats = [
    {
      title: "Books Borrowed",
      value: borrowedBooks.length,
      icon: BookOpen,
      color: "text-blue-500"
    },
    {
      title: "Currently Reading",
      value: borrowedBooks.filter(book => book.status === "Borrowed").length,
      icon: BookCheck,
      color: "text-green-500"
    },
    {
      title: "Overdue Books",
      value: borrowedBooks.filter(book => {
        const returnDate = new Date(book.returnDate || "");
        return returnDate < new Date() && book.status === "Borrowed";
      }).length,
      icon: Clock,
      color: "text-red-500"
    },
    {
      title: "Reading Hours",
      value: "24",
      icon: Clock,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-green-200 p-4 md:p-8 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your reading activity.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Reading Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Currently Reading</h2>
            <span className="text-sm text-gray-500">{borrowedBooks.length} books</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-24 bg-gray-100 rounded flex items-center justify-center">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Return by: {book.returnDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reading History Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Reading History</h2>
            <span className="text-sm text-gray-500">{borrowedBooks.length} books</span>
          </div>
          <div className="space-y-4">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-24 bg-gray-100 rounded flex items-center justify-center">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Borrowed: {book.borrowDate} - Returned: {book.returnDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedBook.title}</h2>
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
                    {selectedBook.cover ? (
                      <img
                        src={selectedBook.cover}
                        alt={selectedBook.title}
                        className="w-full h-48 object-contain"
                      />
                    ) : (
                      <BookOpen className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-1">Description</h3>
                      <p className="text-gray-600">{selectedBook.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">Category</h3>
                        <p className="text-gray-600">{selectedBook.category}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">Status</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedBook.status === "Borrowed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {selectedBook.status}
                        </span>
                      </div>
                    </div>
                    {selectedBook.borrowDate && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-1">Borrowing Details</h3>
                        <p className="text-gray-600">
                          Borrowed on: {selectedBook.borrowDate}
                          {selectedBook.returnDate && ` | Return by: ${selectedBook.returnDate}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 