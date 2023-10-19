import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DirectoryMusicians, { DirectoryMusiciansProps } from "../../../../components/fixing/instrument/edit/directoryMusicians"
import { mockUser } from "../../../../__mocks__/models/user"
import { Formik } from "formik"

const mockProps: DirectoryMusiciansProps = {
  musicians: [mockUser]
}

describe("<DirectoryMusicians />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <DirectoryMusicians {...mockProps} />
        )}
      </Formik>
    )
  })
  it("directory-musicians is in the document", () => {
    const directory = screen.getByTestId("directory-musicians")
    expect(directory).toBeInTheDocument()
  })
  it("title is in the document", () => {
    const title = screen.getByText("Directory")
    expect(title).toBeInTheDocument()
  })
  it("all musicians are in the document", () => {
    for (let i = 0; i < mockProps.musicians.length; i++) {
      let musicianName = screen.getByText(mockProps.musicians[i].name)
      expect(musicianName).toBeInTheDocument()
    }
  })
})