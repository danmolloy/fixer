import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react";
import CreateEventSection, { CreateEventSectionProps } from "../../../../app/fixing/eventSection/form";
import { mockSection } from "../../../../__mocks__/models/ensembleSection";
import { mockEventSection } from "../../../../__mocks__/models/eventSection";
import axios from "../../../../__mocks__/axios";

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });


describe("<CreateEventSection />", () => {
  const mockProps: CreateEventSectionProps = {
    eventId: 1,
    ensembleSections: [mockSection],
    setCreateSection: jest.fn(),
    ensembleSectionId: undefined,
    bookingStatus: "Availability",
    numToBook: 1,
    eventSectionId: undefined,
    eventSections: [{
      ...mockEventSection,
      ensembleSection: mockSection
    }]
  }
  beforeEach(() => {
    render(<CreateEventSection {...mockProps} />)
  })
  it("<CreateEventSection /> renders", () => {
    const createEventSection = screen.getByTestId("create-event-section")
    expect(createEventSection).toBeInTheDocument()
  })
  
  it("section select is in the document with label, name, blank option & all options with value and labels", () => {
    const sectionSelect = screen.getByTestId("section-select")
    expect(sectionSelect).toBeInTheDocument()
    expect(sectionSelect).toHaveAttribute("name", "ensembleSectionId")
    for (let i = 0; i < mockProps.ensembleSections.length; i ++) {
      expect(sectionSelect.textContent).toMatch(mockProps.ensembleSections[i].name)
      const sectionOption = screen.getByText(mockProps.ensembleSections[i].name)
      expect(sectionOption).toBeInTheDocument()
      expect(sectionOption).toHaveRole("option")
      expect(sectionOption).toHaveValue(mockProps.ensembleSections[i].id)
    }
  })
  it("num to book input is in the document with label, type and name attrs", () => {
    const numToBook = screen.getByLabelText("Num to Book")
    expect(numToBook).toBeInTheDocument()
    expect(numToBook).toHaveValue(mockProps.numToBook)
    expect(numToBook).toHaveAttribute("type", "number")
    expect(numToBook).toHaveAttribute("name", "numToBook")
  })
  it("cancel btn is in the document and calls setCreateSection() on click", () => {
    const cancelBtn = screen.getByText("Cancel")
    expect(cancelBtn).toBeInTheDocument()
    expect(cancelBtn).toHaveRole("button")
    act(() => {
      fireEvent.click(cancelBtn)
    })
    expect(mockProps.setCreateSection).toHaveBeenCalledWith(false)
  })
  it("submit btn is in the document with label, type & role", () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveRole("button")
    expect(submitBtn).toHaveAttribute("type", "submit")
  })
  it("expected err messages render on submit btn click", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async () => {
      fireEvent.click(submitBtn)
    })
    expect(axios.post).not.toHaveBeenCalled()
    const createEventSection = screen.getByTestId("create-event-section")
    expect(createEventSection.textContent).toMatch('ensemble section id required')
  })
  it("submit btn creates section calls axios.post(), useRouter and setCreateSection(false) on click", async () => {
    const sectionSelect = screen.getByTestId("section-select")
    await act(async () => {
      fireEvent.change(sectionSelect, {target: {value: mockProps.ensembleSections[0].id}})
    })
    const submitBtn = screen.getByText("Submit")
    await act(async () => {
      fireEvent.click(submitBtn)
    })
    expect(axios.post).toHaveBeenCalledWith("/fixing/eventSection/api/create",
      {
        bookingStatus: mockProps.bookingStatus,
        ensembleSectionId: mockProps.ensembleSections[0].id,
        eventId: mockProps.eventId,
        numToBook: mockProps.numToBook
      }
    )
  })
})

describe("<CreateEventSection />", () => {
  const mockProps: CreateEventSectionProps = {
    eventId: 1,
    ensembleSections: [mockSection],
    setCreateSection: jest.fn(),
    ensembleSectionId: mockSection.id, 
    bookingStatus: "Booking", 
    numToBook: Math.ceil(Math.random() * 10),
    eventSectionId: mockEventSection.id,
    eventSections: [{
      ...mockEventSection,
      ensembleSection: mockSection
    }]
  }
  beforeEach(() => {
    render(<CreateEventSection {...mockProps} />)
  })
  it("<CreateEventSection /> renders", () => {
    const createEventSection = screen.getByTestId("create-event-section")
    expect(createEventSection).toBeInTheDocument()
  })
  it("section name header is in the document", () => {
    const sectionName = screen.getByText(mockProps.ensembleSections.find(i => i.id === mockProps.ensembleSectionId)!.name)
    expect(sectionName).toBeInTheDocument()
    expect(sectionName).toHaveRole("heading")
  })
  it("num to book has expected initial val", () => {
    const numToBook = screen.getByLabelText("Num to Book")
    expect(numToBook).toBeInTheDocument()
    expect(numToBook).toHaveValue(mockProps.numToBook)
  })
  it("submit btn updates section calls axios.post(), useRouter and setCreateSection(false) on click", async () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(submitBtn)
    })
    expect(axios.post).toHaveBeenCalledWith("/fixing/eventSection/api/update", {
      bookingStatus: mockProps.bookingStatus,
      ensembleSectionId: mockProps.ensembleSectionId,
      eventId: mockProps.eventId,
      eventSectionId: mockProps.eventSectionId,
      numToBook: mockProps.numToBook
    })
  })
})