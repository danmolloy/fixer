import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ProfileInfo from "../../../components/users/settings/profileInfo"
import { Formik } from "formik"

describe("<ProfileInfo />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {props => (
          <ProfileInfo />
          )}
      </Formik>
    )
  })
  
  it("profile-information is in the document", () => {
    const profileInfo = screen.getByTestId("profile-info")
    expect(profileInfo).toBeInTheDocument()
  })
  it("profile blurb input is in the document", () => {
    const profileBlurb = screen.getByLabelText("Profile Blurb")
    expect(profileBlurb).toBeInTheDocument()
    expect(profileBlurb).toHaveAttribute("name", "profileBlurb")
  })
/*   it("image upload is in the document", () => {
    const imgInput = screen.getByLabelText("Profile Image")
    expect(imgInput).toBeInTheDocument()
    expect(imgInput).toHaveAttribute("type", "image")
    expect(imgInput).toHaveAttribute("name", "image")
  }) */
  it("current-img preview is in the document", () => {
    const imgPreview = screen.getByTitle("Current Profile Image")
    expect(imgPreview).toBeInTheDocument()
  })
})