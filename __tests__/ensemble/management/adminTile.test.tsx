import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import AdminTile, { AdminTileProps } from "../../../app/ensembles/admin/adminTile"
import { mockAdminWithUser } from "../../../__mocks__/models/ensembleAdmin"

const mockProps: AdminTileProps = {
  adminUser: mockAdminWithUser
}

describe("<AdminTile />", () => {
  beforeEach(() => {
    render(<AdminTile {...mockProps} />)
  })
  it("admin-tile is in the document", () => {
    const adminTile = screen.getByTestId(`${mockProps.adminUser.userId}-admin-tile`)
    expect(adminTile).toBeInTheDocument()
  })
  it("user name is in the document", () => {
    const userName = screen.getByText(`${mockProps.adminUser.user.firstName} ${mockProps.adminUser.user.lastName}`)
    expect(userName).toBeInTheDocument()
  })
  it("admin position is in the document", () => {
    const positionTitle = screen.getByText(mockProps.adminUser.positionTitle)
    expect(positionTitle).toBeInTheDocument()
  })
  it("contact button is in the document", () => {
    const contactBtn = screen.getByText("Contact")
    expect(contactBtn).toBeInTheDocument()
  })
})