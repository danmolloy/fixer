const MessagingResponse = require('twilio').twiml.MessagingResponse;
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"

const twiml = new MessagingResponse();

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

    await updateAccepted(Body)
    res.writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString());
}
 

const updateAccepted = async (msgBody: string) => {
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
    twiml.message(`We have notified the fixer you have ${yesOrNo === true ? "accepted": "declined"} offer ${callId}.`)
    
    return await makeCalls(updatedPlayer.eventInstrument)
  }
  
  const makeCalls = async (eventInstrument: any) => {
    console.log("At makeCalls")
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
      
      Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline.
      
      For other options, contact ${playerCall.eventInstrument.event.fixerName} directly.
    `
    
    return body;
}

