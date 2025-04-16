import { BookOpen, Search, User, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Our Library</h1>
        <p className="text-xl md:text-2xl mb-8">Discover, Borrow, and Enjoy Reading</p>
        <div className="flex justify-center gap-4">
          <Link href="/books" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Browse Books
          </Link>
          <Link href="/login" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
          <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Browse Books</h3>
          <p className="text-gray-600">Explore our extensive collection of books across various genres.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
          <Search className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Search & Find</h3>
          <p className="text-gray-600">Quickly find the books you're looking for with our advanced search.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
          <User className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
          <p className="text-gray-600">Manage your borrowed books and reading history.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
          <Bookmark className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Bookmarks</h3>
          <p className="text-gray-600">Save your favorite books for later reading.</p>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Find Your Next Read</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </section>
    </div>
  );
}
