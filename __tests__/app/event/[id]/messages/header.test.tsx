import "@testing-library/jest-dom"
import { screen, render } from "@testing-library/react"
import MessagesHeader, { MessagesHeaderProps } from "../../../../../app/event/[id]/messages/header"
import { mockEvent } from "../../../../../__mocks__/models/event"
import { mockCall } from "../../../../../__mocks__/models/call"
import { getDateRange } from "../../../../../app/fixing/contactMessage/api/create/functions"
import { mockSentEmail } from "../../../../../__mocks__/models/sentEmail"

const mockProps: MessagesHeaderProps = {
  event: {
    ...mockEvent,
    calls: [mockCall],
    sentEmails: [mockSentEmail]
  }
}

describe("<MessagesHeader />", () => {
  beforeEach(() => {
    render(<MessagesHeader {...mockProps}/>)
  })
  it("<MessagesHeader /> renders", () => {
    const messagesHeader = screen.getByTestId("messages-header");
    expect(messagesHeader).toBeInTheDocument();
  })
  it("'Sent Messages' heading is in the document", () => {
    const heading = screen.getByText("Sent Messages");
    expect(heading).toBeInTheDocument();
  });
  it("ensemble name and date range is in the document", () => {
    const identifier = screen.getByText(`${mockProps.event.ensembleName} ${getDateRange(mockProps.event.calls)}`)
    expect(identifier).toBeInTheDocument();
  })
  it("'View Event' link is in the document with expected href attr", () => {
    const eventLink = screen.getByTestId('event-link');
    expect(eventLink).toHaveAttribute("href", `/event/${mockProps.event.id}`);
    expect(eventLink).toHaveTextContent("View Event");
  });
  it("sent emails count is in the document", () => {
    const emailsCount = screen.getByText(`${mockProps.event.sentEmails.length} sent email(s)`);
    expect(emailsCount).toBeInTheDocument();
  });
})