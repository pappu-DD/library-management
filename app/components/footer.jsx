'use client';

import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Mail, Phone, MapPin, Clock, BookOpenCheck 
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms and condition', path: '/terms' },
    { name: 'SiteMap', path: '/sitemap' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, text: '123 Library St, Knowledge City' },
    { icon: <Mail className="w-5 h-5" />, text: 'info@libromanage.com' },
    { icon: <Phone className="w-5 h-5" />, text: '+1 (555) 123-4567' },
    { icon: <Clock className="w-5 h-5" />, text: 'Mon-Fri: 9am - 8pm, Sat-Sun: 10am - 6pm' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, path: 'https://facebook.com' },
    { icon: <Twitter className="w-5 h-5" />, path: 'https://twitter.com' },
    { icon: <Instagram className="w-5 h-5" />, path: 'https://instagram.com' },
    { icon: <Linkedin className="w-5 h-5" />, path: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpenCheck className="w-8 h-8 text-indigo-400" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                LibroManage
              </span>
            </div>
            <p className="text-gray-400">
              Modern library management system for the digital age. Connecting readers with knowledge since 2010.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link 
                  key={index} 
                  href={social.path} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    _blank="true"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="mt-0.5 text-indigo-400">{item.icon}</span>
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-400">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and events.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} LibroManage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}