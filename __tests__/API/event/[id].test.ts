import { mockEvent } from '../../../__mocks__/models/event'
import { prismaMock } from '../../../__mocks__/singleton'
import { findEvent } from '../../../pages/api/event/[id]'

describe("/event/[id]", () => {
  it('Event is returned', async () => {
    prismaMock.event.findUnique.mockResolvedValue(mockEvent)
    expect(await findEvent(mockEvent.id)).toEqual(mockEvent)
  })
})

