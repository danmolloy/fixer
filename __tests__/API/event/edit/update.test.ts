import { instrumentArr } from '../../../../components/fixing/fixing'
import { formattedSections } from '../../../../pages/api/event/create'


describe("formattedSections function", () => {
  it("returns expected value", () => {
    expect(formattedSections()).toEqual([...instrumentArr].map(i => ({
      instrumentName: i
    })))
  })
})

