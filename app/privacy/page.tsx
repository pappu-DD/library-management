import { ShieldCheck, Lock, Database, Bell } from 'lucide-react';

export default function PrivacyPolicy() {
  const features = [
    {
      icon: <Lock className="h-8 w-8 text-purple-600" />,
      title: "Data Encryption",
      description: "All sensitive data is encrypted using industry-standard protocols"
    },
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "Minimal Data Collection",
      description: "We only collect what's necessary to provide our services"
    },
    {
      icon: <Bell className="h-8 w-8 text-green-600" />,
      title: "Transparent Notifications",
      description: "You'll always know when we update our policies"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">

      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Your data security is our top priority. Learn how we protect your information.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Policy Content */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 sm:p-10">
              <section className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <ShieldCheck className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Information Collection</h2>
                </div>
                <div className="ml-14">
                  <p className="text-gray-700 mb-4">
                    We collect information to provide better services to all our users. The types of information we collect include:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700">Personal identification details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700">Library usage patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700">Device and technical information</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* More sections with similar styling */}
              <section className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Data Protection</h2>
                </div>
                <div className="ml-14">
                  <p className="text-gray-700 mb-4">
                    We implement a variety of security measures to maintain the safety of your personal information:
                  </p>
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100">
                    <ul className="space-y-2">
                      <li className="text-gray-700">• 256-bit SSL encryption for all data transfers</li>
                      <li className="text-gray-700">• Regular security audits and penetration testing</li>
                      <li className="text-gray-700">• Strict access controls with multi-factor authentication</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}