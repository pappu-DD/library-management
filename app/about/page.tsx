'use client';

import { Library, Users, BookOpen, Clock, Award, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "100,000+ Books",
      description: "Extensive collection covering all genres"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "50,000 Members",
      description: "Serving a vibrant community of readers"
    },
    {
      icon: <Clock className="h-8 w-8 text-amber-600" />,
      title: "24/7 Digital Access",
      description: "E-books and audiobooks anytime, anywhere"
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Award-Winning",
      description: "Recognized for excellence in service"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Head Librarian",
      bio: "20+ years of experience in library sciences",
      img: "/team/sarah.jpg"
    },
    {
      name: "Michael Chen",
      role: "Digital Resources",
      bio: "Specializes in e-learning and digital archives",
      img: "/team/michael.jpg"
    },
    {
      name: "Emma Williams",
      role: "Community Outreach",
      bio: "Passionate about literacy programs",
      img: "/team/emma.jpg"
    },
    {
      name: "David Kim",
      role: "Technical Services",
      bio: "Keeps our systems running smoothly",
      img: "/team/david.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
    
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-6">
              <Library className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Connecting communities with knowledge since 1995
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-8">
              To empower individuals through free access to information, foster lifelong learning, 
              and build a stronger, more informed community.
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 inline-flex">
              <Heart className="h-6 w-6 text-indigo-600 mr-2" />
              <span className="text-indigo-700 font-medium">
                Non-profit organization serving the public good
              </span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By The Numbers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-opacity-20" style={{ 
                      backgroundColor: index === 0 ? '#3B82F620' : 
                                      index === 1 ? '#8B5CF620' : 
                                      index === 2 ? '#F59E0B20' : 
                                      '#10B98120' 
                    }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {[
                  {
                    year: "1995",
                    title: "Founded",
                    description: "Established with just 5,000 books in a small storefront"
                  },
                  {
                    year: "2005",
                    title: "First Expansion",
                    description: "Moved to our current location with dedicated children's section"
                  },
                  {
                    year: "2015",
                    title: "Digital Transformation",
                    description: "Launched our online catalog and e-book lending"
                  },
                  {
                    year: "2023",
                    title: "Modernization",
                    description: "Completely renovated with new technology and study spaces"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  >
                    <div className="md:w-1/2 p-4">
                      <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-4 flex justify-center md:justify-start">
                      <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
                        {item.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    {/* Placeholder for team member image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                      <Users className="h-16 w-16 text-indigo-400" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Globe className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Become Part of Our Story</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Whether you're visiting for the first time or applying to join our team, we welcome you to our library family.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-opacity-90 transition-opacity">
                Visit Us Today
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-colors">
                Volunteer Opportunities
              </button>
            </div>
          </div>
        </div>
      </main>

 
    </div>
  );
}