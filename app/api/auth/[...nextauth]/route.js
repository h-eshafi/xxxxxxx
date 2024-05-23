import   nextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import NextAuth from "next-auth";
//  import { compare } from "bcryptjs";
 import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";


export const authOption = {
  adapter:  PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
   
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        try {
          //check if user exist
          const user = await prisma.user.findUnique({
            where: { email: credentials.email},
          });
          if (!user) {
            return console.log("user not found")
          } 

          // check if password match
          const passwordsMatching = await bcrypt.compare(
            credentials.password,
            user.password
          );
            if (!passwordsMatching) {
              return  console.log("password not match")

          }

          return user;
        } catch (e) {
          console.log("error: ", e);
        }

        return user; 
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/AuthPage",
  },
  callbacks:
   {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        // token.name = user.name;
        // token.photoUrl = user.photoUrl;
        // token.alreadyEntered = user.alreadyEntered;
        // token.is_token_used = user.is_token_used;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        // session.user.name = token.name;
        // session.user.photoUrl = token.photoUrl;
        // session.user.alreadyEntered = token.alreadyEntered;
        // session.user.is_token_used = token.is_token_used;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };