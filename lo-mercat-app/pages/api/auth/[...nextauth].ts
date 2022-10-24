import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { userAgent } from "next/server";
import { useContext } from "react";
import { UserContext } from "../../_app";




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
            const{email,password, role}=credentials as {email: string; password: string; role: string};


            if(email !== "didac@exemple.com" || password!=="1234"){
                throw new Error('Ep! Credencials invalides!')
            }
            else{
            }
            return {id: '1234', name:'Didac', email:'didac@exemple.com', role: role};
        }
    })],
    callbacks: {
        jwt({ token, user }) {
          if (user) {
            token.role = user.role;
          }
          return token;
        },
        session({ session, token, user }) {
          if (session.user) {
            session.user.role = token.role;
          }
          return session;
        },
      },
})

