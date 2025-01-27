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
    setCloseMenu: jest.fn(),
    contact: {
      ...mockContactMessage,
      status: 'AVAILABLE',
      type: 'AVAILABILITY',
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
  it('musician name is in the document', () => {
    const musicianName = screen.getByText(
      `${mockProps.contact.contact.firstName} ${mockProps.contact.contact.lastName}`
    );
    expect(musicianName).toBeInTheDocument();
    expect(musicianName).toHaveRole('heading');
  });
  it('close btn is in the document and calls setCloseMenu', () => {
    const closeBtn = screen.getByTestId('close-btn');
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveTextContent('Close');
    act(() => {
      fireEvent.click(closeBtn);
    });
    expect(mockProps.setCloseMenu).toHaveBeenCalled();
  });
  it('Edit link is in the document with expected href', () => {
    const editLink = screen.getByText('Edit');
    expect(editLink).toHaveAttribute(
      'href',
      `/fixing/contactMessage/update/${mockProps.contact.id}`
    );
  });
  it('find dep btn is disabled if status !== ACCEPTED and status !== AUTOBOOKED', () => {
    const findDepBtn = screen.getByText('Find Dep');

    act(() => {
      fireEvent.click(findDepBtn);
    });
    expect(global.confirm).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
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
});

describe('<CurrentContactsOptions />', () => {
  const mockProps: CurrentContactsOptionsProps = {
    eventCalls: [mockCall],
    numContacts: Math.ceil(Math.random() * 10),
    index: 1,
    setCloseMenu: jest.fn(),
    contact: {
      ...mockContactMessage,
      type: 'AVAILABILITY',
      status: 'DECLINED',
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
    setCloseMenu: jest.fn(),
    contact: {
      ...mockContactMessage,
      type: 'AVAILABILITY',
      status: 'DECLINED',
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

describe('<CurrentContactsOptions />', () => {
  const index = Math.ceil(Math.random() * 10) + 1;
  const mockProps: CurrentContactsOptionsProps = {
    eventCalls: [mockCall],
    numContacts: Math.ceil(Math.random() * 10) + index,
    index: index,
    setCloseMenu: jest.fn(),
    contact: {
      ...mockContactMessage,
      status: 'AUTOBOOKED',
      type: 'AUTOBOOK',
      contact: mockEnsembleContact,
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<CurrentContactsOptions {...mockProps} />);
  });

  it('Find Dep btn is in the document and calls global.confirm & axios.post with expected args', () => {
    const findDepBtn = screen.getByText('Find Dep');
    expect(findDepBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(findDepBtn);
    });
    expect(global.confirm).toHaveBeenCalledWith(
      `Are you sure you want to find a dep for this player?`
    );
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        id: mockProps.contact.id,
        data: {
          status: 'FINDINGDEP',
        },
      }
    );
  });
});
