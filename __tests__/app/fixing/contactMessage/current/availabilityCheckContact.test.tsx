import "@testing-library/jest-dom"
import { render, screen, act, fireEvent } from "@testing-library/react"
import AvailabilityContactRow, { CurrentContactRowProps } from "../../../../../app/fixing/contactMessage/current/availabilityCheckContact"
import { mockContactMessage } from "../../../../../__mocks__/models/contactMessage";
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact";
import { mockContactEventCall } from "../../../../../__mocks__/models/ContactEventCall";
import { mockCall } from "../../../../../__mocks__/models/call";
import axios from "../../../../../__mocks__/axios";

global.alert = jest.fn();

const mockProps: CurrentContactRowProps = {
  eventCalls: [],
  contact: {
    ...mockContactMessage,
    eventCalls: [{
      ...mockContactEventCall,
      call: mockCall
    }],
    contact: {...mockEnsembleContact}
  },
  index: 0,
  numContacts: 1,
  selectedContacts: [],
  setSelectedContacts: jest.fn(),
};

describe("<AvailabilityContactRow />", () => {
  beforeEach(() => {
    render(<AvailabilityContactRow {...mockProps} />)
  })

  it("<AvailabilityContactRow /> renders ", () => {
    expect(screen.getByTestId('contact-row')).toBeInTheDocument();
  });

  it("displays contact name correctly", () => {
    const contactName = `${mockProps.contact.contact.firstName} ${mockProps.contact.contact.lastName}`;
    expect(screen.getByText(contactName)).toBeInTheDocument();
  });

  it("displays contact position correctly", () => {
    expect(screen.getByText(mockProps.contact.position)).toBeInTheDocument();
  });

  it("displays correct status", () => {
    expect(screen.getByText(mockProps.contact.status)).toBeInTheDocument();
  });

  it("toggles options menu on button click", () => {
    const menuButton = screen.getByTestId('menu-btn');
    fireEvent.click(menuButton);
    expect(screen.getByTestId('contact-options')).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.queryByTestId('contact-options')).not.toBeInTheDocument();
  });

  it("shows player message on button click", () => {
    const playerMsgButton = screen.getByTestId('player-msg-btn');
    fireEvent.click(playerMsgButton);
    expect(global.alert).toHaveBeenCalledWith(
      `Your message to ${mockProps.contact.contact.firstName}: \n\n${mockProps.contact.playerMessage}`
    );
  });

  it("calls setSelectedContacts on checkbox change", () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockProps.setSelectedContacts).toHaveBeenCalled();
  });
});