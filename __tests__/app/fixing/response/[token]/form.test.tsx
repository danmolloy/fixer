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
import { responseConfEmail } from '../../../../../app/sendGrid/playerLib';
import axios from '../../../../../__mocks__/axios';
import { getDateRange } from '../../../../../app/fixing/contactMessage/api/create/functions';
import { SentEmailData } from '../../../../../app/sendGrid/lib';
import { mockContactEventCall } from '../../../../../__mocks__/models/ContactEventCall';
import { ContactMessageType } from '@prisma/client';
import { DateTime } from 'luxon';

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
    eventCalls: [
      {
        ...mockContactEventCall,
        call: mockCall,
      },
    ],
  },
  type: 'BOOKING',
  fixerName: 'mock fixer name',
};

describe('<ResponseForm />', () => {
  let localMockProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      strictlyTied: true,
      type: 'BOOKING' as ContactMessageType,
    },
    type: 'BOOKING' as ContactMessageType,
  };
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));

    render(<ResponseForm {...localMockProps} />);
  });
  it('<ResponseForm /> renders without error', () => {
    const form = screen.getByTestId('response-form');
    expect(form).toBeInTheDocument();
  });
  it("'Your Response' title renders", () => {
    expect(screen.getByText('Your Response')).toBeInTheDocument();
  });
  it('states if work is strictly tied', () => {
    const form = screen.getByTestId('response-form');
    expect(form.textContent).toMatch('This work is strictly tied');
  });
  it('false input is in the document with expected label, name, type and value', () => {
    const falseInput = screen.getByLabelText('No, I am not available.');
    expect(falseInput).toBeInTheDocument();
    expect(falseInput).toHaveAttribute('name', 'status');
    expect(falseInput).toHaveAttribute('type', 'radio');
    expect(falseInput).toHaveAttribute('value', 'DECLINED');
  });
  it('if booking, true input is in the document with expected label, name, type and value', () => {
    const trueInput = screen.getByLabelText('Yes, I accept this work.');
    expect(trueInput).toBeInTheDocument();
    expect(trueInput).toHaveAttribute('name', 'status');
    expect(trueInput).toHaveAttribute('type', 'radio');
    expect(trueInput).toHaveAttribute('value', 'ACCEPTED');
  });
  //it("if no event calls selected, helpful message is displayed", () => {});
  //it("if availability check, submit btn calls global.confirm with expected args", () => {});
  //it("if offer declined, submit btn calls global.confirm with expected args", () => {});
  //it("it offer accepted, submit btn calls global.confirm with expected args", () => {});
  //it("on submit, axios.post is called twice with expected args", async () => {});
});

describe('<ResponseForm />', () => {
  let localMockProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      strictlyTied: false,
      type: 'AVAILABILITY' as ContactMessageType,
    },
  };
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));

    render(<ResponseForm {...localMockProps} />);
  });

  it('if !strictlyTied, it states so', () => {
    const form = screen.getByTestId('response-form');
    expect(form.textContent).toMatch('This work is not strictly tied');
  });
  it('if !strictlyTied, true input has expected label text', () => {
    const trueInput = screen.getByLabelText(
      'I am available for all/some calls'
    );
    expect(trueInput).toBeInTheDocument();
    expect(trueInput).toHaveAttribute('value', 'AVAILABLE');
  });
  /* it("if !strictlyTied, there are checkboxes for each event call with label, type & value", async () => {
    // check a checkbox?
    const trueInput = screen.getByLabelText("I am available for all/some calls");
    await act(async () => {
      fireEvent.click(trueInput);
    })
    const callCheckboxes = screen.getByTestId("call-checkboxes");
    expect(callCheckboxes).toBeInTheDocument();
    for (let i = 0; i < mockProps.contactMessage.eventCalls.length; i++) {
      const checkBox = screen.getByLabelText(
        DateTime.fromJSDate(
          new Date(mockProps.contactMessage.eventCalls.find(c => c.callId === mockProps.contactMessage[i].callId)!.call.startTime)).toFormat(
            'HH:mm DD'
          ))
      expect(checkBox).toBeInTheDocument();
      expect(checkBox).toHaveAttribute("value", "AVAILABLE");
      expect(checkBox).toHaveAttribute('type', 'checkbox');
    }
  }); */
});

describe('<ResponseForm />', () => {
  let localMockProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      strictlyTied: true,
      type: 'AVAILABILITY' as ContactMessageType,
    },
  };
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));

    render(<ResponseForm {...localMockProps} />);
  });

  it('if availability, true input is in the document with expected label, name, type and value', () => {
    const trueInput = screen.getByLabelText('Yes, I am available');
    expect(trueInput).toBeInTheDocument();
    expect(trueInput).toHaveAttribute('name', 'status');
    expect(trueInput).toHaveAttribute('type', 'radio');
    expect(trueInput).toHaveAttribute('value', 'AVAILABLE');
  });
});
