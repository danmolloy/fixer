import NextAuth from "next-auth"

export type UserWithEventsAndCallsAndECalls = Prisma.UserGetPayload<{
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
}>

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string
      email: string
      image: string
      instrument?: string|null
      id: string
    }
    expires: string
    userData?: UserWithEventsAndCallsAndECalls
  }
}