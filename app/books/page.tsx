'use client';

import { useState } from 'react';
import { Search, Filter, BookOpen, Plus } from 'lucide-react';

// Mock data for demonstration
const mockBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    status: 'Available',
    cover: '/book-covers/great-gatsby.jpg'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Classic',
    status: 'Borrowed',
    cover: '/book-covers/mockingbird.jpg'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    category: 'Science Fiction',
    status: 'Available',
    cover: '/book-covers/1984.jpg'
  },
];

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Classic', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance'];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books Collection</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400" />
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{book.category}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {book.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}