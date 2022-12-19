//import prisma from '../client'
import { prismaMock } from '../../../singleton'
import { findEvent } from '../../../pages/api/event/[id]'

describe("/event/[id]", () => {
  it('Event is returned', async () => {

    const mockEvent = {
      id: "1",
      createdAt: "8 December",
      updatedAt: "8 December",
      ensembleName: "Spaghetti Symphony Orchestra",
      concertProgram: "Schoenberg",
      calls: [],
      dressCode: "Fancy dress",
      fee: "Charity",
      additionalInfo: "",
      instrumentSections: [],
      fixerEmail: "daniel@molloy.com.au"
    }
    
    prismaMock.event.findUnique.mockResolvedValue(mockEvent)
    await expect(findEvent(1)).resolves.toEqual(mockEvent)
    
  })

  //it("404 if event not found", async() => {})
})

