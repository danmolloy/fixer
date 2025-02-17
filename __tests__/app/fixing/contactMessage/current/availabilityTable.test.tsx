import "@testing-library/jest-dom"
import { render, screen, fireEvent, act } from "@testing-library/react"
import AvailabilityTable, { CurrentContactMessagesProps } from "../../../../../app/fixing/contactMessage/current/availabilityTable"
import { mockCall } from "../../../../../__mocks__/models/call"
import { mockContactMessage } from "../../../../../__mocks__/models/contactMessage"
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact"
import { mockContactEventCall } from "../../../../../__mocks__/models/ContactEventCall"
import axios from "../../../../../__mocks__/axios"

const mockSetSelectedContacts = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial: any) => [initial, mockSetSelectedContacts]
}))

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

global.confirm = jest.fn(() => true)

const mockProps: CurrentContactMessagesProps = {
  eventCalls: [mockCall],
  contacts: [{
    ...mockContactMessage,
    contact: mockEnsembleContact,
    type: "AVAILABILITY",
    eventCalls: [{
      ...mockContactEventCall,
      call: mockCall
    }]
  }]
}

describe("<AvailabilityTable />", () => {
  beforeEach(() => {
    render(<AvailabilityTable {...mockProps} />)
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("renders without crashing", () => {
    const tableDiv = screen.getByTestId("availability-table-div");
    expect(tableDiv).toBeInTheDocument();
  })
  it("Select All & Deselect All btns are in the document & calls setSelectedContacts()", () => {
    const selectAll = screen.getByText("Select All");
    expect(selectAll).toBeInTheDocument();
    act(() => {
      fireEvent.click(selectAll)
    })
    expect(mockSetSelectedContacts).toHaveBeenCalledWith(mockProps.contacts.filter(j => j.type ==="AVAILABILITY").map(j => j.id));

    const deselectAll = screen.getByText("Deselect All");
    expect(deselectAll).toBeInTheDocument();
    act(() => {
      fireEvent.click(deselectAll)
    })
    expect(mockSetSelectedContacts).toHaveBeenCalled();
    
  });
  //it("Cancel Check btn is in the document", () => {});
  it("availability-table is in the document", () => {
    const availTable = screen.getByTestId("availability-table");
    expect(availTable).toBeInTheDocument();
  });
  it("empty <th /> is in the document", () => {
    expect(screen.getByTestId("empty-th")).toBeInTheDocument();
  });
  it("Name th is in the document", () => {
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
  it("all event calls have <th /> with formatted date", () => {});
  it("Status <th /> is in the document", () => {
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
  it("Options <th/> is in the document", () => {
    expect(screen.getByTestId("options-th")).toBeInTheDocument();
  });
  it("Only AVAILABILITY contacts are in the document", () => {
    const availTable = screen.getByTestId("availability-table");
    mockProps.contacts.forEach(i => {
      const name = `${i.contact.firstName} ${i.contact.lastName}`
      if (i.type !== "AVAILABILITY") {
        expect(availTable.textContent).not.toMatch(name);
      } else {
        expect(availTable.textContent).toMatch(name);
      }
    })
  });
 })