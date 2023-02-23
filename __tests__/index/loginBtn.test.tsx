import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import LoginBtn from "../../components/index/loginBtn";
import React from "react";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {}
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const mockProps = {}

describe("LoginBtn", () => {
  beforeEach(() => {
    render(<LoginBtn />)
  })
  it("Renders", () => {
    const loginBtn = screen.getByTestId("login-btn")
    expect(loginBtn).toBeInTheDocument()
  })
})