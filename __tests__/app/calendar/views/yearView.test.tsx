import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import YearView, {
  YearViewProps,
} from '../../../../app/calendar/views/yearView';
import { mockCall } from '../../../../__mocks__/models/call';
import { DateTime } from 'luxon';

const mockProps: YearViewProps = {
  setSelectedView: jest.fn(),
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  eventCalls: [mockCall],
};

describe('<YearView />', () => {
  beforeEach(() => {
    render(<YearView {...mockProps} />);
  });
  it('back toggle button calls setSelectedView with expected args', () => {
    const yearTitle = screen.getByTestId(
      `${mockProps.selectedDate.year}-title`
    );
    expect(yearTitle).toBeInTheDocument();
    expect(yearTitle.textContent).toMatch(String(mockProps.selectedDate.year));

    const backTog = screen.getByTestId('back-toggle');
    expect(backTog).toBeInTheDocument();
    act(() => {
      fireEvent.click(backTog);
    });
    expect(mockProps.setSelectedDate).toHaveBeenCalledWith(
      mockProps.selectedDate.startOf('month').minus({ years: 1 })
    );
  });
  it('forward toggle button calls setSelectedView with expected args', () => {
    const yearTitle = screen.getByTestId(
      `${mockProps.selectedDate.year}-title`
    );
    expect(yearTitle).toBeInTheDocument();
    expect(yearTitle.textContent).toMatch(String(mockProps.selectedDate.year));

    const forwardTog = screen.getByTestId('forward-toggle');
    expect(forwardTog).toBeInTheDocument();
    act(() => {
      fireEvent.click(forwardTog);
    });
    expect(mockProps.setSelectedDate).toHaveBeenCalledWith(
      mockProps.selectedDate.startOf('month').plus({ years: 1 })
    );
  });
  it('all months of the year are in the document', () => {
    const janDateTime = mockProps.selectedDate
      .set({ month: 1, year: mockProps.selectedDate.year })
      .startOf('month');
    for (let i = 0; i < 12; i++) {
      const monthCal = screen.getByTestId(
        `${janDateTime.plus({ months: i }).month}-${janDateTime.year}-calendar`
      );
      expect(monthCal).toBeInTheDocument();
    }
  });
  it('selected year is in the document', () => {
    const yearTitle = screen.getByTestId(
      `${mockProps.selectedDate.year}-title`
    );
    expect(yearTitle).toBeInTheDocument();
    expect(yearTitle.textContent).toMatch(String(mockProps.selectedDate.year));
  });
});
