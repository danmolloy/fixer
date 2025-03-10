import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import CreateEventForm, {
  CreateEventFormProps,
  formatDate,
} from '../../../../app/event/create/form';
import { mockEnsembleAdmin } from '../../../../__mocks__/models/ensembleAdmin';
import { mockEnsemble } from '../../../../__mocks__/models/ensemble';
import { mockEvent } from '../../../../__mocks__/models/event';
import { mockCall } from '../../../../__mocks__/models/call';
import axios from '../../../../__mocks__/axios';
import { useRouter } from 'next/navigation';
import { mockUser } from '../../../../__mocks__/models/user';
import { EventStatus } from '@prisma/client';

jest.mock('');

jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<CreateEventForm />', () => {
  const mockProps: CreateEventFormProps = {
    ensembleList: [
      {
        ...mockEnsemble,
        admin: [
          {
            ...mockEnsembleAdmin,
            user: mockUser,
          },
        ],
      },
    ],
    userId: 'mock-user-id',
    userName: 'mock-name',
    createOrUpdate: 'Create',
  };
  beforeEach(() => {
    render(<CreateEventForm {...mockProps} />);
  });
  it('<CreateEventForm /> renders', () => {
    const createForm = screen.getByTestId('create-event-form');
    expect(createForm).toBeInTheDocument();
  });
  it("'Create Event' title is in the document", () => {
    const formTitle = screen.getByText('Create Event');
    expect(formTitle).toBeInTheDocument();
    expect(formTitle).toHaveRole('heading');
  });
  it("'Organisation' select is in the document with label, blank option & all options with label & value", () => {
    const orgSelect = screen.getByTestId('org-select');
    expect(orgSelect).toBeInTheDocument();
    expect(orgSelect).toHaveAttribute('name', 'ensembleId');
    for (let i = 0; i < mockProps.ensembleList.length; i++) {
      expect(orgSelect.textContent).toMatch(mockProps.ensembleList[i].name);
      const option = screen.getByText(mockProps.ensembleList[i].name);
      expect(option).toHaveAttribute('value', mockProps.ensembleList[i].id);
    }
  });
  it('<ConfirmedOrOnHold /> is in the document', () => {
    const gigStatus = screen.getByTestId('status-div');
    expect(gigStatus).toBeInTheDocument();
  });
  it('event title input is in the document with label, type, name and value attrs', () => {
    const eventTitle = screen.getByLabelText('Event Title');
    expect(eventTitle).toBeInTheDocument();
    expect(eventTitle).toHaveAttribute('name', 'eventTitle');
    expect(eventTitle).toHaveAttribute('type', 'text');
    expect(eventTitle).toHaveValue('');
  });
  it('program input is in the document with label, type, name and value attrs', () => {
    const concertProgram = screen.getByLabelText('Concert Program');
    expect(concertProgram).toBeInTheDocument();
    expect(concertProgram).toHaveAttribute('name', 'concertProgram');
    expect(concertProgram).toHaveAttribute('type', 'text');
    expect(concertProgram).toHaveValue('');
  });
  it('calls array is in the document', () => {
    const callsArr = screen.getByTestId('calls-array');
    expect(callsArr).toBeInTheDocument();
  });
  it('add call btn is in the document and calls push with expected args on click', async () => {
    const addCallBtn = screen.getByText('Add Call');
    expect(addCallBtn).toBeInTheDocument();
    expect(addCallBtn).toHaveRole('button');
    const callsArr = screen.getByTestId('calls-array');
    expect(callsArr.textContent).not.toMatch('Call 2');

    await act(async () => {
      fireEvent.click(addCallBtn);
    });
    expect(callsArr.textContent).toMatch('Call 2');
    const callStart = screen.getByTestId(`calls.1.startTime`);
    expect(callStart).toHaveValue('');
    const callEnd = screen.getByTestId(`calls.1.endTime`);
    expect(callEnd).toHaveValue('');
    const venue = screen.getByTestId(`calls.1.venue-input`);
    expect(venue).toHaveValue('');
  });
  it('dress code is in the document with label, type, name and value attrs', () => {
    const dressCode = screen.getByLabelText('Dress Code');
    expect(dressCode).toBeInTheDocument();
    expect(dressCode).toHaveAttribute('name', 'dressCode');
    expect(dressCode).toHaveAttribute('type', 'text');
    expect(dressCode).toHaveValue('');
  });
  it('fee input is in the document with label, type, name and value attrs', () => {
    const fee = screen.getByLabelText('Fee');
    expect(fee).toBeInTheDocument();
    expect(fee).toHaveAttribute('name', 'fee');
    expect(fee).toHaveAttribute('type', 'text');
    expect(fee).toHaveValue('');
  });
  it('additional info input is in the document with label, type, name and value attrs', () => {
    const additionalInfo = screen.getByLabelText('Additional Information');
    expect(additionalInfo).toBeInTheDocument();
    expect(additionalInfo).toHaveAttribute('name', 'additionalInfo');
    expect(additionalInfo).toHaveAttribute('type', 'text');
    expect(additionalInfo).toHaveValue('');
  });
  it('submit btn is in the document', () => {
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeInTheDocument();
  });
  it('all err messages are in the document on submit btn click', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    const createForm = screen.getByTestId('create-event-form');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(createForm.textContent).toMatch(
      'Please revise your form. Errors are stated in red.'
    );
    expect(createForm.textContent).toMatch(
      'Event confirmation status required'
    );
    //expect(createForm.textContent).toMatch("Ensemble name required")
    //expect(createForm.textContent).toMatch("Select ensemble")
    expect(createForm.textContent).toMatch('Concert program required');
    expect(createForm.textContent).toMatch('Call start time required');
    expect(createForm.textContent).toMatch('Call end time required');
    expect(createForm.textContent).toMatch('Venue required');
  });
  it('if all fields correct, axios.post() & useRouter() are called with expected args', async () => {
    const mockVals = {
      ...mockEvent,
      status: 'CONFIRMED',
      adminAccess: [],
      createOrUpdate: 'Create',
      calls: [mockCall],
    };
    const gigStatus = screen.getByTestId('confirmed-toggle');
    await act(async () => {
      fireEvent.click(gigStatus);
    });
    const eventTitle = screen.getByLabelText('Event Title');
    await act(async () => {
      fireEvent.change(eventTitle, { target: { value: mockVals.eventTitle } });
    });
    const concertProgram = screen.getByLabelText('Concert Program');
    await act(async () => {
      fireEvent.change(concertProgram, {
        target: { value: mockVals.concertProgram },
      });
    });
    const dressCode = screen.getByLabelText('Dress Code');
    await act(async () => {
      fireEvent.change(dressCode, { target: { value: mockVals.dressCode } });
    });
    const fee = screen.getByLabelText('Fee');
    await act(async () => {
      fireEvent.change(fee, { target: { value: mockVals.fee } });
    });
    const additionalInfo = screen.getByLabelText('Additional Information');
    await act(async () => {
      fireEvent.change(additionalInfo, {
        target: { value: mockVals.additionalInfo },
      });
    });
    const callStart = screen.getByTestId(`calls.0.startTime`);
    await act(async () => {
      fireEvent.change(callStart, {
        target: { value: formatDate(mockVals.calls[0].startTime) },
      });
    });
    const callEnd = screen.getByTestId(`calls.0.endTime`);
    await act(async () => {
      fireEvent.change(callEnd, {
        target: { value: formatDate(mockVals.calls[0].endTime) },
      });
    });
    const venue = screen.getByTestId(`calls.0.venue-input`);
    await act(async () => {
      fireEvent.change(venue, { target: { value: mockVals.calls[0].venue } });
    });

    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    const createForm = screen.getByTestId('create-event-form');
    expect(axios.post).toHaveBeenCalledWith('create/api', {
      additionalInfo: mockVals.additionalInfo,
      concertProgram: mockVals.concertProgram,
      dressCode: mockVals.dressCode,
      ensembleId: mockProps.ensembleList[0].id,
      ensembleName: mockProps.ensembleList[0].ensembleNames[0],
      eventTitle: mockVals.eventTitle,
      fee: mockVals.fee,
      fixerId: mockProps.userId,
      status: mockVals.status,
      adminAccess: [],
      createOrUpdate: 'Create',
      id: '',
      updateMessage: '',
      calls: mockVals.calls.map((i) => ({
        id: 0,
        info: '',
        venue: i.venue,
        startTime: formatDate(i.startTime),
        endTime: formatDate(i.endTime),
      })),
    });
    expect(useRouter).toHaveBeenCalled();
  });
});

describe('<CreateEventForm />', () => {
  const mockProps: CreateEventFormProps = {
    ensembleList: [
      {
        ...mockEnsemble,
        admin: [
          {
            ...mockEnsembleAdmin,
            user: mockUser,
          },
        ],
      },
    ],
    initialValues: undefined,
    userId: 'mock-user-id',
    userName: 'mock-name',
    createOrUpdate: 'Create',
  };
  beforeEach(() => {
    render(<CreateEventForm {...mockProps} />);
  });
  it('<CreateEventForm /> renders', () => {
    const createForm = screen.getByTestId('create-event-form');
    expect(createForm).toBeInTheDocument();
  });
});

describe('<CreateEventForm />', () => {
  const initialVals = {
    ...mockEvent,
    ensembleId: mockEnsembleAdmin.ensembleId,
    calls: [mockCall],
    ensemble: mockEnsemble,
    status: 'CONFIRMED' as EventStatus,
    updateMessage: 'mock update message',
  };
  const mockProps: CreateEventFormProps = {
    ensembleList: [
      {
        ...mockEnsemble,
        ensembleNames: ['Led Zeppelin', 'The Rolling Stones'],
        admin: [
          {
            ...mockEnsembleAdmin,
            user: mockUser,
          },
        ],
      },
    ],
    initialValues: initialVals,
    userId: 'mock-user-id',
    userName: 'mock-name',
    createOrUpdate: 'Update',
  };
  beforeEach(() => {
    render(<CreateEventForm {...mockProps} />);
  });
  it("'Update' form title clearly stated", () => {
    const formTitle = screen.getByText('Update Event');
    expect(formTitle).toBeInTheDocument();
    expect(formTitle).toHaveRole('heading');
  });
  it('Ensemble name select group is in the document with label, all options have label, name, value & type attrs', () => {
    const selectEl = screen.getByTestId('org-select');
    expect(selectEl).toBeInTheDocument();
    expect(selectEl).toHaveAttribute('name', 'ensembleId');
    for (let i = 0; i < mockProps.ensembleList.length; i++) {
      const ensembleName = screen.getByText(mockProps.ensembleList[i].name);
      expect(ensembleName).toBeInTheDocument();
      expect(ensembleName).toHaveAttribute(
        'value',
        mockProps.ensembleList[i].id
      );
    }
  });
  it('form renders with expected initialVals', () => {
    const gigStatus = screen.getByTestId('confirmed-toggle');
    expect(gigStatus).toHaveAttribute('checked');
    const eventTitle = screen.getByLabelText('Event Title');
    expect(eventTitle).toHaveValue(initialVals.eventTitle);
    const concertProgram = screen.getByLabelText('Concert Program');
    expect(concertProgram).toHaveValue(initialVals.concertProgram);
    const dressCode = screen.getByLabelText('Dress Code');
    expect(dressCode).toHaveValue(initialVals.dressCode);
    const fee = screen.getByLabelText('Fee');
    expect(fee).toHaveValue(initialVals.fee);
    const additionalInfo = screen.getByLabelText('Additional Information');
    expect(additionalInfo).toHaveValue(initialVals.additionalInfo);

    for (let i = 0; i < initialVals.calls.length; i++) {
      const callStart = screen.getByTestId(`calls.${i}.startTime`);
      expect(callStart).toHaveValue(formatDate(initialVals.calls[i].startTime));
      const callEnd = screen.getByTestId(`calls.${i}.endTime`);
      expect(callEnd).toHaveValue(formatDate(initialVals.calls[i].endTime));
      const venue = screen.getByTestId(`calls.${i}.venue-input`);
      expect(venue).toHaveValue(initialVals.calls[i].venue);
    }
  });
  it('on submit btn click, axios.post() & useRouter are called with expected args', async () => {
    const msgToPlayers = 'Updated Gig';
    const msgInput = screen.getByLabelText('Update Message to Players');
    await act(async () => {
      fireEvent.change(msgInput, {
        target: { value: msgToPlayers },
      });
    });

    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith('/event/update/api', {
      additionalInfo: initialVals.additionalInfo,
      concertProgram: initialVals.concertProgram,
      dressCode: initialVals.dressCode,
      ensembleId: initialVals.ensembleId,
      ensembleName: initialVals.ensembleName,
      eventTitle: initialVals.eventTitle,
      fee: initialVals.fee,
      fixerId: mockProps.userId,
      createOrUpdate: 'Update',
      status: initialVals.status,
      id: initialVals.id,
      updateMessage: msgToPlayers,
      adminAccess: [],
      calls: initialVals.calls.map((i) => ({
        id: i.id,
        venue: i.venue,
        startTime: formatDate(i.startTime),
        endTime: formatDate(i.endTime),
      })),
    });
    expect(useRouter).toHaveBeenCalled();
  });
});
