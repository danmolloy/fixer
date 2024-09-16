import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import YearCalendarHeader, {
  YearCalendarHeaderProps,
} from '../../../../app/calendar/yearCalendar/header';

const mockDate = DateTime.now();

const mockProps: YearCalendarHeaderProps = {
  month: mockDate.month,
  year: mockDate.year,
};

describe('<YearCalendarHeader />', () => {
  beforeEach(() => {
    render(
      <table>
        <YearCalendarHeader {...mockProps} />
      </table>
    );
  });
  it('year-header is in the document', () => {
    const yearHeader = screen.getByTestId('year-header');
    expect(yearHeader).toBeInTheDocument();
  });
  it('month in format LLLL is in the document', () => {
    const monthText = screen.getByText(
      `${DateTime.fromObject({ month: mockProps.month, year: mockProps.year }).toFormat('LLLL')}`
    );
    expect(monthText).toBeInTheDocument();
  });
});
