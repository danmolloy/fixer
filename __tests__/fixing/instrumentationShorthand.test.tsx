import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import InstrumentationShorthand, { InstrumentationShorthandProps } from "../../components/fixing/instrumentationShorthand"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"

const mockProps: InstrumentationShorthandProps = {
  instrumentSections: [
    {...mockEventInstrumentWithMAndM, instrumentName: "Flute", numToBook: 1},
    {...mockEventInstrumentWithMAndM, instrumentName: "Oboe", numToBook: 2},
    {...mockEventInstrumentWithMAndM, instrumentName: "Clarinet", numToBook: 3},
    {...mockEventInstrumentWithMAndM, instrumentName: "Bassoon", numToBook: 4},
    {...mockEventInstrumentWithMAndM, instrumentName: "Horn", numToBook: 5},
    {...mockEventInstrumentWithMAndM, instrumentName: "Trumpet", numToBook: 6},
    {...mockEventInstrumentWithMAndM, instrumentName: "Trombone", numToBook: 7},
    {...mockEventInstrumentWithMAndM, instrumentName: "Tuba", numToBook: 8},
    {...mockEventInstrumentWithMAndM, instrumentName: "Timpani", numToBook: 9},
    {...mockEventInstrumentWithMAndM, instrumentName: "Percussion", numToBook: 10},
    {...mockEventInstrumentWithMAndM, instrumentName: "Harp", numToBook: 11},
    {...mockEventInstrumentWithMAndM, instrumentName: "Violin 1", numToBook: 12},
    {...mockEventInstrumentWithMAndM, instrumentName: "Violin 2", numToBook: 13},
    {...mockEventInstrumentWithMAndM, instrumentName: "Viola", numToBook: 14},
    {...mockEventInstrumentWithMAndM, instrumentName: "Cello", numToBook: 15},
    {...mockEventInstrumentWithMAndM, instrumentName: "Double Bass", numToBook: 16},
  ]
}

describe("<InstrumentationShorthand />", () => {
  beforeEach(() => {
    render(<InstrumentationShorthand {...mockProps} />)
  })
  it("instrumentation-shorthand is in the document", () => {
    const instrumentationShorthand = screen.getByTestId("instrumentation-shorthand")
    expect(instrumentationShorthand).toBeInTheDocument()
    expect(instrumentationShorthand.textContent).toMatch("1.2.3.45.6.7.89T.10P.11H12.13.14.15.16")
  })
  it("wind-shorthand is in the document with expected value", () => {
    const windsShorthand = screen.getByTestId("winds-shorthand")
    expect(windsShorthand).toBeInTheDocument()
    expect(windsShorthand.textContent).toMatch("1.2.3.4")
  })
  it("brass-shorthand is in the document with expected value", () => {
    const brassShorthand = screen.getByTestId("brass-shorthand")
    expect(brassShorthand).toBeInTheDocument()
    expect(brassShorthand.textContent).toMatch("5.6.7.8")
  })
  it("percussion-shorthand is in the document with expected value", () => {
    const percussionShorthand = screen.getByTestId("percussion-shorthand")
    expect(percussionShorthand).toBeInTheDocument()
    expect(percussionShorthand.textContent).toMatch("9T.10P.11H")
  })
  it("strings-shorthand is in the document with expected value", () => {
    const stringsShorthand = screen.getByTestId("strings-shorthand")
    expect(stringsShorthand).toBeInTheDocument()
    expect(stringsShorthand.textContent).toMatch("12.13.14.15.16")

  })
  it("flute numToBook is in the document with expected value", () => {
    const fluteNum = screen.getByTestId("flute-num-to-book")
    expect(fluteNum).toBeInTheDocument()
    expect(fluteNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "flute").numToBook))
  })
  it("oboe numToBook is in the document with expected value", () => {
    const oboeNum = screen.getByTestId("oboe-num-to-book")
    expect(oboeNum).toBeInTheDocument()
    expect(oboeNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "oboe").numToBook))
  })
  it("clarinet numToBook is in the document with expected value", () => {
    const clarinetNum = screen.getByTestId("clarinet-num-to-book")
    expect(clarinetNum).toBeInTheDocument()
    expect(clarinetNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "clarinet").numToBook))
  })
  it("bassoon numToBook is in the document with expected value", () => {
    const bassoonNum = screen.getByTestId("bassoon-num-to-book")
    expect(bassoonNum).toBeInTheDocument()
    expect(bassoonNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "bassoon").numToBook))
  })
  it("horn numToBook is in the document with expected value", () => {
    const hornNum = screen.getByTestId("horn-num-to-book")
    expect(hornNum).toBeInTheDocument()
    expect(hornNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "horn").numToBook))
  })
  it("trumpet numToBook is in the document with expected value", () => {
    const trumpetNum = screen.getByTestId("trumpet-num-to-book")
    expect(trumpetNum).toBeInTheDocument()
    expect(trumpetNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "trumpet").numToBook))
  })
  it("trombone numToBook is in the document with expected value", () => {
    const tromboneNum = screen.getByTestId("trombone-num-to-book")
    expect(tromboneNum).toBeInTheDocument()
    expect(tromboneNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "trombone").numToBook))
  })
  it("tuba numToBook is in the document with expected value", () => {
    const tubaNum = screen.getByTestId("tuba-num-to-book")
    expect(tubaNum).toBeInTheDocument()
    expect(tubaNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "tuba").numToBook))
  })
  it("timpani numToBook is in the document with expected value", () => {
    const timpaniNum = screen.getByTestId("timpani-num-to-book")
    expect(timpaniNum).toBeInTheDocument()
    expect(timpaniNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "timpani").numToBook))
  })
  it("percussion numToBook is in the document with expected value", () => {
    const percussionNum = screen.getByTestId("percussion-num-to-book")
    expect(percussionNum).toBeInTheDocument()
    expect(percussionNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "percussion").numToBook))
  })
  it("harp numToBook is in the document with expected value", () => {
    const harpNum = screen.getByTestId("harp-num-to-book")
    expect(harpNum).toBeInTheDocument()
    expect(harpNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "harp").numToBook))
  })

  it("violin 1 numToBook is in the document with expected value", () => {
    const violin1Num = screen.getByTestId("violin-1-num-to-book")
    expect(violin1Num).toBeInTheDocument()
    expect(violin1Num.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "violin 1").numToBook))
  })
  it("violin 2 numToBook is in the document with expected value", () => {
    const violin2Num = screen.getByTestId("violin-2-num-to-book")
    expect(violin2Num).toBeInTheDocument()
    expect(violin2Num.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "violin 2").numToBook))
  })
  it("viola numToBook is in the document with expected value", () => {
    const violaNum = screen.getByTestId("viola-num-to-book")
    expect(violaNum).toBeInTheDocument()
    expect(violaNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "viola").numToBook))
  })
  it("cello numToBook is in the document with expected value", () => {
    const celloNum = screen.getByTestId("cello-num-to-book")
    expect(celloNum).toBeInTheDocument()
    expect(celloNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "cello").numToBook))
  })
  it("double bass numToBook is in the document with expected value", () => {
    const doubleBassNum = screen.getByTestId("double-bass-num-to-book")
    expect(doubleBassNum).toBeInTheDocument()
    expect(doubleBassNum.textContent).toMatch(String(mockProps.instrumentSections.find(i => i.instrumentName.toLowerCase() === "double bass").numToBook))
  })

})