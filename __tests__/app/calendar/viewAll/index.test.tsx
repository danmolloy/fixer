import '@testing-library/jest-dom';
import ViewAllUpcoming, {
  ViewAllUpcomingProps,
} from '../../../../app/calendar/viewAll';
import { render, screen } from '@testing-library/react';
import { mockEvent } from '../../../../__mocks__/models/event';
import { mockCall } from '../../../../__mocks__/models/call';
import { mockSection } from '../../../../__mocks__/models/ensembleSection';
import { mockEventSection } from '../../../../__mocks__/models/eventSection';
import { mockContactMessage } from '../../../../__mocks__/models/contactMessage';
import { mockOrchestration } from '../../../../__mocks__/models/orchestration';

const mockProps: ViewAllUpcomingProps = {
  events: [{
    ...mockEvent,
    calls: [mockCall],
    sections: [{
      ...mockEventSection,
      contacts: [{
        ...mockContactMessage,
        calls: [mockCall],
      }],
      orchestration: [mockOrchestration],
      ensembleSection: mockSection,
    }]
  }],
};

describe('<ViewAllUpcoming />', () => {
  beforeEach(() => {
    render(<ViewAllUpcoming {...mockProps} />);
  });
  it('<ViewAllUpcoming /> renders', () => {
    const upcomingEvents = screen.getByTestId('upcoming-events');
    expect(upcomingEvents).toBeInTheDocument();
  });
  it("'Upcoming Events' heading is in the document", () => {
    const pageHeader = screen.getByText('Upcoming Events');
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveRole('heading');
  });
  it('all upcoming events are in the document', () => {
    const upcomingEventTiles = screen.getAllByTestId('event-overview');
    expect(upcomingEventTiles[0].textContent).toMatch(mockProps.events[0].eventTitle);
  });
});

describe('<ViewAllUpcoming />', () => {
  const mockProps: ViewAllUpcomingProps = {
    events: [],
  };

  beforeEach(() => {
    render(<ViewAllUpcoming {...mockProps} />);
  });
  it('if !events, there is helpful text with Create Event link', () => {
    const upcomingEvents = screen.getByTestId('upcoming-events');
    expect(upcomingEvents.textContent).toMatch('No upcoming events.');
    expect(upcomingEvents.textContent).toMatch(
      'Get started by creating an event.'
    );
    const createEventLink = screen.getByText('Create Event');
    expect(createEventLink).toHaveAttribute('href', '/event/create');
  });
});
