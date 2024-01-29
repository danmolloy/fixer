import { PlayerCall, Prisma, } from "@prisma/client";
import prisma from "../../../../client";
import { OfferMessageArg } from "../messages";

export type UpdatePlayerCallProps = {
  playerCallId: number
  playerCallData: Prisma.PlayerCallUpdateInput
}

export type UpdateEventSectionProps = {
  eventSectionId: number
  eventSectionData: Prisma.EventSectionUpdateInput
  bookingOrAvailability: string
  addedMusicians: {
    musicianId: string;
    eventInstrumentId: number;
    positionTitle: string;
    indexNumber: number;
    addedMessage: string
    calls: string[];
  }[]
  ensembleSectionId: string;
}

export type CreateEnsembleSectionProps = {
  eventId: number;
  bookingOrAvailability: string
  musicians: {
    musicianId: string;
    eventInstrumentId: number;
    positionTitle: string;
    indexNumber: number;
    addedMessage: string
    calls: string[];
  }[]
  numToBook: number
  ensembleSectionId: string;
}

export type EventSectionWithMusicians = Prisma.EventSectionGetPayload<{
  include: {
    musicians: true
  }
}>

export type EventSectionWithMusiciansAndEvent = Prisma.EventSectionGetPayload<{
  include: {
    musicians: true,
    event: true,
    ensembleSection: true
  }
}>

export const updateEventSection = async (sectionObj: UpdateEventSectionProps) => {
  return await prisma.eventSection.update({
    where: {
      id: sectionObj.eventSectionId
    },
    data: sectionObj.eventSectionData,
    include: {
      musicians: true
    }
  })
}

export const createEventSection = async (sectionObj: {
  eventId: number;
  ensembleSectionId: string;
  numToBook: number;
}) => {
  return await prisma.eventSection.create({
    data: {
      event: {
        connect: {
          id: sectionObj.eventId
        }
      },
      ensembleSection: {
        connect: {
          id: sectionObj.ensembleSectionId
        }
      },
      numToBook: sectionObj.numToBook,
    }
  })
}



export const createPlayerCall = async (data: {
  playerCall: Prisma.PlayerCallCreateInput,
  calls: Prisma.CallCreateNestedManyWithoutPlayerCallsInput
}): Promise<PlayerCall> => {
  return await prisma.playerCall.create({
    data: {
      ...data.playerCall,
    calls: data.calls
    }
  })
}

export const editPlayerCall = async (data: {
  id: number;
  playerCallData: Prisma.PlayerCallUpdateInput,
  calls: Prisma.CallCreateNestedManyWithoutPlayerCallsInput
}) => {
  return await prisma.playerCall.update({
    where: {
      id: data.id
    },
    data: {
      ...data.playerCallData,
      calls: data.calls
    }
  })
}

/*  export const updateEventInstrument = async(eventInstrumentId: number, data: {}): Promise<EventInstrumentWithMusicians> => {
  return await prisma.eventInstrument.update({
    where: {
      id: eventInstrumentId
    },
    data: data,
    include: {
      musicians: true
    }
  })
} */

export const getEventSectionAndMsAndMs = async (eventSectionId: number): Promise<OfferMessageArg> => {
  const eventInstrument = await prisma.eventSection.findUnique({
    where: {
      id: eventSectionId
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

export const getEventSectionAndMusicians = async (eventSectionId: number): Promise<EventSectionWithMusiciansAndEvent> => {
  const eventInstrument = await prisma.eventSection.findUnique({
    where: {
      id: eventSectionId
    },
    include: {
      musicians: true,
      event: true,
      ensembleSection: true
    }
  })
  return eventInstrument
}

/* export const getEventInstrumentAndMsAndMs = async (eventInstrumentId: number): Promise<OfferMessageArg> => {
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
} */

/* export const getEventInstrumentAndMusicians = async (eventInstrumentId: number): Promise<EventInstrumentWithMusiciansAndEvent> => {
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
 */
export const updatePlayerCall = async (playerCallId: number, data: {}): Promise<PlayerCall> => {
  const updatedPlayerCall = await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: data
  })
  return updatedPlayerCall
}

export const getEventSectionandMusiciansFromCall = async(playerCallId: number) => {
  const eventSection = await prisma.playerCall.findUnique({
    where: {
      id: playerCallId
    },
    include: {
      eventSection: {
        include: {
          musicians: {
            include: {
              musician: true
            }
          }
        }
      }
    }
  })
  return eventSection
}