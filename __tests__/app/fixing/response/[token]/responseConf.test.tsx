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
import { mockContactEventCall } from '../../../../../__mocks__/models/ContactEventCall';

jest.mock('next/navigation');
jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });
global.URL.createObjectURL = jest.fn();


const mockProps: ResponseConfProps = {
  contactMessage: {
    ...mockContactMessage,
    eventCalls: [{
      ...mockContactEventCall,
      call: mockCall
    }],
    eventSection: {
      ...mockEventSection,
      event: mockEvent,
    },
  },
};

describe('<ResponseConf />', () => {
  let localMockProps: ResponseConfProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      status: "ERROR",
      eventCalls: [{
        ...mockContactEventCall,
        status: "ACCEPTED",
        call: mockCall
      }],    
    }
  }
  beforeEach(() => {
    render(<ResponseConf {...localMockProps} />);
  });
  it('<ResponseConf /> renders', () => {
    const responseConf = screen.getByTestId('response-confirmation');
    expect(responseConf).toBeInTheDocument();
  });
  it("if err, helpful message renders", () => {
    const errMsg = screen.getByText(`There has been an error. Please contact GigFix immediately.`);
    expect(errMsg).toBeInTheDocument();
  });
  //it("confetti if correct params", () => {})
});

describe('<ResponseConf />', () => {
  let localMockProps: ResponseConfProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      status: "FINDINGDEP",
      eventCalls: [{
        ...mockContactEventCall,
        status: "ACCEPTED",
        call: mockCall
      }],    
    }
  }
  beforeEach(() => {
    render(<ResponseConf {...localMockProps} />);
  });
  it("if Finding Dep, it states so with helpful message", () => {
    const header = screen.getByText("Finding Dep");
    const helpText = screen.getByText("You are currently booked for this work, however we are trying to find you a dep.");
    expect(header).toBeInTheDocument();
    expect(helpText).toBeInTheDocument();
  });

});



describe('<ResponseConf />', () => {
  let localMockProps: ResponseConfProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      type: "AUTOBOOK",
      status: "DECLINED",
      eventCalls: [{
        ...mockContactEventCall,
        status: "DECLINED",
        call: mockCall
      }],    
    }
  }
  beforeEach(() => {
    render(<ResponseConf {...localMockProps} />);
  });
  it("if player released, it states so", () => {
    const header = screen.getByText("Released.");
    const helpText = screen.getByText("You declined the following work:");
    expect(header).toBeInTheDocument();
    expect(helpText).toBeInTheDocument();
  });

});



describe('<ResponseConf />', () => {
  let localMockProps: ResponseConfProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      status: "AUTOBOOKED",
      eventCalls: [{
        ...mockContactEventCall,
        status: "ACCEPTED",
        call: mockCall
      }],    
    }
  }
  beforeEach(() => {
    render(<ResponseConf {...localMockProps} />);
  });
    it("if player autobooked, it states so", () => {
      const header = screen.getByText("Auto Booked");
    const helpText = screen.getByText("You are booked for the following calls:");
    expect(header).toBeInTheDocument();
    expect(helpText).toBeInTheDocument();
    });
    it("lists calls player is booked for", () => {
      for (let i = 0; i < localMockProps.contactMessage.eventCalls.length; i ++) {
        if (localMockProps.contactMessage.eventCalls[i].status === "ACCEPTED") {
          const formattedDate = DateTime.fromJSDate(new Date(localMockProps.contactMessage.eventCalls[i].call.startTime)).toFormat(
            'HH:mm DD'
          )
          const eventCall = screen.getByText(formattedDate)
          expect(eventCall).toBeInTheDocument();
        }
      }
    });


});



describe('<ResponseConf />', () => {
  let localMockProps: ResponseConfProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      type: "BOOKING",
      status: "ACCEPTED",
      eventCalls: [{
        ...mockContactEventCall,
        status: "ACCEPTED",
        call: mockCall
      }],    
    }
  }
  beforeEach(() => {
    render(<ResponseConf {...localMockProps} />);
  });
    it("states if response received", () => {
      const header = screen.getByText("Response Received");
    expect(header).toBeInTheDocument();
    });

    it("lists calls player is booked for", () => {
      const acceptedText = screen.getByText("You are booked for the following calls:");
      expect(acceptedText).toBeInTheDocument();
      for (let i = 0; i < localMockProps.contactMessage.eventCalls.length; i ++) {
        if (localMockProps.contactMessage.eventCalls[i].status === "ACCEPTED") {
          const formattedDate = DateTime.fromJSDate(new Date(localMockProps.contactMessage.eventCalls[i].call.startTime)).toFormat(
            'HH:mm DD'
          )
          const eventCall = screen.getByText(formattedDate)
          expect(eventCall).toBeInTheDocument();
        }
      }
    });


    it("if player booked, there is btn to add to calendar which calls axios.post(args)", () => {
      const calendarBtn = screen.getByTestId("calendar-btn");
      expect(calendarBtn).toBeInTheDocument();
      expect(calendarBtn.textContent).toMatch(`Add to Calendar`);
      act(() => {
        fireEvent.click(calendarBtn);
      })
      expect(axios.post).toHaveBeenCalledWith("/fixing/response/ics", localMockProps.contactMessage);
    });

});



describe('<ResponseConf />', () => {
  let localMockProps: ResponseConfProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      status: "DECLINED",
      eventCalls: [{
        ...mockContactEventCall,
        status: "DECLINED",
        call: mockCall
      }],    
    }
  }
  beforeEach(() => {
    render(<ResponseConf {...localMockProps} />);
  });
  it("if declined, it states calls player declined", () => {
    const declinedText = screen.getByText("You declined the following work:");
    expect(declinedText).toBeInTheDocument();
    for (let i = 0; i < localMockProps.contactMessage.eventCalls.length; i ++) {
      if (localMockProps.contactMessage.eventCalls[i].status === "DECLINED") {
        const formattedDate = DateTime.fromJSDate(new Date(localMockProps.contactMessage.eventCalls[i].call.startTime)).toFormat(
          'HH:mm DD'
        )
        const eventCall = screen.getByText(formattedDate)
        expect(eventCall).toBeInTheDocument();
      }
    }
  });

});



describe('<ResponseConf />', () => {
  let localMockProps: ResponseConfProps = {
    ...mockProps,
    contactMessage: {
      ...mockProps.contactMessage,
      status: "AVAILABLE",
      type: "AVAILABILITY",
      eventCalls: [{
        ...mockContactEventCall,
        status: "AVAILABLE",
        call: mockCall
      }],    
    }
  }
  beforeEach(() => {
    render(<ResponseConf {...localMockProps} />);
  });
  it("states if response received", () => {
    const header = screen.getByText("Response Received");
  expect(header).toBeInTheDocument();
  });

  it("lists calls player is available for", () => {
    const availableText = screen.getByText("You are available for the following calls:");
    expect(availableText).toBeInTheDocument();
    for (let i = 0; i < localMockProps.contactMessage.eventCalls.length; i ++) {
      if (localMockProps.contactMessage.eventCalls[i].status === "AVAILABLE") {
        const formattedDate = DateTime.fromJSDate(new Date(localMockProps.contactMessage.eventCalls[i].call.startTime)).toFormat(
          'HH:mm DD'
        )
        const eventCall = screen.getByText(formattedDate)
        expect(eventCall).toBeInTheDocument();
      }
    }
  });
});

