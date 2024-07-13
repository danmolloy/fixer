import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AdminTile, { AdminTileProps } from "../../../../app/ensembles/admin/adminTile";
import { mockAdminWithUser } from "../../../../__mocks__/models/ensembleAdmin";
import { useRouter } from "next/navigation";
import axios from "../../../../__mocks__/axios";

global.confirm = jest.fn(() => true)
let confirm = global.confirm;


jest.mock("next/navigation")

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: AdminTileProps = {
  admin: mockAdminWithUser
}

describe("<AdminTile />", () => {
  beforeEach(() => {
    render(<AdminTile {...mockProps} />)
  })
  it("<AdminTile /> renders", () => {
    const adminTile = screen.getByTestId(`${mockProps.admin.id}-admin-tile`)
    expect(adminTile).toBeInTheDocument()
  })
  it("edit link is in the document with expected href", () => {
    const editLink = screen.getByText("Edit")
    expect(editLink).toBeInTheDocument()
    expect(editLink).toHaveAttribute("href", `/ensembles/admin/update/${mockProps.admin.id}`)
  })
  it("delete btn calls global.confirm, axios.post() and useRouter", () => {
    const deleteBtn = screen.getByText("Delete")
    expect(deleteBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(deleteBtn)
    })
    expect(confirm).toHaveBeenCalled()
    expect(axios.post).toHaveBeenCalledWith("/ensembles/admin/api/delete", {"adminId": mockProps.admin.id})
    expect(useRouter).toHaveBeenCalled()
  })
  it("user name is in the document", () => {
    const userName = screen.getByText(`${mockProps.admin.user.firstName} ${mockProps.admin.user.lastName}`)
    expect(userName).toBeInTheDocument()
  })
  it("position title is in the document", () => {
    const positionTitle = screen.getByText(mockProps.admin.positionTitle)
    expect(positionTitle).toBeInTheDocument()
  })
  it("access type is in the document", () => {
    const accessType = screen.getByText(`${mockProps.admin.accessType} access`)
    expect(accessType).toBeInTheDocument()
  })
  it("mobile number is in the document", () => {
    const mobileNum = screen.getByText(String(mockProps.admin.user.mobileNumber))
    expect(mobileNum).toBeInTheDocument()
  })
  it("user email is in the document", () => {
    const email = screen.getByText(mockProps.admin.user.email!)
    expect(email).toBeInTheDocument()
  })
})