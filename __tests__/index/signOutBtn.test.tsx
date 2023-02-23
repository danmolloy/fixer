import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import SignOutBtn from "../../components/index/signOutBtn";
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


describe("SignOutBtn component", () => {
  beforeEach(() => {
    render(<SignOutBtn />)
  })
  it("Renders", () => {
    const signOutBtn = screen.getByTestId("signout-btn")
    expect(signOutBtn).toBeInTheDocument()
  })
})