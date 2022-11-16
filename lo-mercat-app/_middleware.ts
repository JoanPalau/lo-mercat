import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const ROLES_ALLOWED_TO_AUTH = new Set<Role>([
  Role.ADMIN,
  Role.USER,
  Role.FARMER
]);

export default withAuth({
  callbacks: {
    authorized: ({ token }) =>
      token?.role !== undefined && ROLES_ALLOWED_TO_AUTH.has(token.role as Role),
  },
});

export const config = {
  matcher: ["/admin/:path*", "/nonAdminButSecure/:path*"],
};