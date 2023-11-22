import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Create from "../../../pages/event/create"

describe("<Create />", () => {
  it("if session, <CreateEventForm /> is in the document", () => {})
  it("if !sesion, <SignIn /> is in the document", () => {})
  it("if isLoading, <LoadingLayout /> is in the document", () => {})
  it("handleSubmit() posts to /api/event/create with expected arg", () => {})

})