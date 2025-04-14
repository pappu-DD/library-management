import { FileText, BookOpen, UserCheck, Clock } from 'lucide-react';


export default function TermsOfService() {
  const highlights = [
    {
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
      title: "Borrowing Rules",
      description: "Learn about loan periods and renewal policies"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-green-600" />,
      title: "User Responsibilities",
      description: "Your obligations as a library member"
    },
    {
      icon: <Clock className="h-8 w-8 text-amber-600" />,
      title: "Late Fees",
      description: "Understand our overdue item policies"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              The rules and guidelines for using our library services
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {highlights.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-opacity-20" style={{ backgroundColor: index === 0 ? '#6366F120' : index === 1 ? '#10B98120' : '#F59E0B20' }}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Terms Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 sm:p-10">
                <section className="mb-10">
                  <div className="flex items-start mb-6">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <span className="text-blue-800 font-bold">1</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">Membership Requirements</h2>
                      <div className="prose prose-indigo text-gray-700">
                        <p>
                          To access our library services, you must:
                        </p>
                        <ul className="space-y-2">
                          <li>Be at least 12 years of age (or have parental consent)</li>
                          <li>Provide valid identification and contact information</li>
                          <li>Agree to these terms and conditions</li>
                        </ul>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-blue-800 font-medium">
                            Children under 12 may access the library with a parent or guardian's supervision and consent.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <div className="flex items-start mb-6">
                    <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                      <span className="text-green-800 font-bold">2</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">Borrowing Policies</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <h3 className="font-semibold text-green-800 mb-2">Loan Periods</h3>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Books: 3 weeks</li>
                            <li>• DVDs: 1 week</li>
                            <li>• Audiobooks: 2 weeks</li>
                          </ul>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                          <h3 className="font-semibold text-amber-800 mb-2">Late Fees</h3>
                          <ul className="space-y-1 text-gray-700">
                            <li>• $0.25/day for books</li>
                            <li>• $1.00/day for DVDs</li>
                            <li>• Maximum $10 per item</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* More sections... */}

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
                    <p className="text-gray-700 mb-4">
                      If you have any questions about these Terms, please contact our support team.
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity">
                      Contact Support
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