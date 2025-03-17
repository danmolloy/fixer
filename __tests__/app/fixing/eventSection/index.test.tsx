import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import EventSectionIndex, {
  EventSectionProps,
} from '../../../../app/fixing/eventSection';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import axios from '../../../../__mocks__/axios';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';
import { mockContactEventCall } from '../../../../__mocks__/models/ContactEventCall';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });
global.focus = jest.fn();
global.confirm = jest.fn(() => true);
let mockConfirm = global.confirm;

const mockProps: EventSectionProps = {
  eventId: 1,
  section: {
    ...mockEventSection,
    id: 1,
    ensembleSection: mockSection,
    orchestration: [mockOrchestration],
  },
  ensembleSections: [mockSection],
  eventSections: [
    {
      ...mockEventSection,
      id: 2,
      ensembleSection: mockSection,
    },
  ],
  sectionContacts: [mockEnsembleContact],
  eventCalls: [mockCall],
  currentContacts: [
    {
      ...mockContactMessage,
      id: 12,
      eventCalls: [{ ...mockContactEventCall, call: mockCall, id: '1234' }],
      contact: mockEnsembleContact,
      emailEvents: [],
      emailStatus: 'DROPPED',
    },
    {
      ...mockContactMessage,
      id: 13,
      type: 'BOOKING',
      eventCalls: [
        {
          ...mockContactEventCall,
          call: mockCall,
          status: 'DECLINED',
          id: '121',
        },
      ],
      contact: {
        ...mockEnsembleContact,
        firstName: 'Greg',
        lastName: 'Ievers',
      },
      emailEvents: [],
      emailStatus: 'DROPPED',
    },
  ],
};

describe('<EventSectionIndex />', () => {
  beforeEach(() => {
    render(<EventSectionIndex {...mockProps} />);
  });
  it('<EventSectionIndex /> renders', () => {
    const eventSection = screen.getByTestId(
      `${mockProps.section.id}-event-section`
    );
    expect(eventSection).toBeInTheDocument();
  });
  it("'Hide declined' btn hides declined contacts", () => {
    const hideBtn = screen.getByLabelText('Hide declined');
    expect(hideBtn).toBeInTheDocument();
    const eventSection = screen.getByTestId(
      `${mockProps.section.id}-event-section`
    );
    expect(eventSection.textContent).toMatch('Greg Ievers');

    act(() => {
      fireEvent.click(hideBtn);
    });
    expect(eventSection.textContent).not.toMatch('Greg Ievers');
  });

  it('section name is in the document', () => {
    const sectionName = screen.getByText(
      mockProps.section.ensembleSection.name
    );
    expect(sectionName).toBeInTheDocument();
  });
  it('states booking status', () => {
    const bookingStatus = screen.getByText(
      `Booking ${mockProps.section.bookingStatus}`
    );
    expect(bookingStatus).toBeInTheDocument();
  });
  it('<SectionMenu /> is in the document', () => {
    const sectionMenu = screen.getByTestId('section-menu');
    expect(sectionMenu).toBeInTheDocument();
  });
  it('<OrchestrationSummary /> is in the document', () => {
    const summary = screen.getByTestId('orchestration-summary');
    expect(summary).toBeInTheDocument();
  });
  it('<SetionViewSelect /> is in the document', () => {
    const viewSelect = screen.getByTestId('view-select');
    expect(viewSelect).toBeInTheDocument();
  });
  it('<EventSectionContacts /> is in the document', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts).toBeInTheDocument();
  });
  it('if updateSection, <CreateEventSection /> is in the document', () => {
    const optionsBtn = screen.getByTestId('options-btn');
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn);
    });
    const editSection = screen.getByText('Edit Section');
    act(() => {
      fireEvent.click(editSection);
    });
    const createForm = screen.getByTestId('create-event-section');
    expect(createForm).toBeInTheDocument();
  });
});
