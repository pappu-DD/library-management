'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'student' | 'librarian'>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await user.update({
        publicMetadata: {
          userType: selectedType
        }
      });
      
      router.push(selectedType === 'student' ? '/student/dashboard' : '/librarian/dashboard');
    } catch (error) {
      console.error('Error updating user type:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select your account type
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedType('student')}
                className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  selectedType === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setSelectedType('librarian')}
                className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  selectedType === 'librarian'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Librarian
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 