import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import SectionViewSelect, {
  SectionSelectProps,
} from '../../../../app/fixing/eventSection/viewSelect';

const mockProps: SectionSelectProps = {
  selectedView: 'AVAILABILITY',
  setSelectedView: jest.fn(),
  disabled: false,
  availabilityCheckCount: 1,
};

describe('<SectionViewSelect />', () => {
  let localMockProps: SectionSelectProps = {
    ...mockProps,
  };
  beforeEach(() => {
    render(<SectionViewSelect {...localMockProps} />);
  });
  it('renders without crashing', () => {
    const viewSelect = screen.getByTestId('view-select');
    expect(viewSelect).toBeInTheDocument();
  });
  it('Booking select btn is in the document and calls setSelectedView(BOOKING) on click', () => {
    const bookingBtn = screen.getByTestId('booking-btn');
    expect(bookingBtn).toBeInTheDocument();
    expect(bookingBtn).toHaveTextContent('Booking');
    act(() => {
      fireEvent.click(bookingBtn);
    });
    expect(localMockProps.setSelectedView).toHaveBeenCalledWith('BOOKING');
  });
  it('Availability select btn is in the document, states check count and calls setSelectedView(AVAILABILITY) on click', () => {
    const availBtn = screen.getByTestId('avail-btn');
    expect(availBtn).toBeInTheDocument();
    expect(availBtn).toHaveTextContent(
      `Availability (${localMockProps.availabilityCheckCount})`
    );
    act(() => {
      fireEvent.click(availBtn);
    });
    expect(localMockProps.setSelectedView).toHaveBeenCalledWith('AVAILABILITY');
  });
  it('booking & availability btns are disabled if disabled === true', () => {});
});

describe('<SectionViewSelect />', () => {
  let localMockProps: SectionSelectProps = {
    ...mockProps,
    disabled: true,
  };
  beforeEach(() => {
    render(<SectionViewSelect {...localMockProps} />);
  });

  it('booking & availability btns are disabled if disabled === true', () => {
    const bookingBtn = screen.getByTestId('booking-btn');
    act(() => {
      fireEvent.click(bookingBtn);
    });
    const availBtn = screen.getByTestId('avail-btn');
    act(() => {
      fireEvent.click(availBtn);
    });
    expect(localMockProps.setSelectedView).not.toHaveBeenCalled();
  });
});
