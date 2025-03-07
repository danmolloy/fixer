import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FullRunIndex, {
  FullRunIndexProps,
} from '../../../../app/event/[id]/fullRun';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockContactEventCall } from '../../../../__mocks__/models/ContactEventCall';
import { mockEnsembleContact } from '../../../../__mocks__/models/ensembleContact';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import { DateTime } from 'luxon';

const mockProps: FullRunIndexProps = {
  calls: [mockCall, { ...mockCall, id: 2 }],
  sections: [
    {
      ...mockEventSection,
      orchestration: [
        { ...mockOrchestration, numRequired: 3, callId: mockCall.id },
      ],
      contacts: [
        {
          ...mockContactMessage,
          id: 0,
          eventCalls: [
            {
              ...mockContactEventCall,
              callId: mockCall.id,
              call: mockCall,
              status: 'DECLINED',
            },
          ],
          contact: {
            ...mockEnsembleContact,
            firstName: 'Gerry',
            lastName: 'Kelly',
          },
        },
        {
          ...mockContactMessage,
          eventCalls: [
            {
              ...mockContactEventCall,
              callId: mockCall.id,
              call: mockCall,
              status: 'ACCEPTED',
            },
          ],
          contact: {
            ...mockEnsembleContact,
            firstName: 'Fiona',
            lastName: 'Kelly',
          },
        },
        {
          ...mockContactMessage,
          id: 2,
          eventCalls: [
            {
              ...mockContactEventCall,
              callId: mockCall.id,
              call: mockCall,
              status: 'ACCEPTED',
            },
          ],
          contact: {
            ...mockEnsembleContact,
            firstName: 'Ray',
            lastName: 'Phelan',
          },
        },
      ],
      ensembleSection: {
        ...mockSection,
        name: 'FLUTE',
      },
    },
  ],
};

describe('<FullRunIndex />', () => {
  beforeEach(() => {
    render(<FullRunIndex {...mockProps} />);
  });
  it('<FullRunIndex /> should render', () => {
    expect(screen.getByTestId('full-run-index')).toBeInTheDocument();
  });
  it('should render a table', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('should render a table head with column for Instrument and all calls', () => {
    expect(screen.getByText('Instrument')).toBeInTheDocument();
    for (let i = 0; i < mockProps.calls.length; i++) {
      const startTime = DateTime.fromJSDate(
        new Date(mockProps.calls[i].startTime)
      ).toFormat('HH:mm');
      const startDay = DateTime.fromJSDate(
        new Date(mockProps.calls[i].startTime)
      ).toFormat('DD');
      const callCol = screen.getByTestId(`call-${mockProps.calls[i].id}`);
      expect(callCol.textContent).toMatch(startTime);
      expect(callCol.textContent).toMatch(startDay);
    }
  });
  it('player row has instrument name, seat number, and player name', () => {
    const playerRowOne = screen.getByTestId(`${mockProps.sections[0].id}-0`);
    expect(playerRowOne.textContent).toMatch('FLUTE 1');
    expect(playerRowOne.textContent).toMatch('Fiona Kelly');
    expect(playerRowOne.textContent).toMatch('N/A');

    const playerRowTwo = screen.getByTestId(`${mockProps.sections[0].id}-1`);
    expect(playerRowTwo.textContent).toMatch('2');
    expect(playerRowTwo.textContent).toMatch('Ray Phelan');
    expect(playerRowOne.textContent).toMatch('N/A');
  });
  it('only shows booked players', () => {
    expect(screen.getByTestId('full-run-index')).toBeInTheDocument();
    expect(screen.queryByText('Gerry Kelly')).not.toBeInTheDocument();
  });
  it("calls state 'TBC' if not required", () => {
    const playerRowTwo = screen.getByTestId(`${mockProps.sections[0].id}-2`);
    expect(playerRowTwo.textContent).toMatch('3');
    expect(playerRowTwo.textContent).toMatch('TBC');
    expect(playerRowTwo.textContent).toMatch('N/A');
  });
});
