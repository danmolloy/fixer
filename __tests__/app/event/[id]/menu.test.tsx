import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import EventMenu, { EventMenuProps } from '../../../../app/event/[id]/menu';
import { useRouter } from 'next/navigation';
import axios from '../../../../__mocks__/axios';
import { mockEvent } from '../../../../__mocks__/models/event';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockUser } from '../../../../__mocks__/models/user';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';
import { messageToAllEmail } from '../../../../app/sendGrid/lib';

global.confirm = jest.fn(() => true);
global.prompt = jest.fn(() => "Hello, world. This is a mock message");
let mockPrompt = global.prompt;
let mockConfirm = global.confirm;



jest.mock('next/navigation');

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: EventMenuProps = {
  event: {
    ...mockEvent,
    calls: [mockCall],
    fixer: mockUser
  },
  contacts: [{
    ...mockContactMessage,
    accepted: true,
    contact: mockEnsembleContact
  }],
  getRunningSheet: jest.fn(),
};

describe('<EventMenu />', () => {
  beforeEach(() => {
    render(<EventMenu {...mockProps} />);
  });
  const openMenu = () => {
    const optionsBtn = screen.getByTestId('options-btn');
    act(() => {
      fireEvent.click(optionsBtn);
    });
  }
  it('<EventMenu /> renders', () => {
    const eventMenu = screen.getByTestId('event-menu');
    expect(eventMenu).toBeInTheDocument();
  });
  it('options-btn is in the document and renders menu options on click', () => {
    openMenu();
    const menuOptions = screen.getByTestId('menu-options');
    expect(menuOptions).toBeInTheDocument();
  });
  
  it('Update Event link is in the document with expected href & role', () => {
    openMenu();
    const updateEvent = screen.getByText('Update Event');
    expect(updateEvent).toBeInTheDocument();
    expect(updateEvent).toHaveAttribute('href', `update/${mockProps.event.id}`);
    expect(updateEvent).toHaveRole('link');
  });
  it('Message All button calls axios.post with expected args', () => {
    openMenu();
    const messageAll = screen.getByText('Message All');
    expect(messageAll).toBeInTheDocument();
    act(() => {
      fireEvent.click(messageAll);
    });
    expect(mockPrompt).toHaveBeenCalled();
    expect(messageToAllEmail).toHaveBeenCalled();
  });
  it("Print Running Sheet is in the document and calls getRunningSheet on click", () => {
    openMenu();
    const runningSheet = screen.getByText("Print Running Sheet");
    expect(runningSheet).toBeInTheDocument();
  })
 it('Export Event Details btn is in the document', () => {
    openMenu();
    const exportDetails = screen.getByText('Export Event Details');
    expect(exportDetails).toBeInTheDocument();
  });
  it('Export Orchestra List btn is in the document', () => {
    openMenu();
    const exportList = screen.getByText('Export Orchestra List');
    expect(exportList).toBeInTheDocument();
  });
  it('Export Calls List btn is in the document', () => {
    openMenu();
    const exportCalls = screen.getByText('Export Calls List');
    expect(exportCalls).toBeInTheDocument();
  });
  it('Cancel Event btn is in the document and calls confirm, axios.post & useRouter on click', async () => {
    openMenu();
    const cancelEvent = screen.getByText('Cancel Event');
    expect(cancelEvent).toBeInTheDocument();
    act(() => {
      fireEvent.click(cancelEvent);
    });
    expect(mockConfirm).toHaveBeenCalled();
    waitFor(() => {

      expect(mockPrompt).toHaveBeenCalled();
    })
    expect(axios.post).toHaveBeenCalledWith('/event/delete', {
      eventId: mockProps.event.id,
    });
    expect(useRouter).toHaveBeenCalled();
  }); 
});
