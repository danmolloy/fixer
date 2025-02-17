import '@testing-library/jest-dom';
import OrchestrationSummary, {
  OrchestrationSummaryProps,
} from '../../../../app/fixing/eventSection/orchestration';
import { render, screen } from '@testing-library/react';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import { DateTime } from 'luxon';

const mockProps: OrchestrationSummaryProps = {
  eventCalls: [mockCall, { ...mockCall, id: 212 }],
  orchestration: [
    {
      ...mockOrchestration,
      callId: mockCall.id,
    },
  ],
};

describe('<OrchestrationSummary />', () => {
  beforeEach(() => {
    render(<OrchestrationSummary {...mockProps} />);
  });
  it('renders without crashing', () => {
    const summary = screen.getByTestId('orchestration-summary');
    expect(summary).toBeInTheDocument();
  });
  it('each call has formatted date & (numRequired or 0)', () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      const numRequired =
        mockProps.orchestration.find(
          (orch) => orch.callId === mockProps.eventCalls[i].id
        )?.numRequired || 0;
      const callText = `${DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat('HH:mm dd LLL')}: Booking ${numRequired} player(s)`;
      const call = screen.getByText(callText);
      expect(call).toBeInTheDocument();
    }
  });
});
