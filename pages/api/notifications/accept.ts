import prisma from "../../../client"
import { twilioClient } from "../../../twilio";

export default async function handle(req, res) {
  const { accepted, callId, eventInstrumentId } = req.body;
  
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
  const eventInstrument = await getEventInstrument(eventInstrumentId)
  return makeCalls(eventInstrument);
}


export const getEventInstrument = async (eventInstrumentId: number) => {
  const eventInstrument = await prisma.eventInstrument.findUnique({
    where: {
      id: eventInstrumentId
    }, 
    include: {
      musicians: true
    }
  })
  
  return eventInstrument;
}

const makeCalls = async (eventInstrument: any) => {
  const numBooked = eventInstrument.musicians.filter(i => i.accepted === true).length
  const numAwaitingReply = eventInstrument.musicians.filter(i => i.recieved === true && i.accepted === null)
  const numToBook = eventInstrument.numToBook + numAwaitingReply - numBooked
  const yetToBeCalled = eventInstrument.musicians.filter(i => i.recieved === false)

  if (numBooked === eventInstrument.numToBook) {
    console.log("Instrument booked.")
    return;
  } else if (yetToBeCalled.length === 0) {
    console.log("Add musicians to list.")
    return;
  } else if (numToBook > yetToBeCalled) {
    console.log("List is running low.")
    return;
  } else {

    for (let i = 0; i < numToBook; i ++) {
      console.log("else loop called")
      console.log(`callId: ${Number(eventInstrument.musicians[i].id)}`)
      await callPlayer(Number(eventInstrument.musicians[i].id))
    }
  }
  
  return;
}

const callPlayer = async (callId: number) => {
  const playerCall = await prisma.playerCall.update({
    where: {
      id: callId
    },
    data: {
      recieved: true
    },
    include: {
      musician: true,
      eventInstrument: {
        include: {
          event: true
        }
      }
    }
  })

  twilioClient.messages 
  .create({ 
      body: msgBody(playerCall),  
      messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
      to: process.env.PHONE 
    })
  return;
}

const msgBody = (playerCall) => {
  const body = `
    Hi ${playerCall.musician.name},

    ${playerCall.eventInstrument.event.fixerName} ${playerCall.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
    
    ${`${process.env.URL}/event/${playerCall.eventInstrument.eventId}`}
    
    Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline.
    
    For other options, contact ${playerCall.eventInstrument.event.fixerName} directly.
  `
  
  return body;
}

