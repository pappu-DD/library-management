'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'student' | 'librarian';
  studentId?: string;
  librarianId?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, userType: 'student' | 'librarian') => Promise<void>;
  logout: () => void;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    userType: 'student' | 'librarian';
    studentId?: string;
    librarianId?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'student' | 'librarian') => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        userType,
        ...(userType === 'student' ? { studentId: 'ST12345' } : { librarianId: 'LB12345' }),
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Redirect based on user type
      if (userType === 'student') {
        router.push('/dashboard');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    userType: 'student' | 'librarian';
    studentId?: string;
    librarianId?: string;
  }) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful registration
      const newUser: User = {
        id: '1',
        name: userData.name,
        email: userData.email,
        userType: userData.userType,
        ...(userData.userType === 'student' ? { studentId: userData.studentId } : { librarianId: userData.librarianId }),
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Redirect based on user type
      if (userData.userType === 'student') {
        router.push('/dashboard');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 