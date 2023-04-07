import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string
      email: string|null
      image: string
    }
    expires: string
    userData?: {
      id: string
      name: string
      email: string
      emailVerified: null|boolean
      image: string
      instrument: string
      profileInfo: null|string
      isFixer: null|boolean
      events: {
        id: number
        createdAt: string
        updatedAt: string
        ensembleName: string
        concertProgram: string
        confirmedOrOnHold: string
        dressCode: string
        fee: string
        additionalInfo: string
        fixerEmail: string
        calls: {
          id: number
          createdAt: string
          updatedAt: string
          startTime: string
          endTime: string
          venue: string
          eventId: number
          fixerEmail: string
        }[]
      }[]
      calls: {
        id: number
          createdAt: string
          updatedAt: string
          startTime: string
          endTime: string
          venue: string
          eventId: number
          fixerEmail: string
          event: {
            id: number
            createdAt: string
            updatedAt: string
            ensembleName: string
            concertProgram: string
            confirmedOrOnHold: string
            dressCode: string
            fee: string
            additionalInfo: string
            fixerEmail: string
          }
      }[]
    }
  }
}