import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import ViewSelect, {
  viewOptions,
  ViewSelectProps,
} from '../../../app/calendar/viewSelect';

const mockProps: ViewSelectProps = {
  selectedView: 'Day',
  setSelectedView: jest.fn(),
};

describe('<ViewSelect />', () => {
  beforeEach(() => {
    render(<ViewSelect {...mockProps} />);
  });
  it('view-select is in the document', () => {
    const viewSelect = screen.getByTestId('view-select');
    expect(viewSelect).toBeInTheDocument();
  });
  it('all options are in the document', async () => {
    const viewSelect = screen.getByTestId('view-select');
    expect(viewSelect).toBeInTheDocument();

    for (let i = 0; i < viewOptions.length; i++) {
      let alternateOption = screen.getByTestId(`${viewOptions[i]}-option`);
      expect(viewSelect).toHaveTextContent(viewOptions[i]);
      expect(alternateOption.textContent).toMatch(viewOptions[i]);
      expect(alternateOption).toHaveAttribute('value', viewOptions[i]);
      expect(alternateOption).toHaveRole('option');
    }
  });
});
