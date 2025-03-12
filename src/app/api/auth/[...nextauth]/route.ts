
/*
<ai_context>
File sets up NextAuth with a simple Credentials Provider to auto-log a dev user in.
</ai_context>
*/

import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

const devUser = {
  id: 1,
  email: "dev@myworkout.com",
  name: "Dev User"
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      // ID can be anything, we'll call it 'dev-credentials'
      name: "Developer Credentials",
      credentials: {
        email: { label: "Email", type: "text" }
      },
      async authorize(credentials) {
        // In production, you'd do real checks:
        //  e.g. query the DB, verify password, etc.
        // For dev, we auto-sign in if environment is development or
        // if the user matches dev@myworkout.com, etc.
        if (process.env.NODE_ENV === "development") {
          // Ensure user with ID=1 exists in DB or fallback to in-memory
          // You can also create the user if it doesn't exist:
          const user = await prisma.user.findUnique({ where: { id: devUser.id } });
          if (!user) {
            // Create if doesn't exist
            await prisma.user.create({
              data: {
                id: devUser.id,
                email: devUser.email,
                name: devUser.name
              }
            });
          }
          return devUser;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  // For dev, fallback if .env is not set
  secret: process.env.NEXTAUTH_SECRET || "dev-secret"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
