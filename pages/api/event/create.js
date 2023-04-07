import { instrumentArr } from "../../../components/fixing/fixing"
import prisma from "../../../client"

const formattedCalls = (calls, fixerEmail) => {
  return [...calls].map(i => ({
    startTime: new Date(i.startTime),
    endTime: new Date(i.endTime),
    venue: i.venue,
    fixer: { connect: { email: fixerEmail } }
  }))
}

const formattedSections = () => {
  return [...instrumentArr].map(i => ({
    instrumentName: i,s
  }))
}

const eventObj = (obj) => {
  return {
    ensemble: obj.ensemble,
    concertProgram: obj.concertProgram,
    confirmedOrOnHold: obj.confirmedOrOnHold,
    formattedCalls: formattedCalls(obj.calls, obj.fixerEmail),
    formattedSections: formattedSections(),
    dressCode: obj.dressCode,
    fee: obj.fee,
    additionalInfo: obj.additionalInfo,
    fixerEmail: obj.fixerEmail,
  }
}

const createEvent = async(eventObj) => {

  return await prisma.event.create({
    data: {
      ensembleName: eventObj.ensemble,
      concertProgram: eventObj.concertProgram,
      confirmedOrOnHold: eventObj.confirmedOrOnHold,
      calls: {
        create: eventObj.formattedCalls,
      },
      dressCode: eventObj.dressCode,
      fee: eventObj.fee,         
      additionalInfo: eventObj.additionalInfo,
      fixer: { connect: { email: eventObj.fixerEmail } },
      instrumentSections: {
        create: eventObj.formattedSections
      }
    },
  })
}

export default async function handle(req, res) {
  const { 
    fixer, 
    ensemble,
    concertProgram,
    confirmedOrOnHold,
    calls,
    dressCode,
    fee,
    additionalInfo,
  } = req.body

  let createEventArg = eventObj({
    ensemble,
    concertProgram,
    confirmedOrOnHold,
    calls,
    fixerEmail: fixer.email,
    dressCode,
    fee,
    additionalInfo
  })

  res.status(200).json(await createEvent(createEventArg))
}

export { formattedCalls, formattedSections, eventObj, createEvent }
