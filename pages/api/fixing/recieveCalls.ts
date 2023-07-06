const MessagingResponse = require('twilio').twiml.MessagingResponse;
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"


const regExCheck = (msgBody) => {
    const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    let result: null|undefined|boolean;

    if (!yesRegex.test(msgBody.trim().toUpperCase()) && !noRegex.test(msgBody.trim().toUpperCase())) {
        result = undefined
    } else if (yesRegex.test(msgBody.trim().toUpperCase())) {
        result = true
    } else if (noRegex.test(msgBody.trim().toUpperCase())) {
        result = false
    }

    return result;
}

export default async function handler(req, res) {
    const {
        Body
    } = req.body
    const twiml = new MessagingResponse();


    await updateAccepted(Body, twiml)
    res.writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString());
}
 

const updateAccepted = async (msgBody: string, twiml) => {

    const yesOrNo = regExCheck(msgBody)
    if (yesOrNo === undefined) {
      return;
    }
    const idRegex = /\d+/g;
    const callId = Number(msgBody.match(idRegex)[0])
    const updatedPlayer = await prisma.playerCall.update({
      where: {
        id: callId
      },
      data: {
        accepted: yesOrNo
      },
      include: {
        eventInstrument: {
          include: {
            musicians: true,
            event: true
          }
        }
      }
    })
    
    await twiml.message(`We have notified the fixer you have ${yesOrNo === true ? "accepted": "declined"} offer ${updatedPlayer.id}.`)
    
    return await makeCalls(updatedPlayer.eventInstrument, twiml)
  }

  const updateDepOut = async(playerCallId, twiml) => {
    let updatedDepOut = await prisma.playerCall.update({
      where: {
        id: playerCallId
      },
      data: {
        status: "RELEASED",
        accepted: false
      }
    })

    return twiml.message(`Dan Molloy has released you from offer ${updatedDepOut.id}.`)
    
  }
  
  const makeCalls = async (eventInstrument: any, twiml) => {

    const deppingOut = eventInstrument.musicians.find(i => i.status === "DEP OUT")
    if (deppingOut !== undefined) {
      await updateDepOut(deppingOut.id, twiml)
    }

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
        //console.log("else loop called")
        //console.log(`callId: ${Number(eventInstrument.musicians[i].id)}`)
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

      ${playerCall.messageToAll !== "" ? `\n Dan says to all ${playerCall.instrumentName} players for this gig: "${playerCall.messageToAll}"` : ""}

      ${playerCall.playerMessage !== null ? `\n Dan says to you: "${playerCall.playerMessage}"`: ""}
      
      Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline.
      
      For other options, contact ${playerCall.eventInstrument.event.fixerName} directly.
    `
    
    return body;
}

