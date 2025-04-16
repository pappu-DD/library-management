'use client';

import { BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// Mock data for demonstration
const mockBorrowedBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    dueDate: '2024-04-20',
    status: 'active',
    cover: '/book-covers/great-gatsby.jpg'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    dueDate: '2024-04-15',
    status: 'overdue',
    cover: '/book-covers/mockingbird.jpg'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    dueDate: '2024-04-25',
    status: 'active',
    cover: '/book-covers/1984.jpg'
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's an overview of your library activity.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Books Borrowed</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Books Returned</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600">Reading Time</p>
              <p className="text-2xl font-bold">24h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Borrowed Books Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Borrowed Books</h2>
        <div className="space-y-4">
          {mockBorrowedBooks.map((book) => (
            <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-1 ${
                  book.status === 'overdue' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {book.status === 'overdue' ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                  <span>Due: {book.dueDate}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 transition">
                  Return Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading History Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Reading History</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium">The Hobbit</h3>
                <p className="text-sm text-gray-600">J.R.R. Tolkien</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Returned on: 2024-04-10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 