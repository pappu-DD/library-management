'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Book, User, LogIn } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">LibraryMS</span>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/books" className="text-gray-600 hover:text-blue-600 transition">
              Books
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition">
              Categories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">
              About
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
                <User className="w-5 h-5" />
                <span>Dashboard</span>
                </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
            <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
      </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link href="/books" className="block text-gray-600 hover:text-blue-600 transition">
              Books
            </Link>
            <Link href="/categories" className="block text-gray-600 hover:text-blue-600 transition">
              Categories
            </Link>
            <Link href="/about" className="block text-gray-600 hover:text-blue-600 transition">
              About
            </Link>
            <div className="pt-4 space-y-2">
              <Link href="/login" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                <User className="w-5 h-5" />
                <span>Dashboard</span>
            </Link>
          </div>
        </div>
        )}
      </nav>
    </header>
  );
}