import { redirect } from "next/navigation"
import prisma from "../../../../client"
import { Call, Event } from "@prisma/client"


export const formattedCalls = (calls, fixerId) => {
  return [...calls].map(i => ({
    startTime: new Date(i.startTime),
    endTime: new Date(i.endTime),
    venue: i.venue,
    fixer: { connect: { id: fixerId } }
  }))
}


export const eventObj = (obj) => {
  return {
    //ensembleId: obj.ensembleId,
    id: Number(obj.id),
    ensembleName: obj.ensembleName,
    eventTitle: obj.eventTitle,
    concertProgram: obj.concertProgram,
    confirmedOrOnHold: obj.confirmedOrOnHold,
    formattedCalls: formattedCalls(obj.calls, obj.fixerId),
    dressCode: obj.dressCode,
    fee: obj.fee,
    additionalInfo: obj.additionalInfo,
    //fixerName: obj.fixerName,
    fixerId: obj.fixerId
  }
}

export const updateEvent = async (eventObj: Event) => {
  const updatedEvent = await prisma.event.update({
    where: {
      id: eventObj.id
    },
    data: {
      eventTitle: eventObj.eventTitle,
      ensembleName: eventObj.ensembleName,

    concertProgram: eventObj.concertProgram,
    confirmedOrOnHold: eventObj.confirmedOrOnHold,
    dressCode: eventObj.dressCode,
    fee: eventObj.fee,
    additionalInfo: eventObj.additionalInfo,
    //fixerName: obj.fixerName,
    fixerId: eventObj.fixerId,
      updatedAt: new Date()
    }
  })
  return updatedEvent
}

export const updateOrCreateCall = async (callObj: any) => {

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

export const updateCalls = async(callsArr: Call[], fixerId: string, eventId: number) => {
  let updatedCalls: Call[] = []
  for (let i = 0; i < callsArr.length; i++) {
    let updatedCall = await updateOrCreateCall({...callsArr[i], fixerId: fixerId, eventId: eventId})
    updatedCalls = [...updatedCalls, updatedCall]
  }
  return updatedCalls;
}

export const updateEventandCalls = async (eventAndCalls: {
  eventObj: any,
  callsArr: Call[]
}) => {

  
  const event = await updateEvent(eventAndCalls.eventObj)
  const calls = await updateCalls(eventAndCalls.callsArr, eventAndCalls.eventObj.fixerId, eventAndCalls.eventObj.id)
  return { event, calls }
}
