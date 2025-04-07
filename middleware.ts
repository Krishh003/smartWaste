import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'ADMIN';
    const isUser = token?.role === 'USER';

    // Redirect old dashboard route to home
    if (req.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Allow access to login page and public assets
    if (
      req.nextUrl.pathname === '/login' ||
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.startsWith('/api/auth') ||
      req.nextUrl.pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // If not authenticated, redirect to login without callback
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Redirect to appropriate page based on role
    if (req.nextUrl.pathname === '/') {
      if (isAdmin) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      // Regular users stay on the main page
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}; 