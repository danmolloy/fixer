import '@testing-library/jest-dom';
import HelpMessage, { HelpMessageProps } from '../../../app/layout/helpMessage';
import { screen, render } from '@testing-library/react';

const mockProps: HelpMessageProps = {
  head: 'Alert!!',
  additional: 'Beware!',
};

describe('<HelpMessage />', () => {
  beforeEach(() => {
    render(<HelpMessage {...mockProps} />);
  });
  it('<HelpMessage /> renders', () => {
    const helpMessage = screen.getByTestId('help-message');
    expect(helpMessage).toBeInTheDocument();
  });
  it('matches snapshot', () => {
    const helpMessage = screen.getByTestId('help-message');
    expect(helpMessage).toMatchSnapshot();
  });
});
