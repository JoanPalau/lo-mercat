import NextAuth, {NextAuthOptions, Session} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/lib/prismadb"
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import { PrismaClient } from "@prisma/client";


export default NextAuth({
    session:{
        strategy: 'jwt'
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
        register: ""
      },
    adapter: PrismaAdapter(prisma),
    providers:[CredentialsProvider({
        type: 'credentials',
        credentials:{},
        async authorize(credentials,req){
          const{email,password, role}=credentials as {email: string; password: string; role: string};
          const prisma = new PrismaClient();
          const newUser = await prisma.user.create({
            data: {
            password: password,
            email: email,
            }
        })

          const user = await prisma.user.findFirst({
            where: { email: email },
          });
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
        session({ session, token, user }: any) {
          if (session.user) {
            session.user.role = token.role;
          }
          return session as Session;
        },
      },
})

