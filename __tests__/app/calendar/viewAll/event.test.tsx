import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventOverview, {
  EventOverviewProps,
} from '../../../../app/calendar/viewAll/event';
import { mockEvent } from '../../../../__mocks__/models/event';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockCall } from '../../../../__mocks__/models/call';
import { getDateRange } from '../../../../app/fixing/contactMessage/api/create/functions';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';

describe('<EventOverview />', () => {
  const mockProps: EventOverviewProps = {
    event: {
      ...mockEvent,
      sections: [
        {
          ...mockEventSection,
          ensembleSection: mockSection,
          numToBook: 1,
          contacts: [
            {
              ...mockContactMessage,
              type: 'AUTOBOOK',
              status: 'AUTOBOOKED',
            },
          ],
        },
        {
          ...mockEventSection,
          ensembleSection: mockSection,
          id: 2,
          numToBook: 1,
          contacts: [
            {
              ...mockContactMessage,
              type: 'BOOKING',
              status: 'ACCEPTED',
            },
          ],
        },
      ],
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
  it('states if fixed', () => {
    const eventOverview = screen.getByTestId('event-overview');
    expect(eventOverview.textContent).toMatch('Gig is fixed');
  });
});

describe('<EventOverview />', () => {
  const mockProps: EventOverviewProps = {
    event: {
      ...mockEvent,
      sections: [
        {
          ...mockEventSection,
          numToBook: 1,
          ensembleSection: {
            ...mockSection,
            name: 'Nose Bleed',
          },
          contacts: [
            {
              ...mockContactMessage,
              type: 'BOOKING',
              status: 'NOTCONTACTED',
            },
          ],
        },
      ],
      calls: [mockCall],
    },
  };
  beforeEach(() => {
    render(<EventOverview {...mockProps} />);
  });
  it('if !fixed, states numbers in each section yet to book', () => {
    const fixingOverview = screen.getByTestId('fixing-overview');
    expect(fixingOverview.textContent).toMatch('Not yet fixed:');
    expect(fixingOverview.textContent).toMatch(
      'Nose Bleed section (0/1 booked, 1 remains on list)'
    );
  });
  it('states if running low on lists', () => {});
  it('states if run out of contacts to call', () => {});
  it('states num & instrument of those finding dep', () => {});
  it('states if overbooked', () => {});
  it('instrumentation shorthand is stated', () => {});
});
