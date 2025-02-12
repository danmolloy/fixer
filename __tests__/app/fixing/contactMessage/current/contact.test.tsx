import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockCall } from '../../../../../__mocks__/models/call';
import { mockContactMessage } from '../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../__mocks__/models/ensembleContact';
import CurrentContactRow, {
  CurrentContactRowProps,
} from '../../../../../app/fixing/contactMessage/current/contact';
import { mockContactEventCall } from '../../../../../__mocks__/models/ContactEventCall';

const randInd = Math.ceil(Math.random() * 6);

global.alert = jest.fn();

describe('<CurrentContactRow />', () => {
  const mockProps: CurrentContactRowProps = {
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      eventCalls: [{...mockContactEventCall, call: mockCall}],
      contact: {
        ...mockEnsembleContact,
      },
      playerMessage: 'mock player message',
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd,
  };
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <CurrentContactRow {...mockProps} />
        </tbody>
      </table>
    );
  });
  it('<CurrentContactRow /> renders', () => {
    const contactRow = screen.getByTestId('contact-row');
    expect(contactRow).toBeInTheDocument();
  });
  it("it displays contact index correctly", () => {
    expect(screen.getByText(mockProps.index)).toBeInTheDocument();
  });  

  it('contact full name is in the document', () => {  
    const fullName = screen.getByText(
      `${mockProps.contact.contact.firstName} ${mockProps.contact.contact.lastName}`
    );
    expect(fullName).toBeInTheDocument();
  });
  it('contact position is in the document', () => {
    const position = screen.getByText(mockProps.contact.position);
    expect(position).toBeInTheDocument();
  });

  it('status is in the document', () => {
    if (mockProps.contact.status === "FINDINGDEP") {
      const status = screen.getByText("FINDING DEP");
      expect(status).toBeInTheDocument();
    } else if (mockProps.contact.status === "AWAITINGREPLY") {
      const status = screen.getByText(
        `AWAITING REPLY ${mockProps.contact.emailStatus}`
      );
      expect(status).toBeInTheDocument();
    } else if (mockProps.contact.status === "NOTCONTACTED") {
      const status = screen.getByText("NOT CONTACTED");
      expect(status).toBeInTheDocument();
    }
    else {
      const status = screen.getByText(mockProps.contact.status);
      expect(status).toBeInTheDocument();
    }
  });

  
  it("each eventCall is in the document and shows corresponding contact.eventCall status", () => {
    mockProps.eventCalls.forEach((i) => {
      const eventCall = screen.getByTestId(`call-${i.id}`);
      expect(eventCall).toBeInTheDocument();
      const statusText = mockProps.contact.eventCalls.find((c) => c.callId === i.id) ?  mockProps.contact.eventCalls.find((c) => c.callId === i.id)?.status : "-"
      const status =  screen.getByText(String(statusText));
      expect(status).toBeInTheDocument();
  });
});
it('menu button is in the document and shows menu on click', () => {
  const menuBtn = screen.getByTestId('menu-btn');
  expect(menuBtn).toBeInTheDocument();
  act(() => {
    fireEvent.click(menuBtn);
  });
  const contactOptions = screen.getByTestId('contact-options');
  expect(contactOptions).toBeInTheDocument();
});
it('if playerMessage, btn is in the document and shows message on click', () => {
  const playerMessageBtn = screen.getByTestId('player-msg-btn');
  expect(playerMessageBtn).toBeInTheDocument();
  act(() => {
    fireEvent.click(playerMessageBtn);
  });
  expect(global.alert).toHaveBeenCalledWith(
    `Your message to ${mockProps.contact.contact.firstName}: \n\n${mockProps.contact.playerMessage}`
  );
});
});