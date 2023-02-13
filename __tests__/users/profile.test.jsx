import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import UserProfile from "../../components/users/profile"

/* 
!!!! pages/profile.js is currently rendering dummy data only.
*/

const dummyData = {
  "id":"cl5jlqw1e0057t6u07993b5w1",
  "name":"Roy Dereks",
  "email":"Daphne38@gmail.com",
  "emailVerified":null,
  "image":null,
  "instrument":"Trombone",
  "profileInfo":null,
  "isFixer":null,
}

describe("Profile Page", () => {
  beforeEach(() => {
    render(<UserProfile user={dummyData}/>)
  })
  //it("Renders dynamic data", () => {})
  //it("User's relevant experience displayed", () => {})
  //it("Has a 'back' button", () => {})
  //it("Contact button does something onClick", () => {})

  it("Profile component renders", () => {
    const profileComponent = screen.getByTestId("user-profile-div")
    expect(profileComponent).toBeInTheDocument()
  })
  it("Profile has a header element", () => {
    const profileHeader = screen.getByTestId("profile-header")
    expect(profileHeader).toBeInTheDocument()
  })
  it("Displays player's name in Header", () => {
    const profileHeader = screen.getByTestId("profile-header")
    expect(profileHeader).toBeInTheDocument()
    expect(profileHeader.textContent).toMatch(dummyData.name)
  })
  it("Displays player's instrument in Header", () => {
    const profileHeader = screen.getByTestId("profile-header")
    expect(profileHeader).toBeInTheDocument()
    expect(profileHeader.textContent).toMatch(dummyData.instrument)
  })
  it("Displays player picture", () => {
    const profilePic = screen.getByTitle(`Profile picture placeholder`)
    expect(profilePic).toBeInTheDocument()
  })
  it("Has text area", () => {
    const textArea = screen.getByTestId("profile-text")
    expect(textArea).toBeInTheDocument()
  })
  it("Has contact button", () => {
    const contactBtn = screen.getByTestId("profile-contact-btn")
    expect(contactBtn).toBeInTheDocument()
  })
})