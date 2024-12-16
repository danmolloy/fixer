import "@testing-library/jest-dom";
import ViewAllUpcoming, { ViewAllUpcomingProps } from "../../../../app/calendar/viewAll";
import { render, screen } from "@testing-library/react";
import { mockEvent } from "../../../../__mocks__/models/event";
import { mockCall } from "../../../../__mocks__/models/call";
import { E } from "@faker-js/faker/dist/airline-BLb3y-7w";

const mockProps: ViewAllUpcomingProps = {
  events: [
    {...mockEvent,
      id: 3,
      eventTitle: "2025 Party",
      calls: [{
        ...mockCall,
        startTime: new Date('2025-10-13T03:24:00'),
        endTime: new Date('2025-10-13T04:24:00'),

      }]},
      {...mockEvent,
        id: 2,
        eventTitle: "2026 Party",
        calls: [{
          ...mockCall,
          startTime: new Date('2026-10-13T03:24:00'),
          endTime: new Date('2026-10-13T04:24:00'),
  
        }]},
  ]
}

describe("<ViewAllUpcoming />", () => {
  beforeEach(() => {
    render(<ViewAllUpcoming {...mockProps} />)
  })
  it("<ViewAllUpcoming /> renders", () => {
    const upcomingEvents = screen.getByTestId("upcoming-events");
    expect(upcomingEvents).toBeInTheDocument();
  })
  it("'Upcoming Events' heading is in the document", () => {
    const pageHeader = screen.getByText("Upcoming Events");
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveRole("heading");
  })
  it("all upcoming events are in the document", () => {
    const upcomingEventTiles = screen.getAllByTestId("event-overview");
    expect(upcomingEventTiles[0].textContent).toMatch("2025 Party");
    expect(upcomingEventTiles[1].textContent).toMatch("2026 Party");
  })
})

describe("<ViewAllUpcoming />", () => {
  const mockProps: ViewAllUpcomingProps = {
    events: []
  }
  
  beforeEach(() => {
    render(<ViewAllUpcoming {...mockProps} />)
  })
  it("if !events, there is helpful text with Create Event link", () => {
    const upcomingEvents = screen.getByTestId("upcoming-events");
    expect(upcomingEvents.textContent).toMatch("No upcoming events.")
    expect(upcomingEvents.textContent).toMatch("Get started by creating an event.")
    const createEventLink = screen.getByText("Create Event")
    expect(createEventLink).toHaveAttribute("href", "/event/create")
  })
})