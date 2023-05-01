const MessagingResponse = require('twilio').twiml.MessagingResponse;
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"

const twiml = new MessagingResponse();

const regExCheck = (msgBody) => {
    console.log(`regExCheck msgBody: ${msgBody}`)
    const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    //const idRegex = /\d+/g;
    let result;

    if (!yesRegex.test(msgBody.trim().toUpperCase()) && !noRegex.test(msgBody.trim().toUpperCase())) {
        result = undefined
    } else if (yesRegex.test(msgBody.trim().toUpperCase())) {
        result = true
    } else if (noRegex.test(msgBody.trim().toUpperCase())) {
        result = false
    }
    console.log(`result at regExCheck: ${result}`)

    return result;
}

const handleTrue = async (msgBody) => {
    const idRegex = /\d+/g;
    const callId = Number(msgBody.match(idRegex)[0])
    
    let result = await prisma.playerCall.update({
        where: {
          id: callId
        },
        data: {
          accepted: true
        }
      })
      twiml.message(`We have notified the fixer you have accepted offer ${idRegex}.`)
    
    return handleNextCall(result);
   
}

const handleFalse = async(msgBody) => {
    const idRegex = /\d+/g;
    twiml.message('We have notified the fixer you have declined this work.');
    twiml.toString()
    let result = await prisma.playerCall.update({
        where: {
            id: Number(msgBody.match(idRegex)[0])
        },
        data: {
            accepted: false,
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


    return handleNextCall(result);
}

const handleNextCall = (result) => {
    
    return;
}

const handleMessage = async (msgBody) => {
    let response = regExCheck(msgBody)
     if (response === true) {
        return await handleTrue(msgBody)
    } else if (response === false) {
        return await handleFalse(msgBody)
    } else {
        return twiml.message('Please respond either YES to accept or NO to decline');
    }
}

export default async function handler(req, res) {
    const {
        Body
    } = req.body

    console.log(`Body at handler: ${Body}`)

    //handleMessage(Body)
    res.status(200).json(await updateAccepted(Body));
    //res.end(twiml.toString());
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
      }
    })
    twiml.message(`We have notified the fixer you have accepted offer ${idRegex}.`)
    return(updatedPlayer)
  }
  /* 
  const nextCall = async (eventInstrumentId: number) => {
    const eventInstrument = await getEventInstrument(eventInstrumentId)
    return makeCalls(eventInstrument);
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
    
    return eventInstrument;
  }
  
  const makeCalls = async (eventInstrument: any) => {
    const numBooked = eventInstrument.musicians.filter(i => i.accepted === true).length
    const numToBook = eventInstrument.numToBook - numBooked
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
    */