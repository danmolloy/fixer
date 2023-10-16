import { Call, Event } from "@prisma/client"
import prisma from "../../../client"
import { EventWithCalls } from "../../../components/event"
import { twilioClient } from "../../../twilio"
import { sendMessage } from "../fixing/messages"

const getandMsgAllPlayers = async (eventId: number) => {
  
  const allPlayers = await getAllPlayers(eventId)
  let sentMsgs =  []
  const msgBody = `Dan Molloy has updated Event ${eventId}. View the event page to see the changes.`;

  for (let i = 0; i < allPlayers.length; i ++) {
    sentMsgs = [sentMsgs, await sendMessage(msgBody, process.env.PHONE)]
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

const updateOrCreateCall = async (callObj: Call) => {

  try {
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

  catch(e) {
    console.log(e)
    const createCall = await prisma.call.create({
      data: {
        startTime: new Date(callObj.startTime),
        endTime: new Date(callObj.endTime),
        venue: callObj.venue,
        eventId: callObj.eventId,
        fixerId: callObj.fixerId
      }
    })
    return createCall
  } 
}

const updateCalls = async(callsArr: Call[], fixerId: string, eventId: number) => {
  let updatedCalls = []
  for (let i = 0; i < callsArr.length; i++) {
    let updatedCall = await updateOrCreateCall({...callsArr[i], fixerId: fixerId, eventId: eventId})
    updatedCalls = [...updatedCalls, updatedCall]
  }
  return updatedCalls;
}

const updateEventandCallsandMsg = async (eventAndCalls: {
  eventObj: Event,
  callsArr: Call[]
}) => {

  
  const event = await updateEvent(eventAndCalls.eventObj)
  const calls = await updateCalls(eventAndCalls.callsArr, eventAndCalls.eventObj.fixerId, eventAndCalls.eventObj.id)
  const msgPlayers = await getandMsgAllPlayers(eventAndCalls.eventObj.id)
  return { event, calls, msgPlayers}
}

export default async function handle(req, res) {
  const { 
    eventObj,
    callsArr
  } = req.body

  res.status(200).json(await updateEventandCallsandMsg({eventObj, callsArr}))
}