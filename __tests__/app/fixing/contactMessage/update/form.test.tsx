import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import UpdateContactMessage, {
  UpdateContactMessageProps,
} from '../../../../../app/fixing/contactMessage/update/form';
import { mockEvent } from '../../../../../__mocks__/models/event';
import { mockCall } from '../../../../../__mocks__/models/call';
import { mockContactMessage } from '../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../__mocks__/models/ensembleContact';
import { mockContactEventCall } from '../../../../../__mocks__/models/ContactEventCall';
import { DateTime } from 'luxon';
import axios from '../../../../../__mocks__/axios';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: UpdateContactMessageProps = {
  contact: {
    ...mockContactMessage,
    contact: mockEnsembleContact,
    eventCalls: [
      {
        ...mockContactEventCall,
        call: mockCall,
      },
    ],
  },
  event: {
    ...mockEvent,
    calls: [mockCall],
  },
  instrument: 'Harpsichord',
};

describe('<UpdateContactMessage />', () => {
  beforeEach(() => {
    render(<UpdateContactMessage {...mockProps} />);
  });
  it('<UpdateContactMessage /> renders without crashing', () => {
    const updateForm = screen.getByTestId('update-form');
    expect(updateForm).toBeInTheDocument();
  });
  it("'Update Contact Call' header text is in the document", () => {
    const header = screen.getByText('Update Contact Call');
    expect(header).toBeInTheDocument();
  });
  it('Contact full name & instrument are in the document', () => {
    const contact = screen.getByText(
      `${mockProps.contact.contact.firstName} ${mockProps.contact.contact.lastName} (${mockProps.instrument})`
    );
    expect(contact).toBeInTheDocument();
  });
  it('type select is in the document with BOOKING, AVAILABILITY & AUTOBOOK options', () => {
    const typeSelect = screen.getByTestId('type-select');
    expect(typeSelect).toBeInTheDocument();
    expect(typeSelect).toHaveAttribute('name', 'type');

    const bookingOption = screen.getByText('To Book');
    expect(bookingOption).toBeInTheDocument();
    expect(bookingOption).toHaveValue('BOOKING');

    const availCheck = screen.getByText('Availability Check');
    expect(availCheck).toBeInTheDocument();
    expect(availCheck).toHaveValue('AVAILABILITY');

    const autoBook = screen.getByText('Auto-Book');
    expect(autoBook).toBeInTheDocument();
    expect(autoBook).toHaveValue('AUTOBOOK');
  });
  it('All calls status select is in the document with formatted date label & 7 options', () => {
    for (let i = 0; i < mockProps.contact.eventCalls.length; i++) {
      const call = screen.getByTestId(mockProps.contact.eventCalls[i].callId);
      expect(call).toBeInTheDocument();
      expect(call.textContent).toMatch(
        DateTime.fromJSDate(
          new Date(mockProps.contact.eventCalls[i].call.startTime)
        ).toFormat('HH:mm')
      );
      expect(call.textContent).toMatch(
        DateTime.fromJSDate(
          new Date(mockProps.contact.eventCalls[i].call.startTime)
        ).toFormat('DD')
      );
      const statusSelect = screen.getByTestId(
        `${mockProps.contact.eventCalls[i].callId}-select`
      );
      expect(statusSelect).toBeInTheDocument();
      expect(statusSelect).toHaveAttribute('name', `eventCalls[${i}].status`);
      expect(statusSelect).toHaveValue(mockProps.contact.eventCalls[i].status);
    }
    const blankStatus = screen.getAllByText('Select status');
    const toOfferStatus = screen.getAllByText('TOOFFER');
    const offeringStatus = screen.getAllByText('OFFERING');
    const acceptedStatus = screen.getAllByText('ACCEPTED');
    const declinedStatus = screen.getAllByText('DECLINED');
    const toCheckStatus = screen.getAllByText('TOCHECK');
    const checkingStatus = screen.getAllByText('CHECKING');
    const availableStatus = screen.getAllByText('AVAILABLE');

    for (let i = 0; i < mockProps.contact.eventCalls.length; i++) {
      expect(blankStatus[i]).toHaveValue('');
      expect(toOfferStatus[i]).toHaveValue('TOOFFER');
      expect(offeringStatus[i]).toHaveValue('OFFERING');
      expect(acceptedStatus[i]).toHaveValue('ACCEPTED');
      expect(declinedStatus[i]).toHaveValue('DECLINED');
      expect(toCheckStatus[i]).toHaveValue('TOCHECK');
      expect(checkingStatus[i]).toHaveValue('CHECKING');
      expect(availableStatus[i]).toHaveValue('AVAILABLE');
    }
  });
  it('ContactMessage status select is in the document with 6 options', () => {
    const messageStatus = screen.getByTestId('message-status');
    expect(messageStatus).toHaveAttribute('name', 'status');
    const respondedOption = screen.getByText('Responded');
    expect(respondedOption).toHaveValue('RESPONDED');
    const notContactedOption = screen.getByText('Not Contacted');
    expect(notContactedOption).toHaveValue('NOTCONTACTED');

    const awaitingOption = screen.getByText('Awaiting Reply');
    expect(awaitingOption).toHaveValue('AWAITINGREPLY');

    const findingDepOption = screen.getByText('Finding Dep');
    expect(findingDepOption).toHaveValue('FINDINGDEP');

    const available = screen.getByText('Available');
    expect(available).toHaveValue('AVAILABLE');

    const autoBooked = screen.getByText('Auto-Booked');
    expect(autoBooked).toHaveValue('AUTOBOOKED');
  });
  it('strictly tied checkbox is in the document with label, type & name', () => {
    const strictlyTied = screen.getByLabelText('Strictly Tied');
    expect(strictlyTied).toBeInTheDocument();
    expect(strictlyTied).toHaveAttribute('type', 'checkbox');
    expect(strictlyTied).toHaveAttribute('name', 'strictlyTied');
  });
  it('Urgent checkbox is in the document with type, name & label', () => {
    const urgentCheckbox = screen.getByLabelText('Urgent');
    expect(urgentCheckbox).toBeInTheDocument();
    expect(urgentCheckbox).toHaveAttribute('type', 'checkbox');
    expect(urgentCheckbox).toHaveAttribute('name', 'urgent');
  });
  it('position text input is in the document with name, type & label', () => {
    const positionInput = screen.getByLabelText('Position');
    expect(positionInput).toBeInTheDocument();
    expect(positionInput).toHaveAttribute('type', 'text');
    expect(positionInput).toHaveAttribute('name', 'position');
  });
  it('player message input is in the document with name, type & label', () => {
    const messageInput = screen.getByLabelText('Message to Player');
    expect(messageInput).toBeInTheDocument();
    expect(messageInput).toHaveAttribute('type', 'text');
    expect(messageInput).toHaveAttribute('name', 'playerMessage');
  });
  it('Submit btn is in the document and calls axios.post() on click', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        data: {
          playerMessage: mockProps.contact.playerMessage,
          position: mockProps.contact.position,
          status: mockProps.contact.status,
          strictlyTied:
            mockProps.contact.type !== 'AVAILABILITY'
              ? true
              : mockProps.contact.strictlyTied,
          type: mockProps.contact.type,
          urgent: mockProps.contact.urgent,
        },
        eventCalls: mockProps.contact.eventCalls.map((i) => ({
          callId: i.callId,
          status: i.status,
        })),
        id: mockProps.contact.id,
      }
    );
  });
});

describe('<UpdateContactMessage />', () => {
  let localMockProps: UpdateContactMessageProps = {
    ...mockProps,
    contact: {
      ...mockProps.contact,
      eventCalls: [],
    },
  };
  beforeEach(() => {
    render(<UpdateContactMessage {...localMockProps} />);
  });

  it('err messages render on submission fail', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    const validationErr = screen.getByTestId('validation-error');
    expect(validationErr).toBeInTheDocument();
  });
});
