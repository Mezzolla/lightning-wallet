import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// Define public paths that don't require authentication
const publicPaths = ['/', '/auth/login', '/auth/register', '/auth/verify', '/auth/forgot-password'];

// This is a simplified authentication check for demo purposes
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the current path is a public path
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.startsWith(publicPath + '/'));

  // For demo purposes, use a simulated auth cookie/token
  const isAuthenticated = request.cookies.has('auth_token');

  // Redirect authenticated users away from public pages
  if (isAuthenticated && isPublicPath && path === '/') {
    return NextResponse.redirect(new URL('/lightning', request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    // Match all paths except for static files, api routes, etc.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
