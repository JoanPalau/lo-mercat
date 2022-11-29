import NextAuth, {NextAuthOptions, Session} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default NextAuth({
    session:{
        strategy: 'jwt'
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
      },
    providers:[CredentialsProvider({
        type: 'credentials',
        credentials:{},
        async authorize(credentials,req){
          let {email, password, role}=credentials as {email: string; password: string; role: string};
          const user = await prisma.user.findFirst({
            where: { email: email },
          });
          let result = await bcrypt.compare(password, user.password);
          if (result){
            return user;
          }
          return null;
    }}),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    callbacks: {
        jwt({ token, user }:any) {
          if (user) {
            token.role = user.role;
          }
          return token;
        },
        async session({ session, token, user }: any) {
          if (session.user) {
            session.user.role = token.role;
            let user = await prisma.user.findFirst({
              where: { email: session.user.email },
            });
            let id : string = user.id;
            session.farmer = await prisma.farmer.findFirst({
              where: { userId: id },
            })
            
            session.customer = await prisma.customer.findFirst({
              where: { userId: id },
            })
          }

          
          return session as Session;
        },
      },
})

