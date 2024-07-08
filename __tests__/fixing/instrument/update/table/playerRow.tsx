import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { mockUser } from "../../../../../__mocks__/models/user"
import PlayerRow, { PlayerRowProps } from "../../../../../components/fixing/instrument/update/table/playerRow"
import { mockCall } from "../../../../../__mocks__/models/call"
import { mockContactMessageForTable } from "../../../../../__mocks__/models/contactMessage"

const mockProps: PlayerRowProps = {
  contactMessage: mockContactMessageForTable,
  allEventCalls: [mockCall]
}

describe("<PlayerRow />", () => {
  beforeEach(() => {
    render(
    <table data-testid="table">
      <tbody>
        <PlayerRow {...mockProps}/>
      </tbody>
    </table>)
  })

  it("player-row is in the document", () => {
    const playerRow = screen.getByTestId(`${mockProps.contactMessage.id}-row`)
    expect(playerRow).toBeInTheDocument()
  })

  it("user name is in the document", () => {
    const userName = screen.getByText(`${mockProps.contactMessage.contact.firstName} ${mockProps.contactMessage.contact.lastName}`)
    expect(userName).toBeInTheDocument()
  })

  it("playerRowMenu btn is in the document, rendering playerRowMenu on click", () => {
    const menuBtn = screen.getByTestId('player-row-menu-btn')
    expect(menuBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuBtn)
    })
    const playerRowMenu = screen.getByTestId("player-row-menu")
    expect(playerRowMenu).toBeInTheDocument()
  })
  it("Each event call has a cell, indicating whether accepted, declined, pending, depping out or not yet asked", () => {  
    for (let i = 0; i < mockProps.allEventCalls.length; i++) {
      let callCell = screen.getByTestId(`${mockProps.allEventCalls[0].id}-cell`)
      expect(callCell).toBeInTheDocument()
    }
  })

})

describe("<PlayerRow />", () => {
  const mockCalls = [mockCall]

  const mockProps: PlayerRowProps = {
    contactMessage: {...mockContactMessageForTable, status: "DEP OUT", calls: mockCalls},
    allEventCalls: mockCalls
  }
  beforeEach(() => {
    render(
    <table data-testid="table">
      <tbody>
        <PlayerRow {...mockProps}/>
      </tbody>
    </table>)
  })
  it("indicates if call is being depped out", () => {

    const depOut = screen.getByTestId(`${mockProps.allEventCalls[0].id}-dep-out`)
    expect(depOut).toBeInTheDocument()
  })
})

describe("<PlayerRow />", () => {
  const mockCalls = [mockCall]

  const mockProps = {
    contactMessage: {...mockContactMessageForTable, accepted: true, calls: mockCalls},
    allEventCalls: mockCalls
  }
  beforeEach(() => {
    render(
      <table data-testid="table">
        <tbody>
          <PlayerRow {...mockProps}/>
        </tbody>
      </table>)
  })
  it("indicates if call is accepted", () => {

    const tick = screen.getByTestId(`${mockProps.allEventCalls[0].id}-tick`)
    expect(tick).toBeInTheDocument()
  })
})

describe("<PlayerRow />", () => {
  const mockCalls = [mockCall]
  const mockProps = {
    contactMessage: {...mockContactMessageForTable, accepted: false, calls: mockCalls},
    allEventCalls: mockCalls
  }
  beforeEach(() => {
    render(
      <table data-testid="table">
        <tbody>
          <PlayerRow {...mockProps}/>
        </tbody>
      </table>)
  })
  it("indicates if call is accepted", () => {

    const cross = screen.getByTestId(`${mockProps.allEventCalls[0].id}-cross`)
    expect(cross).toBeInTheDocument()
  })
})

describe("<PlayerRow />", () => {
  const mockCalls = [mockCall]

  const mockProps = {
    contactMessage: {...mockContactMessageForTable, accepted: null, recieved: true, calls: mockCalls},

    allEventCalls: mockCalls
  }
  beforeEach(() => {
    render(
      <table data-testid="table">
        <tbody>
          <PlayerRow {...mockProps}/>
        </tbody>
      </table>)
  })
  it("indicates if response pending", () => {

    const cross = screen.getByTestId(`${mockProps.allEventCalls[0].id}-pending`)
    expect(cross).toBeInTheDocument()
  })
})


describe("<PlayerRow />", () => {
  const mockCalls = [mockCall]
  const mockProps = {
    contactMessage: {...mockContactMessageForTable, accepted: null, recieved: false, calls: mockCalls},
    allEventCalls: mockCalls
  }
  beforeEach(() => {
    render(
      <table data-testid="table">
        <tbody>
          <PlayerRow {...mockProps}/>
        </tbody>
      </table>)
  })
  it("indicates if not yet asked", () => {

    const notAsked = screen.getByTestId(`${mockProps.allEventCalls[0].id}-to-be-offered`)
    expect(notAsked).toBeInTheDocument()
  })
})

describe("<PlayerRow />", () => {
  const mockCalls = [mockCall]
  const mockProps = {
    contactMessage: {...mockContactMessageForTable, accepted: null, recieved: false, calls: []},
    allEventCalls: mockCalls
  }
  beforeEach(() => {
    render(
      <table data-testid="table">
        <tbody>
          <PlayerRow {...mockProps}/>
        </tbody>
      </table>)
  })
  it("indicates if call will not be offered", () => {

    const notAsked = screen.getByTestId(`${mockProps.allEventCalls[0].id}-not-asked`)
    expect(notAsked).toBeInTheDocument()
  })
})