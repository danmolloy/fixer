import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { mockPlayerCall } from "../../../../__mocks__/models/playerCall"
import PlayerRowMenu, { PlayerRowMenuProps } from "../../../../components/fixing/instrument/table/playerRowMenu"
import axios from "axios";

jest.spyOn(window, "prompt").mockImplementation(() => "Mocked User Input");


jest.mock("axios")

describe("<PlayerRowMenu /> in Availability", () => {
  const availabilityProps: PlayerRowMenuProps = {
    playerCall: {
      ...mockPlayerCall,
      bookingOrAvailability: "Availability"
    },
    setShowMenu: jest.fn()
  }
  beforeEach(() => {
    render(<PlayerRowMenu {...availabilityProps} />)
  })
  //it("Closes on blur", () => {})

  it("player-row-menu is in the document", () => {
    const PlayerRowMenu = screen.getByTestId("player-row-menu")
    expect(PlayerRowMenu).toBeInTheDocument()
  })
  it("View profile link is in the document", () => {
    const profileLink = screen.getByTestId("profile-link")
    expect(profileLink).toBeInTheDocument()
    expect(profileLink.textContent).toMatch("View profile")
  })
  it("confirm availability btn calls axios.post with expected args", async () => {
    const confirmBtn = screen.getByText("Confirm availability")
    expect(confirmBtn).toBeInTheDocument()

    act(() => {
      fireEvent.click(confirmBtn)
    })
    expect(axios.post).toHaveBeenCalledWith("/api/fixing/updatePlayerCall", {"data": {"accepted": true}, playerCallId: availabilityProps.playerCall.id})
  })
  it("make offer to book calls axios.post onClick with expected args", () => {
    const makeOfferBtn = screen.getByText("Make offer to book")
    expect(makeOfferBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(makeOfferBtn)
    })
    const data = {
      accepted: false,
      recieved: false,
      bookingOrAvailability: "Booking"
    }
    expect(axios.post).toHaveBeenCalledWith("/api/fixing/updatePlayerCall", {"data": data, playerCallId: availabilityProps.playerCall.id})


  })
  it("Remove from list btn calls axios.post with expected args", () => {
    const removeBtn = screen.getByText("Remove from list")
    expect(removeBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(removeBtn)
    })

    expect(axios.post).toHaveBeenCalledWith("/api/fixing/removePlayer", {playerCallId: availabilityProps.playerCall.id})

  })
  it("send message btn calls axios.post with expected args", () => {
    const msgBtn = screen.getByText("Send message")
    expect(msgBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(msgBtn)
    })
    const data = {
      message: "Dan Molloy sends the following message: \"Mocked User Input\""
    }
    expect(axios.post).toHaveBeenCalledWith("/api/fixing/messagePlayer", data)
  })
  it("poke btn calls axios.post with expected args", () => {
    const pokeBtn = screen.getByText("Poke")
    expect(pokeBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(pokeBtn)
    })
    const data = {
      message: "Dan Molloy is reminding you to respond to his availability check."
    }
    expect(axios.post).toHaveBeenCalledWith("/api/fixing/messagePlayer", data)

  })

})

describe("<FixingPlayerMenu /> in Booking", () => {
  const bookingProps: PlayerRowMenuProps = {
    playerCall: {
      ...mockPlayerCall,
      bookingOrAvailability: "Booking"
    },
    setShowMenu: jest.fn()
  }
  beforeEach(() => {
    render(<PlayerRowMenu {...bookingProps} />)
  })
  it("player-row-menu is in the document", () => {
    const PlayerRowMenu = screen.getByTestId("player-row-menu")
    expect(PlayerRowMenu).toBeInTheDocument()
  })
  it("View profile link is in the document", () => {
    const profileLink = screen.getByTestId("profile-link")
    expect(profileLink).toBeInTheDocument()
    expect(profileLink.textContent).toMatch("View profile")
  })
  it("confirm booking btn calls axios.post with expected args", () => {
    const confirmBtn = screen.getByText("Confirm booking")
    expect(confirmBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(confirmBtn)
    })
    expect(axios.post).toHaveBeenCalledWith("/api/fixing/updatePlayerCall", {"data": {"accepted": true}, playerCallId: bookingProps.playerCall.id})

  })  
  it("remove from list is in the document, says 'unbook' if pending decision or accepted", () => {
    let removeBtn;
    if (bookingProps.playerCall.recieved === true 
      && bookingProps.playerCall.accepted !== false) {
        removeBtn = screen.getByText("Cancel offer")
        expect(removeBtn).toBeInTheDocument()
      } else {
        removeBtn = screen.getByText("Remove from list")
        expect(removeBtn).toBeInTheDocument()
      }
      act(() => {
        fireEvent.click(removeBtn)
      })
  
      expect(axios.post).toHaveBeenCalledWith("/api/fixing/removePlayer", {playerCallId: bookingProps.playerCall.id})
  
  })
  it("dep out/replace btn calls axios.post with expected args", () => {
    bookingProps.playerCall.accepted === true
    if (bookingProps.playerCall.accepted === true ) {
      const depBtn = screen.getByText("Dep player")
      expect(depBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(depBtn)
      })
      const data = {
        status: "DEP OUT"
      }
      expect(axios.post).toHaveBeenCalledWith("/api/fixing/updatePlayerCall", {"data": data, playerCallId: bookingProps.playerCall.id})
  
    }

  })
  it("send message btn calls axios.post with expected args", () => {
    const msgBtn = screen.getByText("Send message")
    expect(msgBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(msgBtn)
    })
    const data = {
      message: "Dan Molloy sends the following message: \"Mocked User Input\""
    }
    expect(axios.post).toHaveBeenCalledWith("/api/fixing/messagePlayer", data)

  })
  it("poke btn calls axios.post with expected args", () => {
    const pokeBtn = screen.getByText("Poke")
    expect(pokeBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(pokeBtn)
    })
    const data = {
      message: "Dan Molloy is reminding you to respond to his offer."
    }
    expect(axios.post).toHaveBeenCalledWith("/api/fixing/messagePlayer", data)

  })

})