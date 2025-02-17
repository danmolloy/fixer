import '@testing-library/jest-dom';
import ResponseHeader, {
  ResponseHeaderProps,
} from '../../../../../app/fixing/response/[token]/header';
import { render, screen } from '@testing-library/react';

const mockProps: ResponseHeaderProps = {
  type: 'AUTOBOOK',
  contactFirstName: 'Greg',
  fixerName: 'Dylan',
};

describe('<ResponseHeader />', () => {
  let localMockProps: ResponseHeaderProps = {
    ...mockProps,
    type: 'AVAILABILITY',
  };
  beforeEach(() => {
    render(<ResponseHeader {...localMockProps} />);
  });
  it('renders without crashing', () => {
    const responseHeader = screen.getByTestId('response-header');
    expect(responseHeader).toBeInTheDocument();
  });
  it('if availability, expected text is in the document', () => {
    const responseHeader = screen.getByTestId('response-header');
    expect(responseHeader.textContent).toMatch('Availability Check');
    expect(responseHeader.textContent).toMatch(
      `Dear ${mockProps.contactFirstName}, ${mockProps.fixerName} would like you to indicate your decision below regarding the following gig.`
    );
  });
});

describe('<ResponseHeader />', () => {
  let localMockProps: ResponseHeaderProps = {
    ...mockProps,
    type: 'AUTOBOOK',
  };
  beforeEach(() => {
    render(<ResponseHeader {...localMockProps} />);
  });
  it('if autobooked, expected text is in the document', () => {
    const responseHeader = screen.getByTestId('response-header');
    expect(responseHeader.textContent).toMatch('You are booked');
    expect(responseHeader.textContent).toMatch(
      `Dear ${mockProps.contactFirstName}, ${mockProps.fixerName} has booked you for the following gig.`
    );
  });
});

describe('<ResponseHeader />', () => {
  let localMockProps: ResponseHeaderProps = {
    ...mockProps,
    type: 'BOOKING',
  };
  beforeEach(() => {
    render(<ResponseHeader {...localMockProps} />);
  });
  it('if booking, expected text is in the document', () => {
    const responseHeader = screen.getByTestId('response-header');
    expect(responseHeader.textContent).toMatch('Gig Offer');
    expect(responseHeader.textContent).toMatch(
      `Dear ${mockProps.contactFirstName}, ${mockProps.fixerName} would like you to indicate your decision below regarding the following gig.`
    );
  });
});
