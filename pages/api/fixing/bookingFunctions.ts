import { PlayerCall, Prisma } from "@prisma/client"
import prisma from "../../../client"
import { OfferMessageArg, getOfferMsgBody, sendMessage } from "./messages"

export type EventInstrumentWithMusiciansAndEvent = Prisma.EventInstrumentGetPayload<{
  include: {
    musicians: true,
    event: true
  }
}>

export type EventInstrumentWithMusicians = Prisma.EventInstrumentGetPayload<{
  include: {
    musicians: true
  }
}>

export const updatePlayerCall = async (playerCallId: number, data: {}): Promise<PlayerCall> => {
  const updatedPlayerCall = await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: data
  })
  return updatedPlayerCall
}


export const getEventInstrumentStatus = async (eventInstrumentId: number) => {
  
  const eventInstrument = await getEventInstrumentAndMusicians(eventInstrumentId)

  const statusObj: {
    deppers: PlayerCall[],
    instrumentSectionId: number,
    instrumentName: string,
    eventTitle: string,
    numYetToBook: number
  } = {
    deppers: eventInstrument.musicians.filter(i => i.status === "DEP OUT"),
    instrumentSectionId: eventInstrumentId,
    instrumentName: eventInstrument.instrumentName,
    eventTitle: eventInstrument.event.eventTitle,
    numYetToBook: getNumToBook(eventInstrument)
  }

  return statusObj
}

export const getEventInstrumentandMusiciansFromCall = async (playerCallId: number): Promise<EventInstrumentWithMusicians> => {
  const playerCall = await prisma.playerCall.findUnique({
    where: {
      id: playerCallId
    },
    include: {
      eventInstrument: {
        include: {
          musicians: true
        }
      }
    }
  })
  return playerCall.eventInstrument
}

export const getNumToBook = (eventInstrument: EventInstrumentWithMusicians): number => {
  const numBooked = eventInstrument.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking" && i.status !== "DEP OUT").length
  return eventInstrument.numToBook - numBooked
}


export const getEventInstrumentAndMusicians = async (eventInstrumentId: number): Promise<EventInstrumentWithMusiciansAndEvent> => {
  const eventInstrument = await prisma.eventInstrument.findUnique({
    where: {
      id: eventInstrumentId
    },
    include: {
      musicians: true,
      event: true
    }
  })
  return eventInstrument
}

export const getEventInstrumentAndMsAndMs = async (eventInstrumentId: number): Promise<OfferMessageArg> => {
  const eventInstrument = await prisma.eventInstrument.findUnique({
    where: {
      id: eventInstrumentId
    },
    include: {
      musicians: {
        include: {
          musician: true
        }
      },
      event: true
    }
  })
  return eventInstrument
}

export const releaseDeppers = async (instrumentId: number) => {
  const eventInstrument = await getEventInstrumentAndMusicians(instrumentId)
  let numToBook = getNumToBook(eventInstrument)
  let deppers = eventInstrument.musicians.filter(i => i.status === "DEP OUT")
  if (numToBook < 0 && deppers.length > 0) {
    for (let i = 0; i < Math.abs(numToBook) && i < deppers.length; i ++) {
      let data = {
        accepted: false,
        status: "RELEASED"
      }
      await updatePlayerCall(deppers[i].id, data)
    }
  }
  return 
}


export const handleFixing = async (instrumentId: number): Promise<any> => {
  await makeOffers(instrumentId)
  await availabilityCheck(instrumentId)
  await releaseDeppers(instrumentId)
}

export const makeOffers = async (instrumentId: number): Promise<any> => {
  let eventInstrument = await getEventInstrumentAndMsAndMs(instrumentId)
  let numToBook = getNumToBook(eventInstrument)
  let numOnListYetToBook = eventInstrument.musicians.filter(i => i.recieved === false && i.bookingOrAvailability === "Booking")

  if (numToBook === 0) {
    return sendMessage(`${eventInstrument.instrumentName} is fixed for Event ${eventInstrument.event.eventTitle}.`, process.env.PHONE)
  }

  for (let i = 0; i < numToBook; i++) {
    if (i >= numOnListYetToBook.length) {
      return sendMessage(`You need to add more ${eventInstrument.instrumentName} to Event ${eventInstrument.event.eventTitle}.`, process.env.PHONE)
    } 
    let data = {
      recieved: true
    }
    let playerId = numOnListYetToBook[i].id
    await updatePlayerCall(playerId, data)
    let msgBody = getOfferMsgBody(eventInstrument, playerId)
    sendMessage(msgBody, process.env.PHONE)
  }

}

export const availabilityCheck = async (instrumentId: number): Promise<any> => {
  let eventInstrument = await getEventInstrumentAndMsAndMs(instrumentId)
  let playersToCheck = eventInstrument.musicians.filter(i => i.bookingOrAvailability === "Availability" && i.recieved === false) 
  for (let i = 0; i < playersToCheck.length; i++) {
    let data = {
      recieved: true
    }
    let playerId = playersToCheck[i].id
    await updatePlayerCall(playerId, data)
    let msgBody = getOfferMsgBody(eventInstrument, playerId)
    sendMessage(msgBody, process.env.PHONE)
  }
}