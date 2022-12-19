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
    instrumentName: i,
  }))
}

const eventObj = (obj) => {
  return {
    ensemble: obj.ensemble,
    concertProgram: obj.concertProgram,
    formattedCalls: formattedCalls(obj.calls, obj.fixerEmail),
    formattedSections: formattedSections(),
    dressCode: obj.dressCode,
    fee: obj.fee,
    additionalInfo: obj.additionalInfo,
    fixerEmail: obj.fixerEmail,
  }
}

const createEvent = async(eventObj) => {
  console.log(eventObj)
  return await prisma.event.create({
    data: {
      ensembleName: eventObj.ensemble,
      concertProgram: eventObj.concertProgram,
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
    calls,
    dressCode,
    fee,
    additionalInfo,
  } = req.body

  let createEventArg = eventObj({
    ensemble,
    concertProgram,
    calls,
    fixerEmail: fixer.email,
    dressCode,
    fee,
    additionalInfo
  })

  res.status(200).json(await createEvent(createEventArg))
}

export { formattedCalls, formattedSections, eventObj, createEvent }
