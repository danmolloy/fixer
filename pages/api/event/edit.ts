import { Call, Event } from "@prisma/client"
import prisma from "../../../client"
import { EventWithCalls } from "../../../components/event"
import { twilioClient } from "../../../twilio"

const getandMsgAllPlayers = async (eventId: number) => {
  
  const allPlayers = await getAllPlayers(eventId)
  let sentMsgs =  []
  for (let i = 0; i < allPlayers.length; i ++) {
    sentMsgs = [sentMsgs, await sendMessage(eventId)]
  }
  
  return sentMsgs
}

const getAllPlayers = async (eventId: number) => {
  const allCalls = await prisma.call.findMany({
    where: {
      eventId: eventId
    },
    include: {
      playerCalls: true
    }
  })

  let allPlayers = [];

  for (let i = 0; i < allCalls.length; i ++) {
    allPlayers = [...allPlayers, ...allCalls[i].playerCalls.filter(i => i.accepted !== false && i.recieved === true && !allPlayers.includes(i.musicianId)).map(i => i.musicianId)]
  }
  return allPlayers
}

export const sendMessage = async (eventId: number) => {
  if (process.env.TWILIO_ACTIVE === "false") {
    return;
  }
  const msgBody = `Dan Molloy has updated Event ${eventId}. View the event page to see the changes.`;
  const MSS = 'MGa3507a546e0e4a6374af6d5fe19e9e16';
  const toNum = process.env.PHONE
  return await twilioClient.messages 
  .create({ 
     body: msgBody, 
     messagingServiceSid: MSS,      
     to: toNum 
   }) 
}

const updateEvent = async (eventObj: Event) => {
  const updatedEvent = await prisma.event.update({
    where: {
      id: eventObj.id
    },
    data: {
      ...eventObj,
      updatedAt: new Date()
    }
  })
  return updatedEvent
}

const updateCall = async (callObj: Call) => {
  const updatedCall = await prisma.call.update({
    where: {
      id: callObj.id
    },
    data: {
      startTime: new Date(callObj.startTime),
      endTime: new Date(callObj.endTime),
      venue: callObj.venue,
      updatedAt: new Date()
    }
  })

  return updatedCall
}

const updateCalls = async(callsArr: Call[]) => {
  let updatedCalls = []
  for (let i = 0; i < callsArr.length; i++) {
    let updatedCall = await updateCall(callsArr[i])
    updatedCalls = [...updatedCalls, updatedCall]
  }
  return updatedCalls;
}

const updateEventandCallsandMsg = async (eventAndCalls: {
  eventObj: Event,
  callsArr: Call[]
}) => {

  
  //const event = await updateEvent(eventAndCalls.eventObj)
  //const calls = await updateCalls(eventAndCalls.callsArr)
  const msgPlayers = await getandMsgAllPlayers(eventAndCalls.eventObj.id)
  return {/* event, calls, */ msgPlayers}
}

export default async function handle(req, res) {
  const { 
    eventObj,
    callsArr
  } = req.body



  res.status(200).json(await updateEventandCallsandMsg({eventObj, callsArr}))
}