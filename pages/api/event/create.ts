import { instrumentArr, sectionsArr } from "../../../components/fixing/fixing"
import prisma from "../../../client"

const formattedCalls = (calls, fixerId /* fixerEmail */) => {
  return [...calls].map(i => ({
    startTime: new Date(i.startTime),
    endTime: new Date(i.endTime),
    venue: i.venue,
    //fixer: { connect: { email: fixerEmail } }
    fixer: { connect: { id: fixerId } }
  }))
}

const formattedSections = () => {
  return [...sectionsArr].map(i => ({
    instrumentName: i
  }))
  /* return [...instrumentArr].map(i => ({
    instrumentName: i
  })) */
}

const eventObj = (obj) => {
  return {
    ensembleId: obj.ensembleId,
    eventTitle: obj.eventTitle,
    concertProgram: obj.concertProgram,
    confirmedOrOnHold: obj.confirmedOrOnHold,
    formattedCalls: formattedCalls(obj.calls, obj.fixerId/* obj.fixerEmail */),
    //formattedSections: formattedSections(),
    dressCode: obj.dressCode,
    fee: obj.fee,
    additionalInfo: obj.additionalInfo,
    //fixerEmail: obj.fixerEmail,
    fixerName: obj.fixerName,
    fixerId: obj.fixerId
  }
}

const createEvent = async(eventObj) => {
  
  return await prisma.event.create({
    data: {
      ensemble: {
        connect: {
          id: eventObj.ensembleId,
        }
      },
      eventTitle: eventObj.eventTitle,
      concertProgram: eventObj.concertProgram,
      confirmedOrOnHold: eventObj.confirmedOrOnHold,
      calls: {
        create: eventObj.formattedCalls,
      },
      dressCode: eventObj.dressCode,
      fee: eventObj.fee,         
      additionalInfo: eventObj.additionalInfo,
      //fixer: { connect: { email: eventObj.fixerEmail } },
      fixer: { connect: { id: eventObj.fixerId } },
      fixerName: eventObj.fixerName,
      /* instrumentSections: {
        create: eventObj.formattedSections
      } */
    },
  })
}

export default async function handle(req, res) {
  const { 
    //fixer, 
    fixerId,
    fixerName,
    ensembleId,
    eventTitle,
    concertProgram,
    confirmedOrOnHold,
    calls,
    dressCode,
    fee,
    additionalInfo,
  } = req.body

  let createEventArg = eventObj({
    ensembleId,
    eventTitle,
    concertProgram,
    confirmedOrOnHold,
    calls,
    //fixerEmail: fixer.email,
    fixerId: fixerId,
    fixerName: fixerName,
    dressCode,
    fee,
    additionalInfo
  })

  res.status(200).json(await createEvent(createEventArg))
}

export { formattedCalls, formattedSections, eventObj, createEvent }
