import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { mockUserWithCallsAndEvents } from '../../../__mocks__/models/user';
import CalendarIndex, { CalendarIndexProps } from '../../../app/calendar';

const mockProps: CalendarIndexProps = {
  data: mockUserWithCallsAndEvents,
};

describe('<CalendarIndex />', () => {
  beforeEach(() => {
    render(<CalendarIndex {...mockProps} />);
  });
  it('calendar-header is in the document', () => {
    const calendarHeader = screen.getByTestId('calendar-header');
    expect(calendarHeader).toBeInTheDocument();
  });
  it('calendar-index is in the document', () => {
    const calendarIndex = screen.getByTestId('calendar-index');
    expect(calendarIndex).toBeInTheDocument();
  });
  it('date-picker is in the document', () => {
    const datePicker = screen.getByTestId('date-picker');
    expect(datePicker).toBeInTheDocument();
  });
  it('call-list is in the document', () => {
    const callList = screen.getByTestId('call-list');
    expect(callList).toBeInTheDocument();
  });
  it('past events are not in upcoming events', () => {});
});
