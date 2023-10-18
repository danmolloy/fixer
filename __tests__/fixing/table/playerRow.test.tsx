import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { mockPlayerCall } from "../../../__mocks__/models/playerCall"
import { mockUser } from "../../../__mocks__/models/user"
import PlayerRow, { PlayerRowProps } from "../../../components/fixing/table/playerRow"
import { mockCall } from "../../../__mocks__/models/call"

const mockProps = {
  playerCall: mockPlayerCall,
  user: mockUser,
  eventCallsForPlayer: [mockCall],
  allEventCalls: [mockCall]
}

describe("<PlayerRow />", () => {
  beforeEach(() => {
    render(<PlayerRow {...mockProps}/>)
  })

  it("player-row is in the document", () => {
    const playerRow = screen.getByTestId("player-row")
    expect(playerRow).toBeInTheDocument()
  })
  it("user image is in the document", () => {
    const userImg = screen.getByTestId(`${mockProps.user.name}-img`)
    expect(userImg).toBeInTheDocument()
  })
  it("user name is in the document", () => {
    const userName = screen.getByText(mockProps.user.name)
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

describe("Dep out", () => {
  const mockProps = {
    playerCall: {...mockPlayerCall, status: "DEP OUT"},
    user: mockUser,
    eventCallsForPlayer: [mockCall],
    allEventCalls: [mockCall]
  }
  beforeEach(() => {
    render(<PlayerRow {...mockProps}/>)
  })
  it("indicates if call is being depped out", () => {

    const depOut = screen.getByTestId(`${mockProps.allEventCalls[0].id}-dep-out`)
    expect(depOut).toBeInTheDocument()
  })
})

describe("Call accepted", () => {
  const mockProps = {
    playerCall: {...mockPlayerCall, accepted: true},
    user: mockUser,
    eventCallsForPlayer: [mockCall],
    allEventCalls: [mockCall]
  }
  beforeEach(() => {
    render(<PlayerRow {...mockProps}/>)
  })
  it("indicates if call is accepted", () => {

    const tick = screen.getByTestId(`${mockProps.allEventCalls[0].id}-tick`)
    expect(tick).toBeInTheDocument()
  })
})

describe("Call declined", () => {
  const mockProps = {
    playerCall: {...mockPlayerCall, accepted: false},
    user: mockUser,
    eventCallsForPlayer: [mockCall],
    allEventCalls: [mockCall]
  }
  beforeEach(() => {
    render(<PlayerRow {...mockProps}/>)
  })
  it("indicates if call is accepted", () => {

    const cross = screen.getByTestId(`${mockProps.allEventCalls[0].id}-cross`)
    expect(cross).toBeInTheDocument()
  })
})

describe("Response pending", () => {
  const mockProps = {
    playerCall: {...mockPlayerCall, accepted: null, recieved: true},
    user: mockUser,
    eventCallsForPlayer: [mockCall],
    allEventCalls: [mockCall]
  }
  beforeEach(() => {
    render(<PlayerRow {...mockProps}/>)
  })
  it("indicates if response pending", () => {

    const cross = screen.getByTestId(`${mockProps.allEventCalls[0].id}-pending`)
    expect(cross).toBeInTheDocument()
  })
})


describe("Not asked", () => {
  const mockProps = {
    playerCall: {...mockPlayerCall, accepted: null, recieved: false},
    user: mockUser,
    eventCallsForPlayer: [mockCall],
    allEventCalls: [mockCall]
  }
  beforeEach(() => {
    render(<PlayerRow {...mockProps}/>)
  })
  it("indicates if not yet asked", () => {

    const notAsked = screen.getByTestId(`${mockProps.allEventCalls[0].id}-not-asked`)
    expect(notAsked).toBeInTheDocument()
  })
})