import { Prisma } from '@prisma/client'
import { mockPlayerCall } from '../../../../__mocks__/models/playerCall'
import { prismaMock } from '../../../../__mocks__/singleton'
import * as prismaFunctions from '../../../../pages/api/fixing/bookingFunctions/prismaFunctions'
import { mockUser } from '../../../../__mocks__/models/user'
import { mockCall } from '../../../../__mocks__/models/call'
import { mockEventSection, mockEventSectionWithMusicians } from '../../../../__mocks__/models/eventSection'

describe("updateEventSection()", () => {
  const updateEventSection = prismaFunctions.updateEventSection
  it("resolves", async() => {

    const mockData: prismaFunctions.UpdateEventSectionProps = {
      eventSectionId: Math.ceil(Math.random() * 10),
      eventSectionData: {},
      bookingOrAvailability: "Availability",
      ensembleSectionId: String(Math.floor(Math.random() * 50)),
      addedMusicians: []
    }

    prismaMock.eventSection.update.mockResolvedValue(mockEventSection)
    await expect(updateEventSection(mockData)).resolves.toEqual(mockEventSection)

  })
})

describe("createEventSection()", () => {
  const createEventSection = prismaFunctions.createEventSection
  it("resolves", async() => {

    const mockData = {
      eventId: Math.ceil(Math.random() * 40),
      ensembleSectionId: String(Math.ceil(Math.random() * 50)),
      numToBook: Math.ceil(Math.random() * 10)
    }

    prismaMock.eventSection.create.mockResolvedValue(mockEventSection)
    await expect(createEventSection(mockData)).resolves.toEqual(mockEventSection)

  })
})



describe("createPlayerCall()", () => {
  const createPlayerCall = prismaFunctions.createPlayerCall

  it("resolves", async () => {
    const playerCall = mockPlayerCall
    const mockData: {
      playerCall: Prisma.PlayerCallCreateInput,
      calls: Prisma.CallCreateNestedManyWithoutPlayerCallsInput
    } = {
      playerCall: {
        accepted: false,
        recieved: false,
        indexNumber: Math.floor(Math.random() * 10),
        eventSection: {},
        musician: {}
      },
      calls: {}
    }

    prismaMock.playerCall.create.mockResolvedValue(mockPlayerCall)
    await expect(createPlayerCall(mockData)).resolves.toEqual(mockPlayerCall)

  })
})

describe("editPlayerCall()", () => {
  const editPlayerCall = prismaFunctions.editPlayerCall

  it("resolves", async () => {
    const playerCall = mockPlayerCall
    const mockData = {
      id: Math.ceil(Math.random() * 10),
      playerCallData: {
        accepted: false,
        recieved: false,
        indexNumber: Math.floor(Math.random() * 10),
        eventSection: {},
        musician: {}
      },
      calls: {}
    }

    prismaMock.playerCall.update.mockResolvedValue(playerCall)
    await expect(editPlayerCall(mockData)).resolves.toEqual(playerCall)

  })
})

describe("updatePlayerCall()", () => {
  const updatePlayerCall = prismaFunctions.updatePlayerCall

  it("resolves", async () => {
    const playerCall = mockPlayerCall
    const mockData = {
      playerCallId: Math.ceil(Math.random() * 10),
      data: {
        accepted: false,
        recieved: false,
        indexNumber: Math.floor(Math.random() * 10),
        eventSection: {},
        musician: {}
      }
    }

    prismaMock.playerCall.update.mockResolvedValue(playerCall)
    await expect(updatePlayerCall(mockData.playerCallId, mockData.data)).resolves.toEqual(playerCall)

  })
})

describe("getEventSectionAndMsAndMs()", () => {
  const getEventSectionAndMsAndMs = prismaFunctions.getEventSectionAndMsAndMs
  it("resolves", async () => {
    const mockId = Math.ceil(Math.random() * 40)
    prismaMock.eventSection.findUnique.mockResolvedValue(mockEventSectionWithMusicians)
    await expect(getEventSectionAndMsAndMs(mockId)).resolves.toEqual(mockEventSectionWithMusicians)
  })
})

describe("getEventSectionAndMusicians", () => {
  const getEventSectionAndMusicians = prismaFunctions.getEventSectionAndMusicians
  it("resolves", async () => {
    const mockId = Math.ceil(Math.random() * 40)
    prismaMock.eventSection.findUnique.mockResolvedValue(mockEventSectionWithMusicians)
    await expect(getEventSectionAndMusicians(mockId)).resolves.toEqual(mockEventSectionWithMusicians)
  })
})

