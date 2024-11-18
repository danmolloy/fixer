import "@testing-library/jest-dom"
import OrchestraList, {OrchestraListProps, pdfOptions} from "../../../../app/event/[id]/orchestraList"
import { fireEvent, render, screen } from "@testing-library/react"
import { mockEventSection } from "../../../../__mocks__/models/eventSection"
import { mockContactMessage } from "../../../../__mocks__/models/contactMessage"
import { mockEnsembleContact } from "../../../../__mocks__/models/ensembleContact"
import { mockSection } from "../../../../__mocks__/models/ensembleSection"
import html2pdf from 'html2pdf.js';
import React, { act } from "react"

HTMLCanvasElement.prototype.getContext = jest.fn();
jest.mock("html2pdf.js", () => {
  return jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    save: jest.fn(),
  }));
});


describe("<OrchestraList />", () => {
  const mockProps: OrchestraListProps = {
    sections: [{
      ...mockEventSection,
      numToBook: 10,
      contacts: [{
        ...mockContactMessage,
        accepted: true,
        contact: mockEnsembleContact
      }],
      ensembleSection: mockSection
    }]
  }
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />)
  })
  it("<OrchestraList /> renders", () => {
    const orchestraList = screen.getByTestId("orchestra-list");
    expect(orchestraList).toBeInTheDocument();
  })
  it("'Orchestra List' heading is in the document", () => {
    const heading = screen.getByText("Orchestra List");
    expect(heading).toBeInTheDocument();
  })
  it("booked musicians names are in respective sections, with TBC for all empty seats", () => {
    for (let i = 0; i < mockProps.sections.length; i ++) {
      const section = screen.getByTestId(`${mockProps.sections[i].id}-section`);
      expect(section).toBeInTheDocument();
      expect(section.textContent).toMatch(mockProps.sections[i].ensembleSection.name);
      const acceptedContacts = mockProps.sections[i].contacts.filter(c => c.accepted === true);
      for (let j = 0; j < acceptedContacts.length; j ++) {
        const contactName = `${mockProps.sections[i].contacts[j].contact.firstName} ${mockProps.sections[i].contacts[j].contact.lastName}`;
        expect(section.textContent).toMatch(contactName);
      }
      const numEmptySeats = mockProps.sections[i].numToBook - mockProps.sections[i].contacts.filter(c => c.accepted === true).length;
      const emptySeats = screen.getAllByTestId(`${mockProps.sections[i].id}-tbc`)
      expect(emptySeats.length).toBe(numEmptySeats);
    }
  })
  it("print list btn is in the document and calls html2pdf on click", () => {
    const mockOrchListElement = document.createElement("div");
    jest.spyOn(React, "useRef").mockReturnValue({ current: mockOrchListElement });

    const printBtn = screen.getByText("Print List");
    expect(printBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(printBtn);
    });
    expect(html2pdf).toHaveBeenCalled();
    expect(html2pdf().from).toHaveBeenCalledWith(mockOrchListElement);
    expect(html2pdf().set).toHaveBeenCalledWith(pdfOptions);
    expect(html2pdf().save).toHaveBeenCalled();

  })
})

describe("<OrchestraList />", () => {
  const mockProps: OrchestraListProps = {
    sections: [{
      ...mockEventSection,
      numToBook: 0,
      contacts: [],
      ensembleSection: mockSection
    }]
  }
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />)
  })
  
  it("if !contacts, helpful msg is displayed", () => {
    const helpMsg = screen.getByTestId("help-msg");
    expect(helpMsg).toBeInTheDocument();
    expect(helpMsg.textContent).toMatch("No calls made.");
    expect(helpMsg.textContent).toMatch("To get started, fix sections in the Fixing tab.")
  })
 })