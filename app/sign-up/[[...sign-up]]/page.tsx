import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Library Management System",
  description: "Create an account as a student or librarian",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your account type
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              footerActionLink: "text-blue-600 hover:text-blue-700",
            },
          }}
          afterSignUpUrl="/onboarding"
        />
      </div>
    </div>
  );
} 