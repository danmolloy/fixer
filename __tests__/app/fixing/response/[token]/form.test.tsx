import '@testing-library/jest-dom';
import ResponseForm, {
  ResponseFormProps,
} from '../../../../../app/fixing/response/[token]/form';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { mockContactMessage } from '../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../__mocks__/models/ensembleContact';
import { mockEventSection } from '../../../../../__mocks__/models/eventSection';
import { mockEvent } from '../../../../../__mocks__/models/event';
import { mockUser } from '../../../../../__mocks__/models/user';
import { mockSection } from '../../../../../__mocks__/models/ensembleSection';
import { mockCall } from '../../../../../__mocks__/models/call';
import {
  responseConfEmail,
  SentEmailData,
} from '../../../../../app/sendGrid/playerLib';
import axios from '../../../../../__mocks__/axios';
import { getDateRange } from '../../../../../app/fixing/contactMessage/api/create/functions';

global.confirm = jest.fn(() => true);

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockEmail: SentEmailData = {
  templateID: 'fake-template',
  email: mockEnsembleContact.email!,
  bodyText: 'Email body',
  subject: 'mock subject',
};

jest.mock('../../../../../app/sendGrid/lib', () => ({
  responseConfEmail: jest.fn(() => ({ ...mockEmail })),
}));

let mockProps: ResponseFormProps = {
  contactMessage: {
    ...mockContactMessage,
    contact: mockEnsembleContact,
    eventSection: {
      ...mockEventSection,
      ensembleSection: mockSection,
      event: {
        ...mockEvent,
        fixer: mockUser,
      },
    },
    calls: [mockCall],
  },
  accepted: null,
  bookingOrAvailability: 'booking',
  fixerName: 'mock fixer name',
};

describe('<ResponseForm />', () => {
  let localMockProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      strictlyTied: true,
    },
  };
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));

    render(<ResponseForm {...localMockProps} />);
  });
  it('<ResponseForm /> renders', () => {
    const responseForm = screen.getByTestId('response-form');
    expect(responseForm).toBeInTheDocument();
  });
  it('states if work is strictly tied', () => {
    const strictStatement = screen.getByText('This work is strictly tied.');
    expect(strictStatement).toBeInTheDocument();
  });
  it('not accepting radiobox field is appropriately labeled', () => {
    const falseRadio = screen.getByLabelText('No, I am not available.');
    expect(falseRadio).toHaveAttribute('value', 'false');
    expect(falseRadio).toHaveAttribute('name', 'accepted');
    expect(falseRadio).toHaveAttribute('type', 'radio');
  });
  it('accepting radiobox is appropriately labeled if strictlyTied', () => {
    const trueRadio = screen.getByLabelText('Yes, I am available');
    expect(trueRadio).toHaveAttribute('value', 'true');
    expect(trueRadio).toHaveAttribute('name', 'accepted');
    expect(trueRadio).toHaveAttribute('type', 'radio');
  });
  it('on successful submit, prisma.contactMessage.update, responseConfEmail, axios.post & useRouter are called', async () => {
    const trueRadio = screen.getByLabelText('Yes, I am available');
    await act(async () => {
      await fireEvent.click(trueRadio);
    });
    const submitBtn = screen.getByText('Submit');
    await act(async () => {
      await fireEvent.click(submitBtn);
    });
    expect(axios.post).toHaveBeenCalledWith(
      '/fixing/contactMessage/api/update',
      {
        id: localMockProps.contactMessage.id,
        data: {
          accepted: true,
          acceptedDate: new Date(2020, 3, 1),
          availableFor: localMockProps.contactMessage.calls.map((i) => i.id),
        },
      }
    );
    expect(responseConfEmail).toHaveBeenCalledWith({
      dateRange: getDateRange(localMockProps.contactMessage.calls),
      firstName: localMockProps.contactMessage.contact.firstName,
      email: localMockProps.contactMessage.contact.email!,
      ensemble: localMockProps.contactMessage.eventSection.event.ensembleName,
      accepted: true,
      bookingOrAvailability:
        localMockProps.contactMessage.bookingOrAvailability,
    });
    expect(axios.post).toHaveBeenCalledWith('/sendGrid', {
      body: {
        emailData: mockEmail,
        templateID: mockEmail.templateID,
        emailAddress: mockEmail.email,
      },
    });
  });

  it('initial vals are as expected', () => {});
  it('appropriate label for accept radio if !strictlyTied', () => {});
  it('if !strictlyTied, there is indication of how many calls are ticked', () => {});
  it("if !strictlyTied, played must be available for at least 1 call to select 'yes'", () => {});
  it('if !strictlyTied, each call has checkbox with readable datetime label', () => {});
  it('submit btn renders errs if form not completed', () => {});
  it('if accepting offer, global.confirm is called with appropriate message', () => {});
  it('if declining offer, global.confirm is called with appropriate message', () => {});
  it('if not available, global.confirm is called with appropriate message', () => {});
  it('if available for all work, global.confirm is called with appropriate message', () => {});
  it('if availability is mixed, global.confirm is called with appropriate message', () => {});
});

describe('<ResponseForm />', () => {
  let localMockProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      strictlyTied: false,
    },
  };
  beforeEach(() => {
    render(<ResponseForm {...localMockProps} />);
  });

  it('state if work is not strictly tied', () => {
    const strictStatement = screen.getByText('This work is not strictly tied.');
    expect(strictStatement).toBeInTheDocument();
  });
  //it("not accepting radiobox field is appropriately labeled", () => {})
  //it("accepting radiobox is appropriately labeled if strictlyTied", () => {})
  //it("appropriate label for accept radio if !strictlyTied", () => {})
  //it("if !strictlyTied, there is indication of how many calls are ticked", () => {})
  //it("if !strictlyTied, played must be available for at least 1 call to select 'yes'", () => {})
  //it("if !strictlyTied, each call has checkbox with readable datetime label", () => {})
  //it("submit btn renders errs if form not completed", () => {})
  //it('if accepting offer, global.confirm is called with appropriate message', () => {})
  //it('if declining offer, global.confirm is called with appropriate message', () => {})
  //it('if not available, global.confirm is called with appropriate message', () => {})
  //it('if available for all work, global.confirm is called with appropriate message', () => {})
  //it('if availability is mixed, global.confirm is called with appropriate message', () => {})
});
