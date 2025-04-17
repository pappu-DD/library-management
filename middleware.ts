// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Now protecting all dashboard routes
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Public routes that don't require authentication
  const publicRoutes = ['/', '/books', '/about', '/contact', '/sign-in(.*)'];
  const isPublicRoute = publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace('(.*)', '.*')}$`);
    return regex.test(req.nextUrl.pathname);
  });

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get auth state
  const { userId } = await auth();

  // Handle unauthenticated users trying to access protected routes
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Redirect authenticated users from auth pages to dashboard
  if (userId && ['/', '/sign-in'].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow access to protected routes for authenticated users
  if (userId && isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // Default allow for other authenticated routes
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};