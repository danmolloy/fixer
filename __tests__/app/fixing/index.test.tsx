import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import FixingIndex, { FixingIndexProps } from "../../../app/fixing";
import { mockCall } from "../../../__mocks__/models/call";
import { mockSection } from "../../../__mocks__/models/ensembleSection";
import { mockEventSection } from "../../../__mocks__/models/eventSection";
import { mockContactMessage } from "../../../__mocks__/models/contactMessage";
import { mockEnsembleContact } from "../../../__mocks__/models/ensembleContact";


describe("<FixingIndex />", () => {
  const mockProps: FixingIndexProps = {
    eventId: 1,
    ensembleSections: [mockSection],
    eventSections: [{
      ...mockEventSection,
      contacts: [{
        ...mockContactMessage,
        contact: mockEnsembleContact,
        calls: [mockCall]
      }],
      ensembleSection: {
        ...mockSection,
        contacts: [mockEnsembleContact]
      }
    }],
    eventCalls: [mockCall]
  }
  beforeEach(() => {
    render(<FixingIndex {...mockProps} />);
  })
  it("<FixingIndex /> renders", () => {
    const fixingIndex = screen.getByTestId("fixing-index");
    expect(fixingIndex).toBeInTheDocument();
  })
  it("create btn is in the document and renders <CreateEventSection /> on click", async () => {
    const createBtn = screen.getByText("Create section");
    expect(createBtn).toBeInTheDocument();
    expect(createBtn).toHaveRole("button");
    act(() => {
      fireEvent.click(createBtn);
    })
    const createForm = screen.getByTestId("create-event-section")
    expect(createForm).toBeInTheDocument()
  })
  it("all event sections are in the document", () => {
    for (let i = 0; i < mockProps.eventSections.length; i ++) {
      const eventSection = screen.getByTestId(`${mockProps.eventSections[i].id}-event-section`)
      expect(eventSection).toBeInTheDocument()
    }
  })
})

describe("<FixingIndex />", () => {
  const mockProps: FixingIndexProps = {
    eventId: 1,
    ensembleSections: [mockSection],
    eventSections: [],
    eventCalls: [mockCall]
  }
  beforeEach(() => {
    render(<FixingIndex {...mockProps} />);
  })
  it("helpful text if !eventSections & createBtn hasn't been clicked", () => {
    const fixingIndex = screen.getByTestId("fixing-index");
    expect(fixingIndex).toHaveTextContent("No event sections.")
    expect(fixingIndex).toHaveTextContent("Click Create section to get started.")
    const createBtn = screen.getByText("Create section");
    act(() => {
      fireEvent.click(createBtn);
    })
    expect(fixingIndex).not.toHaveTextContent("No event sections.")
    expect(fixingIndex).not.toHaveTextContent("Click Create section to get started.")

  })
})