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

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

global.confirm = jest.fn(() => true);
let mockConfirm = global.confirm;

const mockProps: EventSectionProps = {
  section: {
    ...mockEventSection,
    ensembleSection: mockSection,
  },
  ensembleSections: [mockSection],
  eventSections: [
    {
      ...mockEventSection,
      ensembleSection: mockSection,
    },
  ],
  sectionContacts: [mockEnsembleContact],
  eventCalls: [mockCall],
  currentContacts: [
    {
      ...mockContactMessage,
      calls: [mockCall],
      contact: mockEnsembleContact,
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
  it('Update btn is in the document and renders <CreateEventSection /> on click', () => {
    const updateBtn = screen.getByText('Change');
    expect(updateBtn).toHaveRole('button');
    act(() => {
      fireEvent.click(updateBtn);
    });
    const createEventSection = screen.getByTestId('create-event-section');
    expect(createEventSection).toBeInTheDocument();
  });
  it('ensemble section name header is in the document', () => {
    const sectionName = screen.getByText(
      mockProps.section.ensembleSection.name
    );
    expect(sectionName).toBeInTheDocument();
    expect(sectionName).toHaveRole('heading');
  });
  it('number of players to book is stated', () => {
    const numToBook = screen.getByText(
      `Booking ${mockProps.section.numToBook} player(s)`
    );
    expect(numToBook).toBeInTheDocument();
  });
  it('delete btn is in the document and calls global.confirm() & axios.post() on click', () => {
    const deleteBtn = screen.getByTestId('delete-section');
    expect(deleteBtn).toBeInTheDocument();
    expect(deleteBtn).toHaveRole('button');
    expect(deleteBtn).toHaveTextContent('Delete');
    act(() => {
      fireEvent.click(deleteBtn);
    });
    expect(mockConfirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this section?'
    );
    expect(axios.post).toHaveBeenCalledWith('/fixing/eventSection/api/delete', {
      sectionId: mockProps.section.id,
    });
  });
  it('<EventSectionContacts /> is in the document', () => {
    const eventSectionContacts = screen.getByTestId('event-section-contacts');
    expect(eventSectionContacts).toBeInTheDocument();
  });
});
