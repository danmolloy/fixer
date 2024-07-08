import EventDetail, { EventDetailProps } from "../../../components/event/eventDetail"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import { mockEventWithCalls } from "../../../__mocks__/models/event"
import { DateTime } from "luxon"
import { mockUserId } from "../../../__mocks__/models/user"
import { mockEnsemble } from "../../../__mocks__/models/ensemble"

const mockProps: EventDetailProps = {
  event: mockEventWithCalls,
  ensemble: mockEnsemble,
  session: {
    user: {
      id: mockUserId
    }
  },
}

describe("<EventDetail />", () => {
  beforeEach(() => {
    render(
        <EventDetail {...mockProps} />
      )
  })
  it("event-detail is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-detail")
    expect(eventInfoDiv).toBeInTheDocument()
  })
  it("event-info-div is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv).toBeInTheDocument()
  })
  it("<DetailHeader /> is in the document", () => {
    const detailsHeader = screen.getByTestId("detail-header")
    expect(detailsHeader).toBeInTheDocument()
  })
  
})

describe("<EventDetail />", () => {
  beforeEach(() => {
    const mockId = mockUserId
    const mockProps: EventDetailProps = {  
      ensemble: mockEnsemble,
      event: {...mockEventWithCalls, fixerId: mockId},
      session: {
        user: {
          id: mockId
        }
      },
    }
    render(<EventDetail {...mockProps} />)
  })

  it("Options btn renders fixer menu if user is event fixer", () => {
    const optionsBtn = screen.getByTestId("options-btn")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const fixerMenu = screen.getByTestId("fixer-menu")
    expect(fixerMenu).toBeInTheDocument()
  })
})

describe("<EventDetail />", () => {
  beforeEach(() => {
    const mockId = mockUserId
    const mockProps: EventDetailProps = {
      ensemble: mockEnsemble,
      event: mockEventWithCalls,
      session: {
        user: {
          id: mockId
        }
      },
    }
    render(<EventDetail {...mockProps} />)
  })

  it("Options menu renders player menu if user is not event fixer", () => {
    const optionsBtn = screen.getByTestId("options-btn")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const playerMenu = screen.getByTestId("player-menu")
    expect(playerMenu).toBeInTheDocument()
  })

})