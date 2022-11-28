import { Customer, Farmer, Role } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role?: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context and trpc context
   */
  interface Session {
    user?: {
      role?: string;
    } & DefaultSession["user"];
    farmer?: Farmer,
    customer?: Customer
  }

  /** Passed as a parameter to the `jwt` callback */
  interface User {
    role?: string;
  }
}