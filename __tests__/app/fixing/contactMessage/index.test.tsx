import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import EventSectionContacts, {
  EventSectionContactsProps,
} from '../../../../app/fixing/contactMessage';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockContactEventCall } from '../../../../__mocks__/models/ContactEventCall';
import { EmailStatus } from '@prisma/client';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';

const mockProps: EventSectionContactsProps = {
  orchestration: [mockOrchestration],
  type: 'AVAILABILITY',
  editContacts: false,
  setEditContacts: jest.fn(),
  eventSectionId: 1,
  eventId: 1,
  sectionContacts: [mockEnsembleContact],
  eventCalls: [mockCall],
  currentContacts: [
    {
      ...mockContactMessage,
      contact: {
        ...mockEnsembleContact,
        firstName: 'Greg',
        lastName: 'Ievers',
      },
      type: 'AVAILABILITY',
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      emailStatus: 'PROCESSED' as EmailStatus,
      emailEvents: [],
    },
    {
      ...mockContactMessage,
      id: 2,
      contact: {
        ...mockEnsembleContact,
        firstName: 'Elliot',
        lastName: 'Gannon',
      },
      type: 'BOOKING',
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      emailStatus: 'PROCESSED' as EmailStatus,
      emailEvents: [],

    },
    {
      ...mockContactMessage,
      id: 3,
      contact: {
        ...mockEnsembleContact,
        firstName: 'Brett',
        lastName: 'Sturdy',
      },
      type: 'AUTOBOOK',
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      emailStatus: 'PROCESSED' as EmailStatus,
      emailEvents: [],

    },
  ],
};

describe('<EventSectionContacts />', () => {
  beforeEach(() => {
    render(<EventSectionContacts {...mockProps} type='AVAILABILITY' />);
  });
  it('<EventSectionContacts /> renders', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts).toBeInTheDocument();
  });
  it('if availability selected, shows just AVAILABILITY types', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts.textContent).toMatch('Greg Ievers');
    expect(eventSectionContacts.textContent).not.toMatch('Elliot Gannon');
    expect(eventSectionContacts.textContent).not.toMatch('Brett Sturdy');
  });
});

describe('<EventSectionContacts />', () => {
  beforeEach(() => {
    render(
      <EventSectionContacts
        {...mockProps}
        currentContacts={[]}
        type='AVAILABILITY'
      />
    );
  });

  it('if availability selected, it states if there have been no calls & Add Contacts btn', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts.textContent).toMatch(
      'No availability checks made.'
    );
    expect(eventSectionContacts.textContent).toMatch(
      'Add contacts to get started.'
    );
  });
});

describe('<EventSectionContacts />', () => {
  beforeEach(() => {
    render(<EventSectionContacts {...mockProps} type='BOOKING' />);
  });
  it('<EventSectionContacts /> renders', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts).toBeInTheDocument();
  });
  it('if booking selected, shows both BOOKING and AUTOBOOK types', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts.textContent).not.toMatch('Greg Ievers');
    expect(eventSectionContacts.textContent).toMatch('Elliot Gannon');
    expect(eventSectionContacts.textContent).toMatch('Brett Sturdy');
  });
});

describe('<EventSectionContacts />', () => {
  beforeEach(() => {
    render(
      <EventSectionContacts
        {...mockProps}
        currentContacts={[]}
        type='BOOKING'
      />
    );
  });

  it('if booking selected, it states if there have been no calls & Add Contacts btn', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts.textContent).toMatch('No booking calls made.');
    expect(eventSectionContacts.textContent).toMatch(
      'Add contacts to get started.'
    );
  });
});

describe('<EventSectionContacts />', () => {
  const mockProps: EventSectionContactsProps = {
    orchestration: [mockOrchestration],
    type: 'BOOKING',
    editContacts: false,
    setEditContacts: jest.fn(),
    eventSectionId: 1,
    sectionContacts: [mockEnsembleContact],
    eventCalls: [mockCall],
    currentContacts: [],
    eventId: 1,
  };
  beforeEach(() => {
    render(<EventSectionContacts {...mockProps} />);
  });
  it('if !calls, Add Contacts btn is in the document and calls setEditContacts on click', () => {
    const editBtn = screen.getByText('Add Contacts');
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveRole('button');
    act(() => {
      fireEvent.click(editBtn);
    });
    expect(mockProps.setEditContacts).toHaveBeenCalledWith(true);
  });
});
