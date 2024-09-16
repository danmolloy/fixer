import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrentContactsOptions, {
  CurrentContactsOptionsProps,
} from '../../../../../../app/fixing/contactMessage/current/options';
import { mockCall } from '../../../../../../__mocks__/models/call';
import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import axios from '../../../../../../__mocks__/axios';
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';

global.prompt = jest.fn().mockReturnValue('This is the mock message');
global.confirm = jest.fn(() => true);
let confirmMock = global.confirm;
let promptMock = global.prompt;

jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

describe('<CurrentContactsOptions />', () => {
  const index = Math.ceil(Math.random() * 10) + 1;
  const mockProps: CurrentContactsOptionsProps = {
    eventCalls: [mockCall],
    numContacts: Math.ceil(Math.random() * 10) + index,
    index: index,
    contact: {
      ...mockContactMessage,
      accepted: true,
      bookingOrAvailability: 'Availability',
      contact: mockEnsembleContact,
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<CurrentContactsOptions {...mockProps} />);
  });
  it('<CurrentContactsOptions /> renders', () => {
    const contactOptions = screen.getByTestId('contact-options');
    expect(contactOptions).toBeInTheDocument();
  });
  it('if availability check, offer to book btn is in the document & calls confirm, axios and useRouter on click', async () => {
    const offerBtn = screen.getByText('Offer to book');
    expect(offerBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(offerBtn);
    });
    expect(confirmMock).toHaveBeenCalledWith(
      'Are you sure you want to reoffer as a booking?'
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        data: { bookingOrAvailability: 'Booking' },
        id: mockProps.contact.id,
      }
    );
    expect(useRouter).toHaveBeenCalled();
  });
  it('decline btn is in the document and calls confirm, axios.post and useRouter on click', async () => {
    const declineBtn = screen.getByText('Decline');
    expect(declineBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(declineBtn);
    });
    expect(confirmMock).toHaveBeenCalledWith(
      'Are you sure you want to decline the work on this players behalf?'
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        id: mockProps.contact.id,
        data: {
          accepted: false,
        },
      }
    );
    expect(useRouter).toHaveBeenCalled();
  });
  it('update player message is in the document and calls prompt, axios.post and useRouter with expected args on click', async () => {
    const messageBtn = screen.getByText('Update Player Message');
    expect(messageBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(messageBtn);
    });
    expect(promptMock).toHaveBeenCalledWith(
      'What message would you like to add to this player?'
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        id: mockProps.contact.id,
        data: { playerMessage: 'This is the mock message' },
      }
    );
    expect(useRouter).toHaveBeenCalled();
  });
  it('move up btn is in the document and calls handleShift(true) on click', async () => {
    const upBtn = screen.getByText('Move Up');
    expect(upBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(upBtn);
    });
    expect(confirmMock).toHaveBeenCalledWith(
      `Are you sure you want to move this player up one list position?`
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update/shift',
      {
        eventSectionId: mockProps.contact.eventSectionId,
        movingUp: true,
        contactMessageId: mockProps.contact.id,
      }
    );
  });
  it('move down btn is in the document and calls handleShift(false) on click', async () => {
    const downBtn = screen.getByText('Move Down');
    expect(downBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(downBtn);
    });
    expect(confirmMock).toHaveBeenCalledWith(
      `Are you sure you want to move this player down one list position?`
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update/shift',
      {
        eventSectionId: mockProps.contact.eventSectionId,
        movingUp: false,
        contactMessageId: mockProps.contact.id,
      }
    );
  });
  it('delete btn is in the document and calls prompt, axios & useRouter with expected args on click', async () => {
    const deleteBtn = screen.getByText('Delete');
    expect(deleteBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(deleteBtn);
    });
    expect(confirmMock).toHaveBeenCalledWith(
      'Are you sure you want to remove this player from the list?'
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/delete',
      { contactMessageId: mockProps.contact.id }
    );
  });
  it('position select menu is in the document with expected value, options & calls setPosition on change', () => {
    const positionSelect = screen.getByTestId('position-select');
    expect(positionSelect).toBeInTheDocument();
    expect(positionSelect).toHaveValue(mockProps.contact.position);
    expect(positionSelect).toHaveRole('combobox');
    expect(positionSelect).toHaveTextContent('Tutti');
    expect(positionSelect).toHaveTextContent('Principal');
    const tuttiOption = screen.getByText('Tutti');
    expect(tuttiOption).toBeInTheDocument();
    expect(tuttiOption).toHaveValue('Tutti');
    expect(tuttiOption).toHaveRole('option');
    const principalOption = screen.getByText('Principal');
    expect(principalOption).toBeInTheDocument();
    expect(principalOption).toHaveValue('Principal');
    expect(principalOption).toHaveRole('option');
  });
  it('accept btn is disabled if contact accepted === true', async () => {
    const acceptBtn = screen.getByText('Accept');
    expect(acceptBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(acceptBtn);
    });
    expect(confirmMock).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
    //expect(useRouter).not.toHaveBeenCalled()
  });
  it('update postion btn is in the document and calls prompt, axios.post and useRouter() on click', async () => {
    const positionBtn = screen.getByText('Update Position');
    expect(positionBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(positionBtn);
    });
    expect(confirmMock).toHaveBeenCalledWith(
      `Are you sure you want to update this player's position to ${mockProps.contact.position}?`
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        id: mockProps.contact.id,
        data: { position: mockProps.contact.position },
      }
    );
  });
  it('<UpdateContactEventCalls /> is in the document with expected props', () => {
    const updateContactCalls = screen.getByTestId('update-event-calls');
    expect(updateContactCalls).toBeInTheDocument();
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      const eventCall = screen.getByLabelText(
        `${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('HH:mm')}${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('DD')}`
      );
      expect(eventCall).toBeInTheDocument();
    }
  });
});

describe('<CurrentContactsOptions />', () => {
  const mockProps: CurrentContactsOptionsProps = {
    eventCalls: [mockCall],
    numContacts: Math.ceil(Math.random() * 10),
    index: Math.ceil(Math.random() * 10),
    contact: {
      ...mockContactMessage,
      bookingOrAvailability: 'Availability',
      accepted: false,
      contact: mockEnsembleContact,
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<CurrentContactsOptions {...mockProps} />);
  });
  it('accept btn is in the document and calls confirm, axios and useRouter with expected args on click', async () => {
    const acceptBtn = screen.getByText('Accept');
    expect(acceptBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(acceptBtn);
    });
    expect(confirmMock).toHaveBeenCalledWith(
      'Are you sure you want to accept the work on this players behalf?'
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        id: mockProps.contact.id,
        data: {
          accepted: true,
        },
      }
    );
    expect(useRouter).toHaveBeenCalled();
  });
  it('decline btn is disabled if contact.accepted === false', async () => {
    const declineBtn = screen.getByText('Decline');
    await act(async () => {
      fireEvent.click(declineBtn);
    });
    expect(confirmMock).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
    // expect(useRouter).not.toHaveBeenCalled()
  });
});

describe('<CurrentContactsOptions />', () => {
  const mockProps: CurrentContactsOptionsProps = {
    eventCalls: [mockCall],
    numContacts: Math.ceil(Math.random() * 10),
    index: 1,
    contact: {
      ...mockContactMessage,
      bookingOrAvailability: 'Availability',
      accepted: false,
      contact: mockEnsembleContact,
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<CurrentContactsOptions {...mockProps} />);
  });
  it('move up btn is disabled if index === 1', async () => {
    const upBtn = screen.getByText('Move Up');
    expect(upBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(upBtn);
    });
    expect(confirmMock).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });
});

describe('<CurrentContactsOptions />', () => {
  const mockProps: CurrentContactsOptionsProps = {
    eventCalls: [mockCall],
    numContacts: 6,
    index: 6,
    contact: {
      ...mockContactMessage,
      bookingOrAvailability: 'Availability',
      accepted: false,
      contact: mockEnsembleContact,
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<CurrentContactsOptions {...mockProps} />);
  });

  it('move down btn is disabled if index === numContacts', async () => {
    const downBtn = screen.getByText('Move Down');
    expect(downBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(downBtn);
    });
    expect(confirmMock).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });
});
