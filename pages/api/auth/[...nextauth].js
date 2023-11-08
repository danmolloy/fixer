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
    
      const sesssionUser = await prisma.user.findUnique({
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
      session.userData = sesssionUser
      session.user.id = user.id
      session.user.instrument =  sesssionUser.instrument
      
      console.log(`[...nextauth] called`)

      return session
    }
  }
})

export default NextAuth(authOptions)