
import CredentialsProvider from "next-auth/providers/credentials";

import { NextAuthOptions } from "next-auth";

import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      Credentials: {
        email: { label: "email", type: 'text' },
        password: { label: "password", type: "text" }
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("please provide an email and password")
        }

        try {
          await connectToDatabase()
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("no user found with this")
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) {
            throw new Error("invalid credintials")
          }

          return {
            id: user?._id.toString(),
            email: user?.email
          }
        } catch (error) {
          console.error(error)
          throw error
        }

      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id
          }
          return token;
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.id as string
          }
          return session
        }
      },
      pages: {
        signIn: '/login',
        error: '/login'
      },
      session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
      },
      secret: process.env.NEXTAUTH_SECRET,
    })
  ]
}