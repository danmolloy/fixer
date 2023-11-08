import "@testing-library/jest-dom"
import { render, screen, act, fireEvent } from "@testing-library/react"
import NotificationTile, { NotificationTileProps } from "../../../components/users/notifications/notificationTile"
import { mockPlayerCall } from "../../../__mocks__/models/playerCall"
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument"
import { mockEvent } from "../../../__mocks__/models/event"
import { DateTime } from "luxon"
import axios from "axios";

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: NotificationTileProps = {
  mutate: jest.fn(),
  notification: {
    ...mockPlayerCall,
    accepted: null,
    eventInstrument: {
      ...mockEventInstrument,
      event: mockEvent
    }
  }
}

describe("<NotificationTile />", () => {
  beforeEach(() => {
    render(<NotificationTile {...mockProps} />)
  })
  it("notification-tile is in the document", () => {
    const notificationTile = screen.getByTestId("notification-tile")
    expect(notificationTile).toBeInTheDocument()
  })
  it("playerCall createdAt is in the document in format h:mma ccc Do MMMM yyyy", () => {
    const createdAt = screen.getByTestId("notification-created-at")
    expect(createdAt).toBeInTheDocument()
    expect(createdAt.textContent).toMatch(DateTime.fromJSDate(new Date(mockProps.notification.createdAt)).toFormat("h:mma ccc Do MMMM yyyy"))
  })
  it("fixer name is in the document", () => {
    const fixerName = screen.getByTestId("fixer-name")
    expect(fixerName).toBeInTheDocument()
    expect(fixerName.textContent).toMatch(mockProps.notification.eventInstrument.event.fixerName)
  })
  it("bookingOrAvailability is in the document", () => {
    const offerOrCheck = screen.getByTestId("offer-or-check")
    expect(offerOrCheck).toBeInTheDocument()
    if (mockProps.notification.bookingOrAvailability === "Booking") {
      expect(offerOrCheck.textContent).toMatch("offers:")
    } else {
      expect(offerOrCheck.textContent).toMatch("checks availability for:")
    }
  })
  it("event title is in the document", () => {
    const eventTitle = screen.getByTestId("event-title")
    expect(eventTitle).toBeInTheDocument()
    expect(eventTitle.textContent).toMatch(mockProps.notification.eventInstrument.event.eventTitle)
  })
  it("ensemble name is in the document", () => {
    const ensembleName = screen.getByTestId("ensemble-name")
    expect(ensembleName).toBeInTheDocument()
    expect(ensembleName.textContent).toMatch(mockProps.notification.eventInstrument.event.ensembleName)
  })
  it("view event link is in the document", () => {
    const eventLink = screen.getByTestId("event-link")
    expect(eventLink).toBeInTheDocument()
    expect(eventLink).toHaveAttribute("href", `/event/${mockProps.notification.eventInstrument.eventId}`)
    expect(eventLink.textContent).toMatch("View Event")
  })
  it("accept btn is in the document", () => {
    const acceptBtn = screen.getByTestId("accept-btn")
    expect(acceptBtn).toBeInTheDocument()
  })
  it("accept btn calls axios with expected args", async () => {
    const acceptBtn = screen.getByTestId("accept-btn")
    await act(async () => {
      await fireEvent.click(acceptBtn)
    })
    expect(mockPost).toBeCalledWith("/api/fixing/updatePlayerCall", {data: {accepted: true}, playerCallId: mockProps.notification.id})
  })
  it("decline btn is in the document", () => {
    const declineBtn = screen.getByTestId("decline-btn")
    expect(declineBtn).toBeInTheDocument()
  })
  it("decline btn calls axios with expected args", async () => {
    const declineBtn = screen.getByTestId("decline-btn")
    await act(async () => {
      fireEvent.click(declineBtn)
    })
    expect(mockPost).toBeCalledWith("/api/fixing/updatePlayerCall", {data: {accepted: false}, playerCallId: mockProps.notification.id})

  })
})

describe("<NotificationTile />", () => {
  beforeEach(() => {
    const mockProps: NotificationTileProps = {
      mutate: jest.fn(),
      notification: {
        ...mockPlayerCall,
        accepted: true,
        eventInstrument: {
          ...mockEventInstrument,
          event: mockEvent
        }
      }
    }
    act(() => {
      render(<NotificationTile {...mockProps} />)
    })
  })
  it("if offer accepted, it states so", () => {
    const acceptedStatus = screen.getByTestId("accepted-status")
    expect(acceptedStatus.textContent).toMatch("You accepted this offer")  })
})

describe("<NotificationTile />", () => {
  beforeEach(() => {
    const mockProps: NotificationTileProps = {
      mutate: jest.fn(),
      notification: {
        ...mockPlayerCall,
        accepted: false,
        eventInstrument: {
          ...mockEventInstrument,
          event: mockEvent
        }
      }
    }
    act(() => {
      render(<NotificationTile {...mockProps} />)
    })
  })
  it("it states if offer was declined", () => {
    const acceptedStatus = screen.getByTestId("accepted-status")
    expect(acceptedStatus.textContent).toMatch("You declined this offer")
  })
})