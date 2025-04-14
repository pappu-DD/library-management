import { Map, Compass, Library, Users, BookOpen, FileText, HelpCircle, Mail } from 'lucide-react';


export default function Sitemap() {
  const siteSections = [
    {
      title: 'Discover',
      icon: <Compass className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-100',
      links: [
        { name: 'New Arrivals', path: '/new-arrivals', icon: '🆕' },
        { name: 'Bestsellers', path: '/bestsellers', icon: '⭐' },
        { name: 'Staff Picks', path: '/staff-picks', icon: '📌' },
        { name: 'Genres', path: '/genres', icon: '📚' },
      ],
    },
    {
      title: 'Library Services',
      icon: <Library className="h-6 w-6 text-purple-600" />,
      color: 'bg-purple-100',
      links: [
        { name: 'Borrow Items', path: '/borrow', icon: '📖' },
        { name: 'Renew Items', path: '/renew', icon: '🔄' },
        { name: 'Reserve Items', path: '/reserve', icon: '⏳' },
        { name: 'Interlibrary Loan', path: '/interlibrary-loan', icon: '📦' },
      ],
    },
    {
      title: 'Community',
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: 'bg-green-100',
      links: [
        { name: 'Events Calendar', path: '/events', icon: '📅' },
        { name: 'Book Clubs', path: '/book-clubs', icon: '👥' },
        { name: 'Volunteer', path: '/volunteer', icon: '🙋' },
        { name: 'Donate', path: '/donate', icon: '💝' },
      ],
    },
    {
      title: 'Information',
      icon: <FileText className="h-6 w-6 text-amber-600" />,
      color: 'bg-amber-100',
      links: [
        { name: 'About Us', path: '/about', icon: '🏛️' },
        { name: 'Hours & Locations', path: '/hours', icon: '⏰' },
        { name: 'Contact Us', path: '/contact', icon: '📞' },
        { name: 'FAQ', path: '/faq', icon: '❓' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <Map className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Explore Our Library</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Navigate through all the resources and services we offer
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {siteSections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`${section.color} p-4 flex items-center`}>
                    <div className="p-2 rounded-full mr-3 bg-white">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.path}
                            className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                          >
                            <span className="mr-3 text-lg">{link.icon}</span>
                            <span>{link.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <HelpCircle className="h-6 w-6 text-indigo-600 mr-3" />
                Quick Help
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <a href="/help/borrowing" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex items-center transition-colors">
                  <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">📖</span>
                  <span className="font-medium">How to Borrow</span>
                </a>
                <a href="/help/account" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex items-center transition-colors">
                  <span className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">👤</span>
                  <span className="font-medium">Account Help</span>
                </a>
                <a href="/help/technology" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex items-center transition-colors">
                  <span className="bg-green-100 text-green-800 p-2 rounded-full mr-3">💻</span>
                  <span className="font-medium">Tech Support</span>
                </a>
                <a href="/contact" className="bg-amber-50 hover:bg-amber-100 p-4 rounded-lg flex items-center transition-colors">
                  <span className="bg-amber-100 text-amber-800 p-2 rounded-full mr-3">✉️</span>
                  <span className="font-medium">Contact Form</span>
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <Mail className="h-12 w-12 opacity-90" />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2">Need Personalized Help?</h2>
                    <p className="opacity-90 mb-4 max-w-lg">
                      Our friendly staff is ready to assist you with any questions about our services or resources.
                    </p>
                    <button className="px-6 py-2 bg-white text-indigo-600 rounded-full font-medium hover:bg-opacity-90 transition-opacity">
                      Contact Our Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}