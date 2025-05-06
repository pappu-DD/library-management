import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { AuthProvider } from './context/AuthContext';
import { ClerkProvider } from '@clerk/nextjs';
import { BookProvider } from "./context/BookContext";
import { BooksProvider } from "./context/BooksContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Library Management System",
  description: "A modern library management system for efficient book tracking and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <BooksProvider>
          <BookProvider>
            <html lang="en">
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
              >
                <Header />
                <main className="flex-grow  ">
                  {children}
                </main>
              </body>
            </html>
          </BookProvider>
        </BooksProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}
