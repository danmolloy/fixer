import "@testing-library/jest-dom"
import FixingMenu, { FixingMenuProps } from "../../../app/fixing/menu";
import { screen, render, fireEvent, act } from "@testing-library/react"

const mockProps: FixingMenuProps = {
  pauseFixing: jest.fn(),
  fixingActive: true,
  createSection: jest.fn(),
  eventID: "mockID",
}

global.focus = jest.fn();

describe("<FixingMenu />", () => {
  beforeEach(() => {
    render(<FixingMenu {...mockProps} />)
  })
  it("renders without crashing", () => {
    const fixingMenu = screen.getByTestId("fixing-menu");
    expect(fixingMenu).toBeInTheDocument();
  });
  it("Options btn is labeled and shows menu on click", () => {
    const optionsBtn = screen.getByTestId("options-btn");
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const menuOptions = screen.getByTestId("fixing-menu-options")
    expect(menuOptions).toBeInTheDocument();
  });
  it("create section btn is labeled and calls createSection() on click", () => {
    const optionsBtn = screen.getByTestId("options-btn");
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const createBtn = screen.getByText("Create Section");
    expect(createBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(createBtn)
    })
    expect(mockProps.createSection).toHaveBeenCalled();
  });
  it("pause fixing is labeled and calls pauseFixing on click", () => {
    const optionsBtn = screen.getByTestId("options-btn");
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const pauseBtn = screen.getByText("Pause Fixing");
    expect(pauseBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(pauseBtn)
    })
    expect(mockProps.pauseFixing).toHaveBeenCalled();
  });
  it("Sent Messages link is in the document with expected href", () => {
    const optionsBtn = screen.getByTestId("options-btn");
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const sentMsgs = screen.getByText("Sent Messages");
    expect(sentMsgs).toBeInTheDocument();
    expect(sentMsgs).toHaveAttribute("href", `/event/${mockProps.eventID}/messages`)
  })
})

describe("<FixingMenu />", () => {
  let localMockProps: FixingMenuProps = {
    ...mockProps,
    fixingActive: false
  }
  beforeEach(() => {
    render(<FixingMenu {...localMockProps} />)
  })
  it("pause fixing is disabled if !fixingActive", () => {
    const optionsBtn = screen.getByTestId("options-btn");
    expect(optionsBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const pauseBtn = screen.getByText("Pause Fixing");
    expect(pauseBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(pauseBtn)
    })
    expect(mockProps.pauseFixing).not.toHaveBeenCalled();
  })
})
