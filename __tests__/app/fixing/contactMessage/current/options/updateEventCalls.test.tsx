import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateContactEventCalls, {
  UpdateContactEventCallsProps,
} from '../../../../../../app/fixing/contactMessage/current/options/updateEventCalls';
import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { mockCall } from '../../../../../../__mocks__/models/call';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { DateTime } from 'luxon';
import axios from '../../../../../../__mocks__/axios';
import { useRouter } from 'next/navigation';

global.alert = jest.fn();

jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<UpdateContactEventCalls', () => {
  const mockProps: UpdateContactEventCallsProps = {
    contact: {
      ...mockContactMessage,
      calls: [{ ...mockCall, id: 1 }],
      contact: mockEnsembleContact,
    },
    eventCalls: [{ ...mockCall, id: 1 }],
  };
  beforeEach(() => {
    render(<UpdateContactEventCalls {...mockProps} />);
  });
  it('<UpdateContactEventCalls /> renders', () => {
    const updateEventCalls = screen.getByTestId('update-event-calls');
    expect(updateEventCalls).toBeInTheDocument();
    expect(updateEventCalls.textContent).not.toMatch(
      'At least one call must be offered.'
    );
  });
  it('all event calls are in the document with label, value, name attrs, & checked if appropriate', () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      const eventCall = screen.getByLabelText(
        `${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('HH:mm')}${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('DD')}`
      );
      expect(eventCall).toBeInTheDocument();
      expect(eventCall).toHaveAttribute(
        'value',
        String(mockProps.eventCalls[i].id)
      );
      expect(eventCall).toHaveAttribute('name', 'calls');
      if (
        mockProps.contact.calls
          .map((j) => String(j))
          .includes(String(mockProps.eventCalls[i].id))
      ) {
        expect(eventCall).toBeChecked();
      }
    }
  });

  it('at least one call must be offered or not be removed', async () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      const eventCall = screen.getByLabelText(
        `${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('HH:mm')}${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('DD')}`
      );
      await act(async () => {
        fireEvent.click(eventCall);
      });
    }
    const updateBtn = screen.getByText('Update Calls');
    await act(async () => {
      fireEvent.click(updateBtn);
    });
    expect(axios.post).not.toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith(
      'This player will no longer have any calls offered, which is not a valid action. If you wish to remove them from the event, delete them from the list.'
    );
  });
  it('axios.post is not called on update button click if calls === contact calls', async () => {
    const updateBtn = screen.getByText('Update Calls');
    expect(updateBtn).toBeInTheDocument();
    expect(updateBtn).toHaveRole('button');
    expect(updateBtn).toHaveAttribute('type', 'submit');
    await act(async () => {
      fireEvent.click(updateBtn);
    });
    expect(updateBtn).toHaveAttribute('disabled');
    expect(axios.post).not.toHaveBeenCalled();
  });
});

describe('<UpdateContactEventCalls', () => {
  const mockProps: UpdateContactEventCallsProps = {
    contact: {
      ...mockContactMessage,
      calls: [
        {
          ...mockCall,
          startTime: new Date('June 4, 2024 03:24:00'),
          id: 12,
        },
        {
          ...mockCall,
          startTime: new Date('July 24, 2024 03:24:00'),
          id: 13,
        },
      ],
      contact: mockEnsembleContact,
    },
    eventCalls: [
      {
        ...mockCall,
        startTime: new Date('June 4, 2024 03:24:00'),
        id: 12,
      },
      {
        ...mockCall,
        startTime: new Date('July 24, 2024 03:24:00'),
        id: 13,
      },
    ],
  };
  beforeEach(() => {
    render(<UpdateContactEventCalls {...mockProps} />);
  });

  it('calls can be removed', async () => {
    const updateEventCalls = screen.getByTestId('update-event-calls');

    const eventCallOne = screen.getByLabelText(
      `${DateTime.fromJSDate(new Date(mockProps.eventCalls[1].startTime)).toFormat('HH:mm')}${DateTime.fromJSDate(new Date(mockProps.eventCalls[1].startTime)).toFormat('DD')}`
    );

    await act(async () => {
      fireEvent.click(eventCallOne);
    });
    const updateBtn = screen.getByText('Update Calls');
    await act(async () => {
      fireEvent.click(updateBtn);
    });
    expect(global.alert).not.toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update/eventCalls',
      {
        calls: {
          connect: [{ id: mockProps.eventCalls[0].id }],
          disconnect: [{ id: mockProps.eventCalls[1].id }],
        },
        contactMessageId: mockProps.contact.id,
      }
    );
  });
});

describe('<UpdateContactEventCalls', () => {
  const mockProps: UpdateContactEventCallsProps = {
    contact: {
      ...mockContactMessage,
      calls: [],
      contact: mockEnsembleContact,
    },
    eventCalls: [mockCall],
  };
  beforeEach(() => {
    render(<UpdateContactEventCalls {...mockProps} />);
  });

  it('event calls are checked if appropriate', () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      const eventCall = screen.getByLabelText(
        `${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('HH:mm')}${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('DD')}`
      );
      expect(eventCall).not.toBeChecked();
    }
  });
  it('at least one call must be offered', async () => {
    const updateEventCalls = screen.getByTestId('update-event-calls');
    const updateBtn = screen.getByText('Update Calls');
    expect(updateBtn).toBeInTheDocument();
    expect(updateBtn).toHaveRole('button');
    expect(updateBtn).toHaveAttribute('type', 'submit');
    await act(async () => {
      fireEvent.click(updateBtn);
    });
    expect(axios.post).not.toHaveBeenCalled();
    expect(updateEventCalls.textContent).toMatch(
      'At least one call must be offered.'
    );
  });
  it('Update Calls btn is in the document and calls axios.post and useRouter on click', async () => {
    const updateBtn = screen.getByText('Update Calls');
    const updateEventCalls = screen.getByTestId('update-event-calls');
    const eventCallZero = screen.getByLabelText(
      `${DateTime.fromJSDate(new Date(mockProps.eventCalls[0].startTime)).toFormat('HH:mm')}${DateTime.fromJSDate(new Date(mockProps.eventCalls[0].startTime)).toFormat('DD')}`
    );

    await act(async () => {
      fireEvent.click(eventCallZero);
    });

    await act(async () => {
      fireEvent.click(updateBtn);
    });
    expect(updateEventCalls.textContent).not.toMatch(
      'At least one call must be offered.'
    );

    expect(global.alert).not.toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update/eventCalls',
      {
        calls: {
          connect: [{ id: mockProps.eventCalls[0].id }],
          disconnect: [],
        },
        contactMessageId: mockProps.contact.id,
      }
    );
    expect(useRouter).toHaveBeenCalled();
  });
});
