import { PlayerCall } from "@prisma/client"
import { getOfferMsgBody, sendMessage } from "../messages"
import { EventSectionWithMusicians, getEventSectionAndMsAndMs, getEventSectionAndMusicians, updatePlayerCall } from "./prismaFunctions"



export const getEventInstrumentStatus = async (eventInstrumentId: number) => {
  
  const eventInstrument = await getEventSectionAndMusicians(eventInstrumentId)

  const statusObj: {
    deppers: PlayerCall[],
    instrumentSectionId: number,
    instrumentName: string,
    eventTitle: string,
    numYetToBook: number
  } = {
    deppers: eventInstrument.musicians.filter(i => i.status === "DEP OUT"),
    instrumentSectionId: eventInstrumentId,
    instrumentName: eventInstrument.ensembleSection.name,
    eventTitle: eventInstrument.event.eventTitle,
    numYetToBook: getNumToBook(eventInstrument)
  }

  return statusObj
}



export const getNumToBook = (eventInstrument: EventSectionWithMusicians): number => {
  const numBooked = eventInstrument.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking" && i.status !== "DEP OUT").length
  return eventInstrument.numToBook - numBooked
}


export const releaseDeppers = async (instrumentId: number) => {

  const eventInstrument = await getEventSectionAndMusicians(instrumentId)
  let numToBook = getNumToBook(eventInstrument)
  let deppers = eventInstrument.musicians.filter(i => i.status === "DEP OUT")

  if (numToBook <= 0 && deppers.length > 0) {
    for (let i = 0; i < deppers.length; i ++) {
      let data = {
        accepted: false,
        status: "RELEASED"
      }
      await updatePlayerCall(deppers[i].id, data)
      let msgBody = `${eventInstrument.event.fixerName} has released you from ${eventInstrument.event.eventTitle}.`
      sendMessage(msgBody, process.env.PHONE)
    }
  }
  
}


export const handleFixing = async (eventSectionId: number): Promise<any> => {
  await makeOffers(eventSectionId)
  await availabilityCheck(eventSectionId)
  await releaseDeppers(eventSectionId)
}

export const makeOffers = async (instrumentId: number): Promise<any> => {
  let eventInstrument = await getEventSectionAndMsAndMs(instrumentId)
  let numToBook = getNumToBook(eventInstrument)
  let numOnListYetToBook = eventInstrument.musicians.filter(i => i.recieved === false && i.bookingOrAvailability === "Booking")


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
  let eventInstrument = await getEventSectionAndMsAndMs(instrumentId)
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



