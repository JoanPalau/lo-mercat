import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials' 
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
            const{email,password}=credentials as {email: string; password: string;};

            if(email !== "didac@exemple.com" || password!=="1234"){
                throw new Error('Ep! Credencials invalides!')
            }

            return {id: '1234', name:'Didac', email:'didac@exemple.com'};
        }
    })]
})

