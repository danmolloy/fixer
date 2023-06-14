import prisma from '../../../client'
import { RequestValues } from '../../../components/fixing/editCalls/editCalls'
import { twilioClient } from "../../../twilio"

import type { NextApiRequest, NextApiResponse } from 'next'

// Get Eventinstrument
// Try next person

const handleOffer = async (deppingObj) => {
  const eventInstrument = await getEventInstrument(deppingObj.eventInstrumentId)
  const nextOnList = eventInstrument.musicians.find(i => i.recieved === false)
  if (nextOnList === undefined) {
    console.log("No players on list")
    return;
  } else {
    await updateToDepOut(deppingObj.playerCallId)
    await callPlayer(nextOnList)
  }
}

const getEventInstrument = async(eventInstrumentId) => {
  // Player to Dep, 
  // Send message
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

  return eventInstrument
}

const updateToDepOut = async(playerCallId) => {
  let playerCall = await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: {
      status: "DEP OUT"
    }
  })
  return playerCall
}


const updateReceived = async (playerCallId) => {
  let playerCall = await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: {
      recieved: true
    }
  })
  return playerCall
}


const callPlayer = async (playerCall) => {

  const msgBody = `Hi ${playerCall.musician.name}, 
  Dan Molloy ${playerCall.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"} 
  
  ${process.env.NGROK_URL}/event/${playerCall.eventId}

  ${playerCall.messageToAll !== "" && playerCall.messageToAll !== undefined ? `\n Dan says to all ${playerCall.instrumentName} players for this gig: "${playerCall.messageToAll}"` : ""}

  ${playerCall.playerMessage !== null ? `\n Dan says to you: "${playerCall.playerMessage}"`: ""}

  Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline. 
  
  For other options, contact Dan directly.
`

  twilioClient.messages 
          .create({ 
             body: msgBody,  
             messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
             to: process.env.PHONE 
           }) 
          .then(message => console.log(message.sid))
          .then(async () => await updateReceived(Number(playerCall.id)))
          .done();
  return;
}



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    playerCallId,
    eventInstrumentId
  } = req.body

  const deppingObj = {
    playerCallId,
    eventInstrumentId,
  }

  //console.log(JSON.stringify(deppingObj))
  
  res.status(200).json(await handleOffer(deppingObj))
  

}
