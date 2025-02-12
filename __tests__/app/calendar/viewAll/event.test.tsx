import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventOverview, {
  EventOverviewProps,
  gigStatus,
} from '../../../../app/calendar/viewAll/event';
import { mockEvent } from '../../../../__mocks__/models/event';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockCall } from '../../../../__mocks__/models/call';
import { getDateRange } from '../../../../app/fixing/contactMessage/api/create/functions';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';
import GigStatus from '../../../../app/event/create/gigStatus';
import { ContactMessageStatus, ContactMessageType } from '@prisma/client';

describe('<EventOverview />', () => {
  const mockProps: EventOverviewProps = {
    event: {
      ...mockEvent,
      sections: [],
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<EventOverview {...mockProps} />);
  });
  it('<EventOverview /> renders', () => {
    const eventOverview = screen.getByTestId('event-overview');
    expect(eventOverview).toBeInTheDocument();
  });
  it('date range is in the document', () => {
    const dateRange = getDateRange(mockProps.event.calls);
    const eventOverview = screen.getByTestId('event-overview');
    expect(eventOverview.textContent).toMatch(dateRange);
  });
  it('event title is in the document', () => {
    const eventOverview = screen.getByTestId('event-overview');
    expect(eventOverview.textContent).toMatch(mockProps.event.eventTitle);
  });
  it("states if !fixing", () => {
    const eventOverview = screen.getByTestId('event-overview');
    expect(eventOverview.textContent).toMatch('No fixing');

  })
});

describe('<EventOverview />', () => {
  const mockPropsCall = mockCall;
  const mockProps: EventOverviewProps = {
    event: {
      ...mockEvent,
      sections: [{
        ...mockEventSection,
        contacts: [{
          ...mockContactMessage,
          status: "DECLINED",
          calls: [mockPropsCall],
        }],
        ensembleSection: mockSection,
        orchestration: [{...mockOrchestration, callId: mockPropsCall.id, numRequired: 20}],
      }],
      calls: [mockPropsCall],
    },
  };
  beforeEach(() => {
    render(<EventOverview {...mockProps} />);
  });
  
  it('if !fixed, states seats to fill, num remaining on list & instrument', () => {
    const eventOverview = screen.getByTestId('event-overview');
    expect(eventOverview.textContent).toMatch(`${mockProps.event.sections[0].ensembleSection.name}: (20 seats to fill, 0 remain on list)`);
  });
});

/* describe('<EventOverview />', () => {
  const mockProps: EventOverviewProps = {
    event: {
      ...mockEvent,
      sections: [{
        ...mockEventSection,
        contacts: [{
          ...mockContactMessage,
          calls: [mockCall],
        }],
        ensembleSection: mockSection,
        orchestration: [mockOrchestration],
      }],
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<EventOverview {...mockProps} />);
  });
  it('states if overbooked', () => {});
  it('instrumentation shorthand is stated', () => {});
}); */

describe('gigStatus()', () => {
  it("returns empty array if all calls are fixed", () => {
    
    const event = {
      ...mockEvent,
      sections: [{
        ...mockEventSection,
        contacts: [{
          ...mockContactMessage,
          type: "BOOKING" as ContactMessageType,
          status: 'ACCEPTED' as ContactMessageStatus,
          calls: [mockCall],
        }],
        ensembleSection: mockSection,
        orchestration: [{
          ...mockOrchestration, 
          callId: mockCall.id, 
          numRequired: 1,
        }],
      }],
      calls: [mockCall],
    };
    const result = gigStatus(event);
    expect(result).toEqual([]);
  });

  it("returns array of sections with unfixed calls", () => {
    const event = {
      ...mockEvent,
      sections: [{
        ...mockEventSection,
        contacts: [{
          ...mockContactMessage,
          status: 'AWAITINGREPLY' as ContactMessageStatus,
          type: "BOOKING" as ContactMessageType,
          calls: [mockCall],
        }],
        ensembleSection: mockSection,
        orchestration: [{...mockOrchestration, numRequired: 2}],
      }],
      calls: [mockCall],
    };
    const result = gigStatus(event);
    expect(result).toEqual([{
      ...mockOrchestration,
      sectionName: mockSection.name,
      numRequired: 2,
      bookedForCall: 0,
      numToDep: 0,
      remainingOnList: 1,
    }]);
  }); 
})