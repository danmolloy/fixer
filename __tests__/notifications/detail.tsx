import '@testing-library/jest-dom';
import NotificationDetail, {
  NotificationDetailProps,
} from '../../app/notifications/detail';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { mockPlayerCallNotification } from '../../__mocks__/models/playerCall';
import { DateTime } from 'luxon';
import axios from 'axios';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: NotificationDetailProps = {
  playerCall: {
    ...mockPlayerCallNotification,
    accepted: null,
    playerMessage: 'mockPlayerMessage',
  },
};

describe('<NotificationDetail />', () => {
  beforeEach(() => {
    render(<NotificationDetail {...mockProps} />);
  });
  it('notification-detail is in the document', () => {
    const notificationDetail = screen.getByTestId(
      `${mockProps.playerCall.id}-detail`
    );
    expect(notificationDetail).toBeInTheDocument();
  });
  it('event-info is in the document with player specific calls', () => {
    const eventInfoDiv = screen.getByTestId('event-info-div');
    expect(eventInfoDiv).toBeInTheDocument();
    for (let i = 0; i < mockProps.playerCall.calls.length; i++) {
      const formattedStartTime = String(
        DateTime.fromJSDate(
          new Date(mockProps.playerCall.calls[i].startTime)
        ).toFormat('HH:mm DD')
      );
      const formattedEndTime = String(
        DateTime.fromJSDate(
          new Date(mockProps.playerCall.calls[i].endTime)
        ).toFormat('HH:mm DD')
      );
      expect(eventInfoDiv.textContent).toMatch(formattedStartTime);
      expect(eventInfoDiv.textContent).toMatch(formattedEndTime);
    }
  });
  it('<NotificationControls /> is in the document', () => {
    const notificationControls = screen.getByTestId('notification-controls');
    expect(notificationControls).toBeInTheDocument();
  });
  it('on gig accept/decline, axios.post is called with expected args', async () => {
    const acceptBtn = screen.getByText('Accept');
    await act(async () => {
      await fireEvent.click(acceptBtn);
    });
    expect(mockPost).toHaveBeenCalledWith('/api/playerCall/update', {
      data: {
        accepted: true,
      },
      playerCallId: mockProps.playerCall.id,
    });
  });
  it('additional player message is in the document with message', () => {
    const playerMessage = screen.getByTestId('player-msg');
    expect(playerMessage).toBeInTheDocument();
    expect(playerMessage.textContent).toMatch(
      `${mockProps.playerCall.eventSection.event.fixerName} adds:`
    );
    expect(playerMessage.textContent).toMatch(
      mockProps.playerCall.playerMessage
    );
  });
  it('states who offers gig', () => {
    const fixer = mockProps.playerCall.eventSection.event.fixerName;
    const ensembleName = mockProps.playerCall.eventSection.event.ensemble.name;
    const offerOrAvailability =
      mockProps.playerCall.bookingOrAvailability === 'Booking'
        ? 'offers'
        : 'checks availability for';
    const senderInfo = screen.getByText(
      `${fixer} (${ensembleName}) ${offerOrAvailability}:`
    );
    expect(senderInfo).toBeInTheDocument();
  });
  //it("additional section messageToAll is in the document", () => {})
});

describe('<NotificationDetail />', () => {
  const mockProps: NotificationDetailProps = {
    playerCall: {
      ...mockPlayerCallNotification,
      accepted: true,
    },
  };
  beforeEach(() => {
    render(<NotificationDetail {...mockProps} />);
  });
  it('if playerCall accepted, it states so and there are no control buttons', () => {
    const acceptedMsg = screen.getByText('You accepted this work.');
    expect(acceptedMsg).toBeInTheDocument();
  });
});

describe('<NotificationDetail />', () => {
  const mockProps: NotificationDetailProps = {
    playerCall: {
      ...mockPlayerCallNotification,
      accepted: false,
    },
  };
  beforeEach(() => {
    render(<NotificationDetail {...mockProps} />);
  });
  it('if playerCall declined, it states so and there are no control buttons', () => {
    const declinedMsg = screen.getByText('You declined this work.');
    expect(declinedMsg).toBeInTheDocument();
  });
});
