import { NextResponse, userAgent } from 'next/server'

import { Role } from "@prisma/client";
import { withAuth } from "next-auth/middleware";

import type { NextRequest } from 'next/server'
const ROLES_ALLOWED_TO_AUTH = new Set<Role>([
  Role.ADMIN,
  Role.USER,
  Role.FARMER
]);

const mobileRedirects = new Set<string>(['/']);

const customActions = (request: NextRequest) => {
  const { device } = userAgent(request);

  if(device.type !== 'mobile' && mobileRedirects.has(request.nextUrl.pathname)){
    return NextResponse.redirect(new URL('/landing', request.url));
  }
  return NextResponse.next();
}

export default withAuth(
  function middleware(request: NextRequest) {
    return customActions(request);
  },
  {
  callbacks: {
    authorized: ({ token }) =>
      token?.role !== undefined && ROLES_ALLOWED_TO_AUTH.has(token.role as Role),
  },
});

export const config = {
  // matcher: ["/admin/:path*", "/nonAdminButSecure/:path*"],
  matcher: ["/(.*)"],
};

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  const locale = req.cookies.get('NEXT_LOCALE')
  if (locale != undefined && req.nextUrl.locale != locale.value) {
    console.log('Redirecting from: ' + req.nextUrl.locale + ' to: ' + `/${locale.value}${req.nextUrl.pathname}${req.nextUrl.search}`)
    return NextResponse.redirect(
      new URL(`/${locale.value}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}
