import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Layout, { LayoutProps } from "../../components/layout/layout"
import React from "react"

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    userData: {
      playerCalls: []
    }
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const mockProps: LayoutProps = {
  children: <div data-testid="mock-children"></div>,
  pageTitle: "Mock Title"
}

describe("Layout component", () => {
  beforeEach(() => {
    render(<Layout {...mockProps} />)
  })
  it("Renders", () => {
    const layoutDiv = screen.getByTestId("layout-div")
    expect(layoutDiv).toBeInTheDocument()
  })
  it("Header is in the document", () => {
    const header = screen.getByTestId("layout-header")
    expect(header).toBeInTheDocument()
  })
  it("Page title is in the document", () => {
    const layoutDiv = screen.getByTestId("layout-div")
    expect(layoutDiv.textContent).toMatch(mockProps.pageTitle)
  })
  it("Children is in the document", () => {
    const mockChildren = screen.getByTestId("mock-children")
    expect(mockChildren).toBeInTheDocument()
  })
})