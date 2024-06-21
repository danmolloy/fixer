import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import prisma from "../client"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider.
    
      const sessionUser = await prisma.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          admins: {
            include: {
              ensemble: true
            }
          },
          
        }
      })
      if (sessionUser) {
        session.user.admins = sessionUser.admins
        session.user.name = `${sessionUser.firstName} ${sessionUser.lastName}`
      }
      return session
  }}
})