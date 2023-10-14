const MessagingResponse = require('twilio').twiml.MessagingResponse;
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"


export const regExCheck = (msgBody: string): boolean|undefined => {
    const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    let result: undefined|boolean;
    if (yesRegex.test(msgBody.trim().toUpperCase()) && !noRegex.test(msgBody.trim().toUpperCase())) {
        result = true
    } else if (!yesRegex.test(msgBody.trim().toUpperCase()) && noRegex.test(msgBody.trim().toUpperCase())) {
        result = false
    } else {
      result = undefined

  }

    return result;
}

export default async function handler(req, res) {
    const {
        Body
    } = req.body
    const twiml = new MessagingResponse();

    await prisma.$connect()
    await updateAccepted(Body, twiml)
    await prisma.$disconnect()
    res.writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString());
}
 

export const updateAccepted = async (msgBody: string, twiml) => {

    const yesOrNo = regExCheck(msgBody)
    if (yesOrNo === undefined) {

      return undefined;
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

export const updateDepOut = async(playerCallId, twiml) => {
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
  
export const makeCalls = async (eventInstrument: any, twiml) => {

    const deppingOut = eventInstrument.musicians.find(i => i.status === "DEP OUT")
    if (deppingOut !== undefined) {
      await updateDepOut(deppingOut.id, twiml)
    }

    const numBooked = eventInstrument.musicians.filter(i => i.accepted === true).length
    const numAwaitingReply = eventInstrument.musicians.filter(i => i.recieved === true && i.accepted === null)
    const numToBook = eventInstrument.numToBook + numAwaitingReply - numBooked
    const yetToBeCalled = eventInstrument.musicians.filter(i => i.recieved === false)
  
    if (numBooked === eventInstrument.numToBook) {
      await checkIfAllEventBooked(eventInstrument.eventId)
      return "Instrument booked."
    } else if (yetToBeCalled.length === 0) {
      return "Add musicians to list."
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

  const checkIfAllEventBooked = async (eventId) => {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      }, 
      include: {
        instrumentSections: {
          include: {
            musicians: true
          }
        }
      }
    })
    let allBooked = true
    for (let i = 0; i < event.instrumentSections.length; i++) {
      let numBooked = event.instrumentSections[i].musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
      if (numBooked !== event.instrumentSections[i].numToBook) {
        allBooked = false
        console.log(`${event.instrumentSections[i].instrumentName} not yet booked`)
        console.log(event.instrumentSections[i])
        return;
      }
    }
    console.log("All booked")
    twilioClient.messages 
    .create({ 
        body: `All instruments are booked for ${event.eventTitle}`,  
        messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
        to: process.env.PHONE 
      })
    return
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
/* const MessagingResponse = require('twilio').twiml.MessagingResponse;
import { EventInstrument, Prisma } from '@prisma/client';
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"


export type EventInstrumentWithMusiciansAndEvent = Prisma.EventInstrumentGetPayload<{
  include: {
    musicians: true,
    event: true
  }
}>

export type playerCallMsging = Prisma.PlayerCallGetPayload<{
  include: {
    musician: true,
    eventInstrument: {
      include: {
        event: true
      }
    }
  }
}>

export type EventAllBooked = Prisma.EventGetPayload<{
  include: {
    instrumentSections: {
      include: {
        musicians: true
      }
    }
  }
}>

export type EventInstrumentWithMusicians = Prisma.EventInstrumentGetPayload<{
  include: {
    musicians: true
  }
}>


export default async function handler(req, res) {
  const {
      Body
  } = req.body
  const twiml = new MessagingResponse();

  await prisma.$connect()
  await updateAccepted(Body, twiml)
  await prisma.$disconnect()
  res.writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString());
}

export const regExCheck = (msgBody: string): boolean|undefined => {
    const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    let result: undefined|boolean;
    if (yesRegex.test(msgBody.trim().toUpperCase()) && !noRegex.test(msgBody.trim().toUpperCase())) {
        result = true
    } else if (!yesRegex.test(msgBody.trim().toUpperCase()) && noRegex.test(msgBody.trim().toUpperCase())) {
        result = false
    } else {
      result = undefined

  }

    return result;
}
 

export const updateAccepted = async (msgBody: string, twiml) => {

    const yesOrNo = regExCheck(msgBody)
    if (yesOrNo === undefined) {

      return undefined;
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

export const updateDepOut = async(playerCallId, twiml) => {
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

export const checkInstrumentBooked = (eventInstrument: EventInstrumentWithMusicians) => {
  const numBooked = eventInstrument.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
  if (numBooked === eventInstrument.numToBook) {
    return true
  } else {
    return false
  }
}

export const getNumBooked = (eventInstrument: EventInstrumentWithMusicians): number => {
  return eventInstrument.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
}
  
export const makeCalls = async (eventInstrument: EventInstrumentWithMusiciansAndEvent, twiml) => {

    const deppingOut = eventInstrument.musicians.find(i => i.status === "DEP OUT")
    if (deppingOut !== undefined) {
      await updateDepOut(deppingOut.id, twiml)
    }

    const numBooked = eventInstrument.musicians.filter(i => i.accepted === true).length
    const numAwaitingReply = eventInstrument.musicians.filter(i => i.recieved === true && i.accepted === null).length
    const numToBook = eventInstrument.numToBook + numAwaitingReply - numBooked
    const yetToBeCalled = eventInstrument.musicians.filter(i => i.recieved === false)
  
    if (checkInstrumentBooked(eventInstrument) === true) {
      if(await allEventBooked(eventInstrument.eventId) === true) {
        return msgFixer(String(eventInstrument.eventId))
      }
    } else if (yetToBeCalled.length === 0) {
      return console.log("Add musicians to list.")
    } else if (numToBook > yetToBeCalled.length) {
      console.log("List is running low.")
      return;
    } else {
      for (let i = 0; i < numToBook; i ++) {
        await callPlayer(Number(eventInstrument.musicians[i].id), sendMessage)
      }
    }
    return;
  }

  export const allEventBooked = async (eventId: number) => {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      }, 
      include: {
        instrumentSections: {
          include: {
            musicians: true
          }
        }
      }
    })
    
    for (let i = 0; i < event.instrumentSections.length; i++) {
      if (checkInstrumentBooked(event.instrumentSections[i]) === false) {
        return false;
      }
    }
    return true
  }

  export const msgFixer = (eventTitle: string): void => {
    return twilioClient.messages 
    .create({ 
        body: `All instruments are booked for ${eventTitle}`,  
        messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
        to: process.env.PHONE 
      })
  }
  
  export const callPlayer = async (callId: number, messageFunc) => {
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

    //return await sendMessage(msgBody(playerCall));
    return await messageFunc(msgBody(playerCall));
  }

  export const sendMessage = (msgBody: string) => {
    return twilioClient.messages 
    .create({ 
        body: msgBody,  
        messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
        to: process.env.PHONE 
      })
  }
  
  export const msgBody = (playerCall: playerCallMsging) => {
    console.log("Hey from msgBody")
    const body = `Hi ${playerCall.musician.name},
    ${playerCall.eventInstrument.event.fixerName} ${playerCall.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
    ${`${process.env.URL}/event/${playerCall.eventInstrument.eventId}`}
    ${playerCall.eventInstrument.messageToAll !== "" ? `\n Dan says to all ${playerCall.eventInstrument.instrumentName} players for this gig: "${playerCall.eventInstrument.messageToAll}"` : ""}
    ${playerCall.playerMessage !== null ? `\n Dan says to you: "${playerCall.playerMessage}"`: ""}
    Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline.
    For other options, contact ${playerCall.eventInstrument.event.fixerName} directly.`
    
    return body;
} */



/* 
check response, id (and phone number)
  getYesOrNo
  getEventCall
    check it isn't already booked

if yes & id is good:
  update eventInstrument 
  confirm player with message 

check if instrument is booked
  if overbooked and someone depping out:
    release player (update status and accepted)
    msg player
  if booked && entire gig is booked:
    msg fixer
  if !booked && more players on the list:
    book more players
  if !booked && !more players:
    msg fixer


if no but id is good:
  if !booked && more players on the list:
    book more players
  if !booked && !more players:
    msg fixer

if response or id not recognise:
  reply to client

 */