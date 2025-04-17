import { BookOpen, Search, User, Bookmark, Library, Clock, Users, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className=" flex flex-col bg-gradient-to-br from-sky-50 to-red-500 text-gray-900 font-sans">
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-24 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-lg rounded-b-3xl">
          <div className="container mx-auto px-6">
            <Library className="w-20 h-20 mx-auto mb-6 drop-shadow-lg" />
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Library Management System
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-100">
              Streamline your library operations with our powerful and user-friendly platform.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-white text-indigo-700 hover:bg-indigo-50 shadow-md transition"
            >
              Get Books
            </Link>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-indigo-800">✨ Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <BookOpen className="w-12 h-12 text-indigo-500" />,
                  title: 'Book Management',
                  desc: 'Easily add, edit, and organize your library’s collection with detailed cataloging.',
                },
                {
                  icon: <Users className="w-12 h-12 text-pink-500" />,
                  title: 'Member Management',
                  desc: 'Manage patron accounts, track borrowing history, and set permissions.',
                },
                {
                  icon: <Clock className="w-12 h-12 text-green-500" />,
                  title: 'Loan Tracking',
                  desc: 'Automated due date reminders and fine calculations for overdue items.',
                },
                {
                  icon: <Search className="w-12 h-12 text-yellow-500" />,
                  title: 'Advanced Search',
                  desc: 'Powerful filters for title, author, genre, and availability.',
                },
                {
                  icon: <Bookmark className="w-12 h-12 text-red-500" />,
                  title: 'Reservations',
                  desc: 'Allow patrons to reserve books and get notified when available.',
                },
                {
                  icon: <Settings className="w-12 h-12 text-blue-500" />,
                  title: 'System Configuration',
                  desc: 'Customize loan periods, fine rates, and other settings.',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl border border-gray-100 transition-transform hover:scale-[1.02]"
                >
                  {feature.icon}
                  <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-14 mt-12 rounded-t-3xl shadow-inner">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">📚 Library Management</h3>
              <p className="text-indigo-200">Empowering libraries with seamless tech since 2023.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><Link href="/books" className="hover:text-white transition">📖 Book Catalog</Link></li>
                <li><Link href="/login" className="hover:text-white transition">🔐 Staff Login</Link></li>
                <li><Link href="/about" className="hover:text-white transition">ℹ️ About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">📞 Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><Link href="/help" className="hover:text-white transition">🆘 Help Center</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">❓ FAQs</Link></li>
                <li><Link href="/tutorials" className="hover:text-white transition">📹 Tutorials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-indigo-200">
                <p>📍 123 Library Street</p>
                <p>📌 Bookville, BV 12345</p>
                <p className="mt-2">📞 (123) 456-7890</p>
                <p>✉️ info@librarysystem.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-indigo-700 mt-10 pt-8 text-center text-indigo-300">
            <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
