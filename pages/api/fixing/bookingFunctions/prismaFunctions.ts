import { PlayerCall, Prisma } from "@prisma/client";
import prisma from "../../../../client";
import { OfferMessageArg } from "../messages";

export type CreatePlayerCallData = {
  musicianId: string;
  eventInstrumentId: number;
  playerMessage: string;
  offerExpiry: number;
  bookingOrAvailability: "Booking" | "Availability";
  calls: {
      connect: {
          id: number;
      }[];
  };
}

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

export const createPlayerCall = async (data: CreatePlayerCallData): Promise<PlayerCall> => {
  return await prisma.playerCall.create({
    data
  })
}

export const updateEventInstrument = async(eventInstrumentId: number, data: {}): Promise<EventInstrumentWithMusicians> => {
  return await prisma.eventInstrument.update({
    where: {
      id: eventInstrumentId
    },
    data: data,
    include: {
      musicians: true
    }
  })
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

export const updatePlayerCall = async (playerCallId: number, data: {}): Promise<PlayerCall> => {
  const updatedPlayerCall = await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: data
  })
  return updatedPlayerCall
}