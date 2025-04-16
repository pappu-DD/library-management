'use client';

import Link from 'next/link';
import { UserButton, SignInButton, SignUpButton, useUser, SignOutButton } from '@clerk/nextjs';
import { User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { isSignedIn, user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userType = user?.publicMetadata?.userType as string;

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Library Management
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/books"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Books
              </Link>
              <Link
                href="/about"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contact
              </Link>
              {isSignedIn && (
                <Link
                  href={userType === 'student' ? '/student/dashboard' : '/librarian/dashboard'}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <div className="flex space-x-4">
                <SignInButton mode="modal">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
                    Register
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <>
                <span className="text-sm text-gray-700">
                  {userType === 'student' ? 'Student' : 'Librarian'}
                </span>
                <SignOutButton>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                    Logout
                  </button>
                </SignOutButton>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 