import '@testing-library/jest-dom';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import CreateEventSection, {
  CreateEventSectionProps,
} from '../../../../app/fixing/eventSection/form';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import axios from '../../../../__mocks__/axios';
import { mockContactEventCall } from '../../../../__mocks__/models/ContactEventCall';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';
import { DateTime } from 'luxon';

global.confirm = jest.fn(() => true);
jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<CreateEventSection />', () => {
  const mockProps: CreateEventSectionProps = {
    eventId: 1,
    ensembleSections: [mockSection],
    setCreateSection: jest.fn(),
    ensembleSectionId: undefined,
    eventCalls: [{
      ...mockCall
    }],
    bookingStatus: "ACTIVE",
    orchestration: [{
      ...mockOrchestration
    }],
    eventSectionId: undefined,
    eventSections: [
      {
        ...mockEventSection,
        ensembleSection: mockSection,
      },
    ],
  };
  beforeEach(() => {
    render(<CreateEventSection {...mockProps} />);
  });
  it('<CreateEventSection /> renders', () => {
    const createEventSection = screen.getByTestId('create-event-section');
    expect(createEventSection).toBeInTheDocument();
  });

  it('section select is in the document with label, name, blank option & all options with value and labels', () => {
    const sectionSelect = screen.getByTestId('section-select');
    expect(sectionSelect).toBeInTheDocument();
    expect(sectionSelect).toHaveAttribute('name', 'ensembleSectionId');
    for (let i = 0; i < mockProps.ensembleSections.length; i++) {
      expect(sectionSelect.textContent).toMatch(
        mockProps.ensembleSections[i].name
      );
      const sectionOption = screen.getByText(
        mockProps.ensembleSections[i].name
      );
      expect(sectionOption).toBeInTheDocument();
      expect(sectionOption).toHaveRole('option');
      expect(sectionOption).toHaveValue(mockProps.ensembleSections[i].id);
    }
  });
  it('Num Required is in the document with label, type and name', () => {
    const numToBook = screen.getByLabelText('Num Required');
    expect(numToBook).toBeInTheDocument();
    expect(numToBook).toHaveAttribute('type', 'number');
    expect(numToBook).toHaveAttribute('name', 'orchestration[0].numRequired');
  });
  it('cancel btn is in the document and calls setCreateSection() on click', () => {
    const cancelBtn = screen.getByText('Cancel');
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toHaveRole('button');
    act(() => {
      fireEvent.click(cancelBtn);
    });
    expect(mockProps.setCreateSection).toHaveBeenCalledWith(false);
  });
  it('submit btn is in the document with label, type & role', () => {
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeInTheDocument();
  });
  it('expected err messages render on submit btn click', async () => {
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).not.toHaveBeenCalled();
    const createEventSection = screen.getByTestId('create-event-section');
    expect(createEventSection.textContent).toMatch(
      'ensemble section id required'
    );
  });
  it('submit btn creates section calls axios.post(), useRouter and setCreateSection(false) on click', async () => {
    const sectionSelect = screen.getByTestId('section-select');
    await act(async () => {
      fireEvent.change(sectionSelect, {
        target: { value: mockProps.ensembleSections[0].id },
      });
    });
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('/fixing/eventSection/api/create', {
      bookingStatus: mockProps.bookingStatus,
      ensembleSectionId: mockProps.ensembleSections[0].id,
      eventId: mockProps.eventId,
      orchestration: mockProps.eventCalls.map(call => ({
        callId: call.id,
        id: undefined,
        numRequired: 0
      }))
    });
  });
});

describe('<CreateEventSection />', () => {
  const mockProps: CreateEventSectionProps = {
    eventId: 1,
    ensembleSections: [mockSection],
    setCreateSection: jest.fn(),
    ensembleSectionId: mockSection.id,
eventCalls: [{
      ...mockCall
    }],
    bookingStatus: "ACTIVE",
    orchestration: [{
      ...mockOrchestration
    }],    eventSectionId: mockEventSection.id,
    eventSections: [
      {
        ...mockEventSection,
        ensembleSection: mockSection,
      },
    ],
  };
  beforeEach(() => {
    render(<CreateEventSection {...mockProps} />);
  });
  it('<CreateEventSection /> renders', () => {
    const createEventSection = screen.getByTestId('create-event-section');
    expect(createEventSection).toBeInTheDocument();
  });
  it('section name header is in the document', () => {
    const sectionName = screen.getByText(
      mockProps.ensembleSections.find(
        (i) => i.id === mockProps.ensembleSectionId
      )!.name
    );
    expect(sectionName).toBeInTheDocument();
    expect(sectionName).toHaveRole('heading');
  });

  /* it('submit btn updates section calls axios.post(), useRouter and setCreateSection(false) on click', async () => {
    const submitBtn = screen.getByText('Submit');
    expect(submitBtn).toBeInTheDocument();
    await waitFor(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('/fixing/eventSection/api/update', {
      bookingStatus: mockProps.bookingStatus,
      ensembleSectionId: mockProps.ensembleSectionId,
      eventId: mockProps.eventId,
      eventSectionId: mockProps.eventSectionId,
      orchestration: mockProps.eventCalls.map(c => ({
        callId: c.id,
        id: undefined,
        numRequired: 0
      }))
    });
  }); */
  it("fixing active radio input is in the document with label,type, name & value", () => {
    const fixingActive = screen.getByLabelText("Active");
    expect(fixingActive).toHaveAttribute("type", "radio");
    expect(fixingActive).toHaveAttribute("name", "bookingStatus");
    expect(fixingActive).toHaveAttribute("value", "ACTIVE");
  })
  it("fixing inactive radio input is in the document with label,type, name & value", () => {
    const fixingInactive = screen.getByLabelText("Inactive");
    expect(fixingInactive).toHaveAttribute("type", "radio");
    expect(fixingInactive).toHaveAttribute("name", "bookingStatus");
    expect(fixingInactive).toHaveAttribute("value", "INACTIVE");
  })
  it("Delete Section btn is in the document and calls handleDelete() on click", () => {
    const deleteBtn = screen.getByText("Delete Section");
    expect(deleteBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(deleteBtn);
    })
    expect(global.confirm).toHaveBeenCalledWith("Are you sure you want to delete this section?");
    expect(axios.post).toHaveBeenCalledWith("/fixing/eventSection/api/delete", {
      sectionId: Number(mockProps.eventSectionId)
    })

  })
  /* it("fixedNumToBook input is in the document with label and sets fixedNumToBook status on click", async () => {
    const fixedNumCheckbox = screen.getByLabelText(`0 musician(s) for all calls`);
    expect(fixedNumCheckbox).toBeInTheDocument();

    await  waitFor(async () => fireEvent.click(fixedNumCheckbox))
    const callsNumRequired = screen.getByTestId('calls-num-required');
    expect(callsNumRequired).toBeInTheDocument();
  }) */
  /* it("if !fixedNumToBook, numRequired input is disabled & each call has own num input", async () => {
    const fixedNumCheckbox = screen.getByLabelText(`0 musician(s) for all calls`);
    await  waitFor(async () => fireEvent.click(fixedNumCheckbox))

    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const formattedDate = DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('HH:mm DD')
      const callNumInput = screen.getByLabelText(formattedDate)
      expect(callNumInput).toBeInTheDocument();
      expect(callNumInput).toHaveAttribute("type", "number");
      expect(callNumInput).toHaveAttribute("name", `orchestration[${i}].numRequired`);
    }
  }) */
});
 