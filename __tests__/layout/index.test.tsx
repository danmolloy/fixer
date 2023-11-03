import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import LayoutIndex, { LayoutIndexProps } from "../../components/layout"


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

const mockProps: LayoutIndexProps = {
  children: <div data-testid="child-div"></div>
}

describe("<LayoutIndex />", () => {
  beforeEach(() => {
    render(<LayoutIndex {...mockProps} />)
  })
  it("if session, <SessionLayout /> is in the document", () => {})
})



describe("<LayoutIndex />", () => {
  beforeEach(() => {
    render(<LayoutIndex {...mockProps} />)
  })
  it("if !session (or else), <ExternalLayout /> is in the document", () => {})
})