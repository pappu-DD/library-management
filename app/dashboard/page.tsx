'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import StudentDashboardComponent from './student/page';

import { 
  BookOpen, 
  Users, 
  BookCheck, 
  BookX, 
  PlusCircle,
  Search,
  Bell,
  Clock,
  BarChart,
  Settings,
  LogOut
} from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  cover: string;
  status: 'Available' | 'Borrowed';
}

const StudentDashboard = () => {
  const stats = [
    { title: 'Books Borrowed', value: '5', icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Currently Reading', value: '2', icon: BookCheck, color: 'bg-green-500' },
    { title: 'Overdue Books', value: '0', icon: BookX, color: 'bg-red-500' },
    { title: 'Reading Hours', value: '24', icon: Clock, color: 'bg-yellow-500' },
  ];

  return (
    <div className="">
      <StudentDashboardComponent />
    </div>
  );
};

const LibrarianDashboard = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    category: '',
    description: '',
    cover: '',
    status: 'Available'
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooks([...books, { ...newBook, id: Date.now() }]);
    setNewBook({
      title: '',
      author: '',
      category: '',
      description: '',
      cover: '',
      status: 'Available'
    });
    setShowAddBookModal(false);
  };

  const handleEditBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook) {
      setBooks(books.map(book => 
        book.id === selectedBook.id ? selectedBook : book
      ));
      setShowEditBookModal(false);
      setSelectedBook(null);
    }
  };

  const handleDeleteBook = (bookId: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setShowEditBookModal(true);
  };

  const stats = [
    { title: 'Total Books', value: books.length, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Available Books', value: books.filter(b => b.status === 'Available').length, icon: BookCheck, color: 'bg-green-500' },
    { title: 'Borrowed Books', value: books.filter(b => b.status === 'Borrowed').length, icon: BookX, color: 'bg-red-500' },
    { title: 'Total Members', value: '150', icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-fuchsia-400 rounded-3xl p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Librarian Dashboard</h1>
          <p className="text-white">Manage books and library operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
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

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setShowAddBookModal(true)}
              className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add New Book
            </button>
           
          </div>
        </div>

        {/* Books List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">All Books</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Programming</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleEditClick(book)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteBook(book.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>
                <button
                  onClick={() => setShowAddBookModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddBook}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newBook.category}
                      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover URL</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newBook.cover}
                      onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddBookModal(false)}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditBookModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>
                <button
                  onClick={() => {
                    setShowEditBookModal(false);
                    setSelectedBook(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditBook}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedBook.title}
                      onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedBook.author}
                      onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedBook.category}
                      onChange={(e) => setSelectedBook({ ...selectedBook, category: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover URL</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedBook.cover}
                      onChange={(e) => setSelectedBook({ ...selectedBook, cover: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={selectedBook.description}
                    onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedBook.status}
                    onChange={(e) => setSelectedBook({ ...selectedBook, status: e.target.value as 'Available' | 'Borrowed' })}
                  >
                    <option value="Available">Available</option>
                    <option value="Borrowed">Borrowed</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditBookModal(false);
                      setSelectedBook(null);
                    }}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('student');
  const [showLibrarianLogin, setShowLibrarianLogin] = useState(false);
  const [librarianCredentials, setLibrarianCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLibrarianLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (librarianCredentials.email === 'admin@gmail.com' && 
        librarianCredentials.password === 'admin123') {
      setActiveTab('librarian');
      setShowLibrarianLogin(false);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-yellow-300">
      {/* Header */}
      <header className="bg-white shadow p-2">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-red-400  m-2 rounded-3xl">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <span className=" font-medium text-white">
                  Welcome, {user?.firstName || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('student')}
              className={`${
                activeTab === 'student'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Student Dashboard
            </button>
            <button
              onClick={() => {
                if (activeTab !== 'librarian') {
                  setShowLibrarianLogin(true);
                }
              }}
              className={`${
                activeTab === 'librarian'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Librarian Dashboard
            </button>
          </nav>
        </div>

        {/* Librarian Login Modal */}
        {showLibrarianLogin && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Librarian Login</h2>
              <form onSubmit={handleLibrarianLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={librarianCredentials.email}
                      onChange={(e) => setLibrarianCredentials({...librarianCredentials, email: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={librarianCredentials.password}
                      onChange={(e) => setLibrarianCredentials({...librarianCredentials, password: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLibrarianLogin(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="mt-6">
          {activeTab === 'student' ? <StudentDashboard /> : <LibrarianDashboard />}
        </div>
      </main>
    </div>
  );
}