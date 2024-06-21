import { Ensemble, EnsembleAdmin } from "@prisma/client"
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

  interface Session {
    user: {
      admins: (EnsembleAdmin & { ensemble: Ensemble})[]
      mobileNumber?: any
      lastName?: string
      firstName?: string
      name: string
      email?: string
      image?: string
      instrument?: string|null
      id: string
    }
    expires: string
  }
}