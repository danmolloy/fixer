import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import LoginBtn from "../../components/index/loginBtn";
import React from "react";

const mockSession = Math.random() < .5 ? {} : undefined

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {
        data: mockSession,
        status: 'authenticated'
      }  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const mockProps = {}

describe("LoginBtn", () => {
  beforeEach(() => {
    render(<LoginBtn />)
  })
  it("Renders login/logout conditionally if session", () => {
    if(mockSession === undefined) {
      const loginBtn = screen.getByTestId("login-btn")
      expect(loginBtn).toBeInTheDocument()
    } else {
      const logoutBtn = screen.getByTestId("logout-btn")
      expect(logoutBtn).toBeInTheDocument()
    }
  })
})