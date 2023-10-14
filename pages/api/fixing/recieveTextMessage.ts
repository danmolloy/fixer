import { EventInstrument, PlayerCall, Prisma } from '@prisma/client';
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { getOfferMsgBody, replyToMessage, sendMessage } from './messages';
import { getEventInstrumentStatus, getEventInstrumentandMusiciansFromCall, handleFixing, makeOffers, releaseDeppers, updatePlayerCall } from './bookingFunctions';

/* Can I do twilioClient.twml.messagingResponse? */

export default async function handler(req, res) {
  const {
      Body
  } = req.body
  const twiml = new MessagingResponse();

  await prisma.$connect()
  await handleRecievedMessage(Body, twiml)
  await prisma.$disconnect()
  res.writeHead(200, {'Content-Type': 'text/xml'}).end(twiml.toString());
}

export const handleRecievedMessage = async (msgBody: string, twiml: MessagingResponse) => {
  const playerRes = getYesOrNo(msgBody)
  const callId = getCallId(msgBody)
  const eventInstrument = await getEventInstrumentandMusiciansFromCall(callId)
  const instrumentStatus = await getEventInstrumentStatus(eventInstrument.id)
  if (playerRes === undefined || callId === undefined) {
    const reply = "Please check your response and call ID and try again."
    replyToMessage(reply, twiml)
  } else if (playerRes === true && instrumentStatus.numYetToBook < 1) {
    const data = {
      accepted: playerRes,
      bookingOrAvailability: "Availability"
    }
    const reply = "Unfortunately this gig is already booked. We have notified the fixer you are available for this work."
    await updatePlayerCall(callId, data)
    replyToMessage(reply, twiml)
  } else if (playerRes === true && instrumentStatus.numYetToBook >= 1) {
    const data = {
      accepted: playerRes,
    }
    const reply = "We have accepted this gig on your behalf."
    await updatePlayerCall(callId, data)
    replyToMessage(reply, twiml)

  } else if (playerRes === false) {
    const data = {
      accepted: playerRes,
    }
    const reply = "We have declined this gig on your behalf."
    await updatePlayerCall(callId, data)
    replyToMessage(reply, twiml)
  }
  return await handleFixing(instrumentStatus.instrumentSectionId)
}

export const getYesOrNo = (msgBody: string): boolean|undefined => {
  const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    if (yesRegex.test(msgBody.trim().toUpperCase()) && !noRegex.test(msgBody.trim().toUpperCase())) {
        return true
    } else if (!yesRegex.test(msgBody.trim().toUpperCase()) && noRegex.test(msgBody.trim().toUpperCase())) {
       return false
    } else {
      return undefined
  }
}

export const getCallId = (msgBody): number|undefined => {
  const idRegex = /\d+/g;
  if (Number(msgBody.match(idRegex) === null)) {
    return undefined
  }
  if (Number(msgBody.match(idRegex).length > 1)) {
    return undefined
  }
  return Number(msgBody.match(idRegex)[0])
}