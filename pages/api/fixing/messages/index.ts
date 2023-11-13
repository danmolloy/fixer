import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { twilioClient } from "../../../../twilio"
import { Prisma } from "@prisma/client";

export type OfferMessageArg = Prisma.EventInstrumentGetPayload<{
  include: {
    musicians: {
      include: {
        musician: true
      }
    },
    event: true
  }
}>

export const getOfferMsgBody = (instrument: OfferMessageArg, playerCallId: number): string => {
  const playerCall = instrument.musicians.find(i => i.id === playerCallId)
  const body = `Hi ${playerCall.musician.firstName},
  ${instrument.event.fixerName} ${playerCall.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
  ${`${process.env.URL}/event/${instrument.eventId}`}
  ${instrument.messageToAll !== "" ? `\n Dan says to all ${instrument.instrumentName} players for this gig: "${instrument.messageToAll}"` : ""}
  ${playerCall.playerMessage !== null ? `\n Dan says to you: "${playerCall.playerMessage}"`: ""}
  Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline.
  For other options, contact ${instrument.event.fixerName} directly.`
  
  return body;

}

export const replyToMessage = async (msgBody: string, twiml: MessagingResponse) => {
  return twiml.message(msgBody)
}

export const sendMessage = async (body: string, number: string) => {
    return twilioClient.messages 
      .create({ 
          body: body,  
          messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
          to: number 
        })
  
}