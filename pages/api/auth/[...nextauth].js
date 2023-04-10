import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../client"
import fetch from "node-fetch"

const getOrCreateUser = async (userEmail) => {
  let user = await prisma.user.findUnique({
    where: {
      email: userEmail
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

  if (user === null) {
    user = await prisma.user.create({
      data: {
        email: userEmail
      }
    })
  }


  return user
}


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
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  authOptions: {},
  callbacks: {
    /* signIn: async (profile, account) => {
      if (account.provider === 'github') {
        const res = await fetch('https://api.github.com/user/emails', {
          headers: { Authorization: `token ${account.accessToken}` },
        })
        const emails = await res.json()
        console.log(`emails: ${emails}`)
        if (emails?.length > 0) {
          profile.email = emails.sort((a, b) => b.primary - a.primary)[0].email
        }
        return true
      }
    }, */
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log(`session API: ${JSON.stringify(session)}`)
      /* const sesssionUser = await prisma.user.findUnique({
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
      session.userData = sesssionUser */
      session.userData = getOrCreateUser(user.email)
      return session
    }
  }
})

export default NextAuth(authOptions)