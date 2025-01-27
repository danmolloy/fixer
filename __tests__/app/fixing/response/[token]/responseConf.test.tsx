import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ResponseConf, {
  ResponseConfProps,
} from '../../../../../app/fixing/response/[token]/responseConf';
import { mockContactMessage } from '../../../../../__mocks__/models/contactMessage';
import { mockCall } from '../../../../../__mocks__/models/call';
import { mockEventSection } from '../../../../../__mocks__/models/eventSection';
import { mockEvent } from '../../../../../__mocks__/models/event';
import { useSearchParams } from 'next/navigation';
import { DateTime } from 'luxon';
import axios from '../../../../../__mocks__/axios';

jest.mock('next/navigation');
jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });
global.URL.createObjectURL = jest.fn();

describe('<ResponseConf />', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('<ResponseConf /> renders', () => {
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf).toBeInTheDocument();
  });
  //it("confetti if correct params", () => {})
  //it("handleCalendar", () => {})
});

describe('<ResponseConf />', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      status: 'ERROR',
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if ERROR, states to contact GigFix', () => {
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf.textContent).toMatch(
      'There has been an error. Please contact GigFix immediately.'
    );
  });
});

describe('<ResponseConf />', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      type: Math.random() > 0.5 ? 'BOOKING' : 'AUTOBOOK',
      status: 'FINDINGDEP',
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if FINDINGDEP, states that we are looking & player is still booked', () => {
    const header = screen.getByText('Finding Dep');
    expect(header).toHaveRole('heading');
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf.textContent).toMatch(
      'You are currently booked for this work, however we are trying to find you a dep.'
    );
  });
});

describe('<ResponseConf /> AVAILABILITY', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      status: 'DECLINED',
      type: 'AVAILABILITY',
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if AVAILABILITY, indicates if work was successfully declined', () => {
    const header = screen.getByText('Response received.');
    expect(header).toHaveRole('heading');
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf.textContent).toMatch('You declined this work.');
  });
});
describe('<ResponseConf /> AVAILABILITY', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      type: 'AVAILABILITY',
      status: 'AVAILABLE',
      calls: [mockCall],
      availableFor: [mockCall.id],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if AVAILABILITY, indicates if availability was successfully given with list of calls', () => {
    const header = screen.getByText('Response received.');
    expect(header).toHaveRole('heading');
    const responseConf = screen.getByTestId('response-confirmation');
    const callsAvailableFor = mockProps.contactMessage.calls.filter((i) =>
      mockProps.contactMessage.availableFor.includes(i.id)
    );

    expect(responseConf.textContent).toMatch(
      'You are available for the following calls:'
    );
    for (let i = 0; i < callsAvailableFor.length; i++) {
      expect(responseConf.textContent).toMatch(
        DateTime.fromJSDate(new Date(callsAvailableFor[i].startTime)).toFormat(
          'HH:mm DD'
        )
      );
    }
  });
});

describe('<ResponseConf /> BOOKING', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      type: 'BOOKING',
      status: 'ACCEPTED',
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if BOOKING, states if work was accepted', () => {
    const header = screen.getByText('Offer accepted.');
    expect(header).toHaveRole('heading');
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf.textContent).toMatch('You are booked for this work.');
  });
  it('if ACCEPTED, Add to Calendar btn is in the document and calls axios.post with expected args', () => {});
});
describe('<ResponseConf /> BOOKING', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      type: 'BOOKING',
      status: 'DECLINED',
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if BOOKING, states if work was declined', () => {
    const header = screen.getByText('Offer declined.');
    expect(header).toHaveRole('heading');
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf.textContent).toMatch('You declined this work.');
  });
});
describe('<ResponseConf /> AUTOBOOK', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      type: 'AUTOBOOK',
      status: 'AUTOBOOKED',
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if AUTOBOOK, states if you are booked', () => {
    const header = screen.getByText('Auto Booked');
    expect(header).toHaveRole('heading');
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf.textContent).toMatch(
      'The fixer automatically booked you for this work.'
    );
  });
  it('if AUTOBOOKED, Add to Calendar btn is in the document', () => {
    const addToCalBtn = screen.getByText('Add to Calendar');
    expect(addToCalBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(addToCalBtn);
    });
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/response/ics',
      mockProps.contactMessage
    );
  });
});
describe('<ResponseConf /> AUTOBOOK', () => {
  const mockProps: ResponseConfProps = {
    contactMessage: {
      ...mockContactMessage,
      status: 'DECLINED',
      type: 'AUTOBOOK',
      calls: [mockCall],
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    },
  };
  beforeEach(() => {
    render(<ResponseConf {...mockProps} />);
  });
  it('if AUTOBOOK, states if you have gotten out of the work', () => {
    const header = screen.getByText('Released.');
    expect(header).toHaveRole('heading');
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf.textContent).toMatch(
      'You are no longer booked for this work.'
    );
  });
});
