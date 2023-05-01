import prisma from "../../../client"

export default async function handle(req, res) {
  const { accepted, callId, eventInstrumentId } = req.body;
  console.log(req.body)
  res.status(200).json(await updateAccepted(accepted, callId, eventInstrumentId))
}

const updateAccepted = async (accepted: boolean, callId: number, eventInstrumentId: number) => {
  return await prisma.playerCall.update({
    where: {
      id: callId
    },
    data: {
      accepted: accepted
    }
  }).then(() => nextCall(eventInstrumentId))
}

const nextCall = async (eventInstrumentId: number) => {
  const eventInstrument = getEventInstrument(eventInstrumentId)
  playersToCall(await eventInstrument)
  return;
}


const getEventInstrument = async (eventInstrumentId: number) => {
  const eventInstrument = await prisma.eventInstrument.findUnique({
    where: {
      id: eventInstrumentId
    }, 
    include: {
      musicians: true
    }
  })
  
  return;
}

const playersToCall = (eventInstrument: any) => {
  //console.log(eventInst)
  /* const numToCall = eventInstrument.numToBook
  console.log(`booked: ${eventInstrument.musicians.filter(i => i.accepted === true)}`)
  console.log(`numToBook: ${eventInstrument.numToBook}`)
  const callList = eventInstrument.musicians.filter(i => i.recieved === null)
  console.log(callList) */
  return;
}
