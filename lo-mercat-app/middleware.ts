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
  matcher: ["/admin/:path*", "/nonAdminButSecure/:path*"],
};
