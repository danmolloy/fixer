
export type ShortEmailData = { 
  message: string 
  ensembleName: string
  fixerName: string
  dateRange: string
}

export type EmailData = {
  updateMessage?: string
  accepted: boolean|null
  dateRange: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  booking: boolean
  ensembleName: string
  personalMessage?: string
  sectionMessage?: string
  position: string
  sectionName: string
  fixerName: string
  fixerEmail: string
  fixerMobile: string
  responseURL: string
  concertProgram: string
  confirmed: boolean
  dressCode: string
  fee: string
  additionalInfo?: string
  calls: {
    date: string
    startTime: string
    endTime: string
    venue: string
  }[]
}