import prisma from '../../../client'
import { RequestValues } from '../../../components/fixing/editCalls/editCalls'
import { twilioClient } from "../../../twilio"

import type { NextApiRequest, NextApiResponse } from 'next'


const getEventInstrument = async (eventInstrumentId: number) => {
  
  let callsOut = await prisma.eventInstrument.findUnique({
    where: {
      id: eventInstrumentId
    },
    include: {
      musicians: {
        include: {
          musician: true
        }
      }
    }
  })
  return callsOut
}

const updateEventDetails = async (instrumentObj) => {
  let updatedEventInstrument = await prisma.eventInstrument.update({
    where: {
      id: instrumentObj.eventInstrumentId
    },
    data: {
      callOrder: instrumentObj.callOrder,
      numToBook: Number(instrumentObj.numToBook),
      messageToAll: instrumentObj.messageToAll,
      fixerNote: instrumentObj.fixerNote,
    },
    include: {
      musicians: true
    }
  })

  return updatedEventInstrument;

}

const handleBooking = async (instrumentObj: RequestValues) => {
  let arr: any = []
  let eventInstrument = await updateEventDetails(instrumentObj)
  //console.log(`eventInstrument: ${JSON.stringify(eventInstrument)}`)

  // Add players to call list on DB
  if (instrumentObj.musicians.length > 0) {
    for (let i = 0; i < instrumentObj.musicians.length; i++) {

      if (eventInstrument.musicians.find(j => String(j.id) === instrumentObj.musicians[i].musicianId) === undefined) {
        arr = [...arr, await prisma.playerCall.create({
          data: {
            //musicianEmail: instrumentObj.musicians[i].musicianEmail,
            musicianId: instrumentObj.musicians[i].musicianId,
            eventInstrumentId: Number(instrumentObj.eventInstrumentId),
            playerMessage: instrumentObj.musicians[i].playerMessage,
            offerExpiry: instrumentObj.musicians[i].offerExpiry,
            bookingOrAvailability: instrumentObj.bookingOrAvailability,
            calls: {
              connect: instrumentObj.musicians[i].callsOffered
            }
          }
        })]
      } else {
        console.log(`${instrumentObj.musicians[i].musicianEmail} already on call list`)
      }
    }
}

  makeCalls(instrumentObj.eventInstrumentId, instrumentObj.bookingOrAvailability)
  return arr;
}


const numToCall = (eventInstrument, bookingOrAvailability) => {
  let activeCallsAndBookedLength;
  let numToCall;
  if (bookingOrAvailability === "Booking") {
    activeCallsAndBookedLength = eventInstrument.musicians.filter(i => i.recieved === true && i.accepted !== false && i.bookingOrAvailability === "Booking").length
    numToCall = eventInstrument.numToBook - activeCallsAndBookedLength
  } else {
    activeCallsAndBookedLength = eventInstrument.musicians.filter(i => i.recieved === true && i.accepted !== false && i.bookingOrAvailability === "Availability").length
    numToCall = eventInstrument.numToBook - activeCallsAndBookedLength
  }
  return numToCall
}

const makeCalls = async (eventInstrumentId: number, bookingOrAvailability: string) => {
  if (process.env.TWILIO_ACTIVE === "false") {
    return;
  }
  let eventInstrument = await getEventInstrument(eventInstrumentId)
  let eventInstrumentMusicians = eventInstrument.musicians.filter(i => i.bookingOrAvailability === bookingOrAvailability)
  let numCalls = numToCall(eventInstrument, bookingOrAvailability)
  let msgBody;


  for (let i = 0; i < numCalls; i++) {
    msgBody = `Hi ${eventInstrumentMusicians[i].musician.name}, 
    Dan Molloy ${eventInstrumentMusicians[i].bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"} 
    
    ${process.env.NGROK_URL}/event/${eventInstrument?.eventId}

    ${eventInstrument?.messageToAll !== "" ? `\n Dan says to all ${eventInstrument.instrumentName} players for this gig: "${eventInstrument?.messageToAll}"` : ""}

    ${eventInstrumentMusicians[i].playerMessage !== null ? `\n Dan says to you: "${eventInstrumentMusicians[i].playerMessage}"`: ""}

    Reply YES ${eventInstrumentMusicians[i].id} to accept or NO ${eventInstrumentMusicians[i].id} to decline. 
    
    For other options, contact Dan directly.

    ${eventInstrument?.callOrder === "Simultaneous" ? "There are other calls out" : ""}`
    //console.log(msgBody)
   twilioClient.messages 
          .create({ 
             body: msgBody,  
             messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
             to: process.env.PHONE 
           }) 
          .then(message => console.log(message.sid))
          .then(async () => await updatePlayer(eventInstrumentMusicians[i].id))
          .done();
  }

}

const updatePlayer = async(callId) => {
  // Needs to state whether booking or availability
    let updateRecieved = await prisma.playerCall.update({
      where: {
        id: callId
      },
      data: {
        recieved: true
      }
    })

    return updateRecieved; 
}



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    eventId, //
    musicians,
    //callsOutId,
    eventInstrumentId, //
    callOrder,
    numToBook,
    bookingOrAvailability,
    messageToAll, //
    fixerNote, //
    bookingStatus, //
  } = req.body

  const instrumentObj: RequestValues = {
    eventId,
    musicians,
    eventInstrumentId,
    numToBook,
    callOrder,
    bookingOrAvailability,
    messageToAll,
    fixerNote,
    bookingStatus,
  }

  /* const instrumentObj = {
    eventInstrumentId: callsOutId,
    callOrder: callOrder,
    numToBook: numToBook,
    bookingOrAvailability: bookingOrAvailability,
    musicians: musicians
  } */

 //console.log(instrumentObj)


  
 res.status(200).json(await handleBooking(instrumentObj))
  

}
