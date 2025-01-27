import CurrentContactMessages, {
  CurrentContactMessagesProps,
} from '../../../../../app/fixing/contactMessage/current';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockCall } from '../../../../../__mocks__/models/call';
import { mockContactMessage } from '../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../__mocks__/models/ensembleContact';
import { DateTime } from 'luxon';

describe('<CurrentContactMessages />', () => {
  const mockProps: CurrentContactMessagesProps = {
    eventCalls: [mockCall],
    contacts: [
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Bob',
          lastName: 'Jeffrey',
        },
        id: 1,
        type: 'AUTOBOOK',
        calls: [mockCall],
      },
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Lachlan',
          lastName: 'Johnson',
        },
        id: 2,
        type: 'AVAILABILITY',
        calls: [mockCall],
      },
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Amy',
          lastName: 'Brookman',
        },
        id: 3,
        type: 'BOOKING',
        calls: [mockCall],
      },
    ],
    type: Math.random() > 0.5 ? 'AVAILABILITY' : 'BOOKING',
  };
  beforeEach(() => {
    render(<CurrentContactMessages {...mockProps} />);
  });
  it('<CurrentContactMessages /> renders', () => {
    const currentContacts = screen.getByTestId('current-contacts-table');
    expect(currentContacts).toBeInTheDocument();
  });
  it('Name column is in the document', () => {
    const tableHead = screen.getByTestId('table-head');
    expect(tableHead).toBeInTheDocument();
    expect(tableHead.textContent).toMatch('Name');
  });
  it('Position column head is in the document', () => {
    const position = screen.getByText('Position');
    expect(position).toBeInTheDocument();
  });
  it('All event calls with formatted date column heads are in the document', () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      const call = screen.getByTestId(`${mockProps.eventCalls[i].id}-col`);
      const startTime = DateTime.fromJSDate(
        new Date(mockProps.eventCalls[i].startTime)
      ).toFormat('HH:mm');
      const startDate = DateTime.fromJSDate(
        new Date(mockProps.eventCalls[i].startTime)
      ).toFormat('DD');
      expect(call.textContent).toMatch(startTime);
      expect(call.textContent).toMatch(startDate);
    }
  });
  it('Status column head is in the document', () => {
    const status = screen.getByText('Status');
    expect(status).toBeInTheDocument();
  });
  it('Options column head is in the document', () => {
    const options = screen.getByText('Options');
    expect(options).toBeInTheDocument();
  });
});

describe('<CurrentContactMessages /> BOOKING', () => {
  const mockProps: CurrentContactMessagesProps = {
    eventCalls: [mockCall],
    contacts: [
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Bob',
          lastName: 'Jeffrey',
        },
        id: 1,
        type: 'AUTOBOOK',
        calls: [mockCall],
      },
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Lachlan',
          lastName: 'Johnson',
        },
        id: 2,
        type: 'AVAILABILITY',
        calls: [mockCall],
      },
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Amy',
          lastName: 'Brookman',
        },
        id: 3,
        type: 'BOOKING',
        calls: [mockCall],
      },
    ],
    type: 'BOOKING',
  };
  beforeEach(() => {
    render(<CurrentContactMessages {...mockProps} />);
  });
  it('if BOOKING, Queue Number is in the document', () => {
    const tableHead = screen.getByTestId('table-head');
    expect(tableHead).toBeInTheDocument();
    expect(tableHead.textContent).toMatch('Queue Number');
  });
  it('if BOOKING, table body is in the document with all BOOKING and AUTOBOOK contacts only', () => {
    const currentContacts = screen.getByTestId('current-contacts-table');
    for (let i = 0; i < mockProps.contacts.length; i++) {
      const contactName = `${mockProps.contacts[i].contact.firstName} ${mockProps.contacts[i].contact.lastName}`;
      if (mockProps.contacts[i].type !== 'AVAILABILITY') {
        expect(currentContacts.textContent).toMatch(contactName);
      } else {
        expect(currentContacts.textContent).not.toMatch(contactName);
      }
    }
  });
});

describe('<CurrentContactMessages /> AVAILABILITY', () => {
  const mockProps: CurrentContactMessagesProps = {
    eventCalls: [mockCall],
    contacts: [
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Bob',
          lastName: 'Jeffrey',
        },
        id: 1,
        type: 'AUTOBOOK',
        calls: [mockCall],
      },
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Lachlan',
          lastName: 'Johnson',
        },
        id: 2,
        type: 'AVAILABILITY',
        calls: [mockCall],
      },
      {
        ...mockContactMessage,
        contact: {
          ...mockEnsembleContact,
          firstName: 'Amy',
          lastName: 'Brookman',
        },
        id: 3,
        type: 'BOOKING',
        calls: [mockCall],
      },
    ],
    type: 'AVAILABILITY',
  };
  beforeEach(() => {
    render(<CurrentContactMessages {...mockProps} />);
  });
  it('if AVAILABILITY, table body is in the document with all AVAILABILITY checks only', () => {
    const currentContacts = screen.getByTestId('current-contacts-table');
    for (let i = 0; i < mockProps.contacts.length; i++) {
      const contactName = `${mockProps.contacts[i].contact.firstName} ${mockProps.contacts[i].contact.lastName}`;
      if (mockProps.contacts[i].type === 'AVAILABILITY') {
        expect(currentContacts.textContent).toMatch(contactName);
      } else {
        expect(currentContacts.textContent).not.toMatch(contactName);
      }
    }
  });
  it('if AVAILABILITY, Queue Number is not in the document', () => {
    const tableHead = screen.getByTestId('table-head');
    expect(tableHead).toBeInTheDocument();
    expect(tableHead.textContent).not.toMatch('Queue Number');
  });
});
