'use client';

import Link from 'next/link';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';

import { useState } from 'react';
import { XMarkIcon,Bars3Icon } from '@heroicons/react/16/solid';


const Header = () => {
  const { isSignedIn } = useUser();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  return (
    <header className="bg-slate-800 shadow-2xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Library Management
              </Link>
            </div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-white hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/books"
                className="border-transparent text-white hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Books
              </Link>
              <Link
                href="/about"
                className="border-transparent text-white hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
             
              {isSignedIn && (
                <div className="relative">
                  <button
                    onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                    className="border-transparent text-white hover:border-red-500 hover:text-green-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none"
                  >
                    Dashboard
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isDashboardOpen ? 'transform rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {isDashboardOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link
                          href="/dashboard/student"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-400"
                          onClick={() => setIsDashboardOpen(false)}
                        >
                          Student Dashboard
                        </Link>
                        <Link
                          href="/dashboard/teacher"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-400"
                          onClick={() => setIsDashboardOpen(false)}
                        >
                          Librarian
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Contact and Auth - Always visible */}
          <div className="flex items-center">
            <Link
              href="/contact"
              className="sm:block bg-green-500 text-white hover:bg-green-600 rounded-md inline-flex items-center p-2 px-3 m-2 text-sm font-medium"
            >
              Contact
            </Link>
            
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Login
                </button>
              </SignInButton>
            ) : (
              <div className="hidden sm:block">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}

            {/* Mobile menu button - Visible only on mobile */}
            <div className="sm:hidden flex items-center">
              <Link
                href="/contact"
                className="bg-green-500 text-white hover:bg-green-600 rounded-md inline-flex items-center p-2 px-3 m-2 text-sm font-medium"
              >
                Contact
              </Link>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - Show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:border-red-500 hover:text-green-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/books"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:border-red-500 hover:text-green-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Books
              </Link>
              <Link
                href="/about"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:border-red-500 hover:text-green-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {isSignedIn && (
                <>
                  <div className="pl-3 pr-4 py-2">
                    <button
                      onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                      className="w-full text-left flex justify-between items-center text-base font-medium text-white hover:text-green-400"
                    >
                      Dashboard
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          isDashboardOpen ? 'transform rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    
                    {isDashboardOpen && (
                      <div className="pl-4 mt-2 space-y-2">
                        <Link
                          href="/dashboard/student"
                          className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-green-400"
                          onClick={() => {
                            setIsDashboardOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Student Dashboard
                        </Link>
                        <Link
                          href="/dashboard/teacher"
                          className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-green-400"
                          onClick={() => {
                            setIsDashboardOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Teacher Dashboard
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="pl-3 pr-4 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              )}
              
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button
                    className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:border-red-500 hover:text-green-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;