import prisma from '../../../client'
import { RequestValues } from '../../../components/fixing/editCalls/editCalls'
import { twilioClient } from "../../../twilio"

import type { NextApiRequest, NextApiResponse } from 'next'

const checkNumToBook = async (eventInstrumentId: number) => {

  let eventInstrument = await prisma.eventInstrument.findUnique({
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

  const numPlayersBooked = eventInstrument.musicians.filter(i => i.bookingOrAvailability === "Booking" && i.accepted === true).length
  const numPlayersAwaiting = eventInstrument.musicians.filter(i => i.bookingOrAvailability === "Booking" && i.accepted === null && i.recieved === true).length

  if (eventInstrument.numToBook > (numPlayersBooked + numPlayersAwaiting)) {
    return true
  } else {
    return false
  }
}


/* const getEventInstrument = async (eventInstrumentId: number) => {
  
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
} */

const updatePlayerCall = async (playerCallId: number, recieved: boolean) => {
  let updatedPlayerCall = await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: {
      bookingOrAvailability: "Booking",
      recieved: recieved,
      accepted: null
    }, 
    include: {
      musician: true
    }
  })

  return updatedPlayerCall;

}

const handleOffer = async (playerCallId: number) => {
  let updatedPlayerCall = await updatePlayerCall(playerCallId, false)
  if (await checkNumToBook(updatedPlayerCall.eventInstrumentId) === true) {
    return makeCall(updatedPlayerCall)
  } else {
    return;
  }
  
  //return arr;
}

const makeCall = async (playerCall: any) => {
  if (process.env.TWILIO_ACTIVE === "false") {
    return;
  }
  //let eventInstrument = await getEventInstrument(playerCall.eventInstrumentId)

  let msgBody = `Hi ${playerCall.musician.name}, 
    Dan Molloy ${playerCall.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"} 
    
    ${process.env.NGROK_URL}/event/${playerCall.eventId}

    ${playerCall.messageToAll !== "" ? `\n Dan says to all ${playerCall.instrumentName} players for this gig: "${playerCall.messageToAll}"` : ""}

    ${playerCall.playerMessage !== null ? `\n Dan says to you: "${playerCall.playerMessage}"`: ""}

    Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline. 
    
    For other options, contact Dan directly.
`
    //${eventInstrument?.callOrder === "Simultaneous" ? "There are other calls out" : ""}
    //console.log(msgBody)
   twilioClient.messages 
          .create({ 
             body: msgBody,  
             messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
             to: process.env.PHONE 
           }) 
          .then(message => console.log(message.sid))
          .then(async () => await updatePlayerCall(playerCall.id, true))
          .done();
  }



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    playerCallId  
  } = req.body

  
 res.status(200).json(await handleOffer(playerCallId))
  

}
