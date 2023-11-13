import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DirectoryMusicians, { DirectoryMusiciansProps } from "../../../../components/fixing/instrument/edit/directoryMusicians"
import { mockUser } from "../../../../__mocks__/models/user"
import { Formik } from "formik"
import { mockCall } from "../../../../__mocks__/models/call"
import { instrumentArr } from "../../../../components/fixing/fixing"

const mockProps: DirectoryMusiciansProps = {
  musicians: [mockUser],
  eventMusicianIds: [mockUser.id],
  allEventCalls: [mockCall],
  instrumentName: instrumentArr[Math.floor(Math.random() * instrumentArr.length)]
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
    const directory = screen.getByTestId(`${mockProps.instrumentName}-directory-musicians`)
    expect(directory).toBeInTheDocument()
  })
  it("title is in the document", () => {
    const title = screen.getByText(`Select from ${mockProps.instrumentName} Directory`)
    expect(title).toBeInTheDocument()
  })
  it("all expected musicians are in the document", () => {
    for (let i = 0; i < mockProps.musicians.length; i++) {
      let musicianName = screen.getByText(`${mockProps.musicians[i].firstName} ${mockProps.musicians[i].lastName}`)
      expect(musicianName).toBeInTheDocument()
    }
  })
})