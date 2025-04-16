import { clerkMiddleware, createRouteMatcher, getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/',
  '/books',
  '/about',
  '/contact'
]);

const isStudentRoute = createRouteMatcher([
  '/student(.*)',
  '/student/dashboard(.*)'
]);

const isLibrarianRoute = createRouteMatcher([
  '/librarian(.*)',
  '/librarian/dashboard(.*)'
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (!isPublicRoute(req)) {
    // ✅ Use getAuth here
    const { userId, sessionClaims } = getAuth(req);

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userType = (sessionClaims?.metadata as { userType?: string })?.userType;

    if (isStudentRoute(req) && userType !== 'student') {
      return new Response('Unauthorized - Student access only', { status: 403 });
    }

    if (isLibrarianRoute(req) && userType !== 'librarian') {
      return new Response('Unauthorized - Librarian access only', { status: 403 });
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
