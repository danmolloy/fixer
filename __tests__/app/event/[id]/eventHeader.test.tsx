import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EventHeader, {
  DetailHeaderProps,
} from '../../../../app/event/[id]/eventHeader';

const mockProps: DetailHeaderProps = {
  eventTitle: 'The Big Gig',
};

describe('<EventHeader />', () => {
  beforeEach(() => {
    render(
      <table>
        <EventHeader {...mockProps} />
      </table>
    );
  });
  it('<EventHeader /> renders as table header', () => {
    const eventHeader = screen.getByTestId('detail-header');
    expect(eventHeader).toBeInTheDocument();
  });
  it('event title is in the document', () => {
    const eventTitle = screen.getByText(mockProps.eventTitle);
    expect(eventTitle).toBeInTheDocument();
  });
});
