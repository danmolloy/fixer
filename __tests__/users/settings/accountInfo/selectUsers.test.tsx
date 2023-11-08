import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import SelectUsers from "../../../../components/users/settings/accountInfo/selectUsers"

describe("<SelectUsers />", () => {
  beforeEach(() => {
    render(<SelectUsers />)
  })
  it("select-users is in the document", () => {})
  it("user-list is in the document with tiles for all users", () => {})
  it("tile contains pic, name and instrument, and adds user to list on click", () => {})
  it("selected-users-panel is in the document with list of selected users", () => {})
  it("each selected user has a remove btn which calls remove onClick", () => {})
  it("Done buttton is in the document and closes window on click", () => {})
})