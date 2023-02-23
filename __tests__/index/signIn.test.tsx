import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import React from "react";
import SignIn from "../../components/index/signIn";

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


describe("SignIn component", () => {
  beforeEach(() => {
    render(<SignIn />)
  })
  it("Renders", () => {
    const signInDiv = screen.getByTestId("signin-div")
    expect(signInDiv).toBeInTheDocument()
  })
})