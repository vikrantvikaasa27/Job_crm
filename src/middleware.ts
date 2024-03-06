import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (!token && !pathname.startsWith('/sign')) {
    return NextResponse.redirect(new URL('/signin', request.url)); /// not authenticated and accessing not auth page
  } else if (!!token && pathname.startsWith('/sign')) {
    return NextResponse.redirect(new URL('/', request.url)); /// authenticated and access the auth page
  } else if (token?.role !== 'JOBSEEKER' && pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/', request.url)); /// not the jobseeker role and access the jobseeker page
  } else if (
    token?.role !== 'COMPANY' &&
    pathname.startsWith('/dashboard/company')
  ) {
    return NextResponse.redirect(new URL('/', request.url)); /// not company role and access company page
  } else if (
    token?.role !== 'ADMIN' &&
    pathname.startsWith('/dashboard/admin')
  ) {
    return NextResponse.redirect(new URL('/', request.url)); /// not admin role and access admin page
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/profile/:path*',
    '/dashboard/company/:path*',
    '/dashboard/admin/:path*',
  ],
};
