import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../client"

export const authOptions = ({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET, 
    }),
    // ...add more providers here
  ],
 /*  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  }, */
  authOptions: {},
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider.
    
      const sessionUser = await prisma.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          events: {
            include: {
              calls: true
            }
          },
          calls: {
            include: {
              event: true
            }
          },
          playerCalls: true,
          blockedUsers: true
        }
      })
      session.userData = sessionUser
      session.user.id = user.id
      session.user.instrumentList =  sessionUser.instrumentsList

      session.user.name = `${sessionUser.firstName} ${sessionUser.lastName}`
      
      console.log(`[...nextauth] called`)
      console.log(session.userData)

      return session
    }
  }
})

export default NextAuth(authOptions)