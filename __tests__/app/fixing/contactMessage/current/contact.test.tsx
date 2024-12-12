import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockCall } from "../../../../../__mocks__/models/call"
import { mockContactMessage } from "../../../../../__mocks__/models/contactMessage";
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact";
import CurrentContactRow, { CurrentContactRowProps } from "../../../../../app/fixing/contactMessage/current/contact";

const randInd = Math.ceil(Math.random() * 6)

global.alert = jest.fn();

describe("<CurrentContactRow />", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      calls: [mockCall],
      contact: {
        ...mockEnsembleContact,
      },
      playerMessage: "mock player message"
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <CurrentContactRow {...mockProps} />
        </tbody>
      </table>
   )
  })
  it("<CurrentContactRow /> renders", () => {
    const contactRow = screen.getByTestId("contact-row");
    expect(contactRow).toBeInTheDocument();
  })
  it("contact full name is in the document", () => {
    const fullName = screen.getByText(`${mockProps.contact.contact.firstName} ${mockProps.contact.contact.lastName}`);
    expect(fullName).toBeInTheDocument();
  })
  it("contact position is in the document", () => {
    const position = screen.getByText(mockProps.contact.position);
    expect(position).toBeInTheDocument();
  })
  it("status is in the document", () => {
    const status = screen.getByText(mockProps.contact.status);
    expect(status).toBeInTheDocument();
  })
  it("menu button is in the document and shows menu on click", () => {
    const menuBtn = screen.getByTestId("menu-btn");
    expect(menuBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(menuBtn);
    });
    const contactOptions = screen.getByTestId("contact-options");
    expect(contactOptions).toBeInTheDocument();
  })
  it("if playerMessage, btn is in the document and shows message on click", () => {
    const playerMessageBtn = screen.getByTestId('player-msg-btn');
    expect(playerMessageBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(playerMessageBtn);
    });
    expect(global.alert).toHaveBeenCalledWith(
      `Your message to ${mockProps.contact.contact.firstName}: \n\n${mockProps.contact.playerMessage}`
    );
  })
})

describe("<CurrentContactRow /> BOOKING", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      type: "BOOKING",
      status: "ACCEPTED",
      calls: [mockCall],
      contact: {
        ...mockEnsembleContact,
      }
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(
      <table>
        <tbody>
        <CurrentContactRow {...mockProps} />
        </tbody>
      </table>
)
  })
  it("if BOOKING type, indexNum is in the document", () => {
    const indexNum = screen.getByText(mockProps.contact.indexNumber);
    expect(indexNum).toBeInTheDocument();
  })
  it("if BOOKING, all booked eventCalls have a tick with 'Booked' text content", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
      expect(callCell).toBeInTheDocument();
      expect(callCell.textContent).toMatch("Booked")
    }
  })
})

  describe("<CurrentContactRow /> BOOKING", () => {
    const mockProps: CurrentContactRowProps = { 
      eventCalls: [mockCall],
      contact: {
        ...mockContactMessage,
        type: "BOOKING",
        calls: [],
        contact: {
          ...mockEnsembleContact,
        }
      },
      index: randInd,
      numContacts: Math.floor(Math.random() * 2) + randInd
    }
    beforeEach(() => {
      render(
        <table>
          <tbody>
          <CurrentContactRow {...mockProps} />
          </tbody>
        </table>)
    })
    it("if BOOKING, all non-booked eventCalls have an X", () => {
      for (let i = 0; i < mockProps.eventCalls.length; i ++) {
        const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
        expect(callCell).toBeInTheDocument();
        expect(callCell.textContent).toMatch("Not Booked")
      }
    })    
  })

    describe("<CurrentContactRow /> BOOKING", () => {
      const mockProps: CurrentContactRowProps = { 
        eventCalls: [mockCall],
        contact: {
          ...mockContactMessage,
          type: "BOOKING",
          status: "AWAITINGREPLY",
          calls: [mockCall],
          contact: {
            ...mockEnsembleContact,
          }
        },
        index: randInd,
        numContacts: Math.floor(Math.random() * 2) + randInd
      }
      beforeEach(() => {
        render(
          <table>
            <tbody>
            <CurrentContactRow {...mockProps} />
            </tbody>
          </table>
        )
      })

      it("if AWAITINGREPLY in BOOKING, all offered calls have a •", () => {
        for (let i = 0; i < mockProps.eventCalls.length; i ++) {
          const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
          expect(callCell).toBeInTheDocument();
          expect(callCell.textContent).toMatch("Offered")
        }
      })
      })

describe("<CurrentContactRow /> AUTOBOOK", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      type: "AUTOBOOK",
      calls: [],
      contact: {
        ...mockEnsembleContact,
      }
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(
    <table>
      <tbody>
        <CurrentContactRow {...mockProps} />
      </tbody>
    </table>
    )
  })
  it("if AUTOBOOK type, indexNum is in the document", () => {
    const indexNum = screen.getByText(mockProps.contact.indexNumber);
    expect(indexNum).toBeInTheDocument();
  })
  it("if AUTOBOOK, all non-booked eventCalls have an X", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
      expect(callCell).toBeInTheDocument();
      expect(callCell.textContent).toMatch("Not Booked");
    }
  })
})

describe("<CurrentContactRow /> AUTOBOOK", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      type: "AUTOBOOK",
      status: "AUTOBOOKED",
      calls: [],
      contact: {
        ...mockEnsembleContact,
      }
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(
    <table>
      <tbody>
      <CurrentContactRow {...mockProps} />
      </tbody>
    </table>
    )
  })
  it("if AUTOBOOK, all booked eventCalls have a tick", () => {
     for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
      expect(callCell).toBeInTheDocument();
      expect(callCell.textContent).toMatch("Not Booked");
    }
  })
})

describe("<CurrentContactRow /> AVAILABILITY", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      type: "AVAILABILITY",
      calls: [mockCall],
      availableFor: [mockCall.id],
      contact: {
        ...mockEnsembleContact,
      }
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(<CurrentContactRow {...mockProps} />)
  })
  it("if AVAILABILITY type, indexNum is not in the document", () => {
    const contactRow = screen.getByTestId("contact-row");
    expect(contactRow.textContent).not.toMatch(String(mockProps.contact.indexNumber));
  })
  it("if AVAILABILITY type, all availableFor eventCalls have text content 'Available'", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
      expect(callCell).toHaveTextContent("Available");
    }
  })
})

describe("<CurrentContactRow /> AVAILABILITY", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      type: "AVAILABILITY",
      status: "MIXED",
      availableFor: [],
      calls: [mockCall],
      contact: {
        ...mockEnsembleContact,
      }
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(
      <table>
        <tbody>
        <CurrentContactRow {...mockProps} />
        </tbody>
      </table>
    )
  })
  
  it("if AVAILABILITY type, all not availableFor eventCalls have an X", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
      expect(callCell).toHaveTextContent("Declined");
    }
  })
})

describe("<CurrentContactRow /> AVAILABILITY", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      type: "AVAILABILITY",
      status: "AWAITINGREPLY",
      calls: [mockCall],
      availableFor: [],
      contact: {
        ...mockEnsembleContact,
      }
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(<CurrentContactRow {...mockProps} />)
  })
  it("if AWAITINGREPLY in AVAILABILITY, all offered calls have a •", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
      expect(callCell).toHaveTextContent("Awaiting Reply");
    }
  })
})

describe("<CurrentContactRow /> AVAILABILITY", () => {
  const mockProps: CurrentContactRowProps = { 
    eventCalls: [mockCall],
    contact: {
      ...mockContactMessage,
      type: "AVAILABILITY",
      status: "NOTCONTACTED",
      availableFor: [],
      calls: [],
      contact: {
        ...mockEnsembleContact,
      }
    },
    index: randInd,
    numContacts: Math.floor(Math.random() * 2) + randInd
  }
  beforeEach(() => {
    render(
      <table>
        <tbody>
        <CurrentContactRow {...mockProps} />
        </tbody>
      </table>
    )
  })
  it("if AVAILABILITY, all non-offered calls have text content 'Not Checked'", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCell = screen.getByTestId(`call-${mockProps.eventCalls[i].id}`);
      expect(callCell).toHaveTextContent("Not Checked");
    }
  })
})