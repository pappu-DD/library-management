'use client';

import Link from 'next/link';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';

const Header = () => {
  const { isSignedIn } = useUser();
  
  return (
    <header className="bg-slate-800 shadow-2xs">
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
                className="border-transparent text-white  hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/books"
                className="border-transparent  text-white hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Books
              </Link>
              <Link
                href="/about"
                className="border-transparent  text-white hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
             
              {isSignedIn && (
                <Link
                  href="/dashboard"
                  className="border-transparent  text-white hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
          <Link
                href="/contact"
                className=" bg-green-500  text-white hover:bg-green-600 rounded-md inline-flex items-center p-2 px-3 m-2 text-sm font-medium"
              >
                Contact
              </Link>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Login
                </button>
              </SignInButton>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;