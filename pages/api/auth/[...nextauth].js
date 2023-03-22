import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"


const prisma = new PrismaClient()


export const authOptions = ({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    process.env.VERCEL_ENV === "preview"
      ?  CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize() {
            return {
              id: 1,
              name: "John Smith",
              email: "jsmith@example.com",
              image: "https://i.pravatar.cc/150?u=jsmith@example.com",
            }
          },
        })
      : GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET, 
    }),
    // ...add more providers here
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  authOptions: {},
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log(`session API: ${JSON.stringify(session)}`)
      const sesssionUser = await prisma.user.findUnique({
        where: {
          email: user.email
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
          }
        }
      })
      session.userData = sesssionUser
      return session
    }
  }
})

export default NextAuth(authOptions)