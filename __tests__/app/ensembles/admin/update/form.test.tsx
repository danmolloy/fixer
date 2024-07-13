import "@testing-library/jest-dom";
import UpdateAdminForm, { InviteAdminFormProps } from "../../../../../app/ensembles/admin/update/form";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import axios from "../../../../../__mocks__/axios";
import { mockEnsembleAdmin } from "../../../../../__mocks__/models/ensembleAdmin";

jest.mock("next/navigation")

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });


describe("<UpdateAdminForm />", () => {
  const mockProps: InviteAdminFormProps = {
    admin: {...mockEnsembleAdmin, accessType: "restricted"}
  }
  beforeEach(() => {
    render(<UpdateAdminForm {...mockProps} />)
  })
  it("<UpdateAdminForm /> renders", () => {
    const updateForm = screen.getByTestId("update-admin-form")
    expect(updateForm).toBeInTheDocument()
  })
  it("position title input is in the document with label, initalVal, name & type attrs", () => {
    const positionInput = screen.getByLabelText("Position Title")
    expect(positionInput).toBeInTheDocument()
    expect(positionInput).toHaveAttribute("name", "positionTitle")
    expect(positionInput).toHaveAttribute("type", "text")
    expect(positionInput).toHaveAttribute("value", mockProps.admin.positionTitle)

  })
  it("access type radio group is in the document with Restricted & Full options", async () => {
    const radioGroup = screen.getByLabelText("Access Type")
    expect(radioGroup).toBeInTheDocument()
    expect(radioGroup.textContent).toMatch('Restricted')
    expect(radioGroup.textContent).toMatch("Full")

    const restrictedOption = screen.getByLabelText("Restricted")
    expect(restrictedOption).toHaveAttribute("type", "radio")
    expect(restrictedOption).toHaveAttribute("name", "accessType")
    expect(restrictedOption).toHaveAttribute("value", "restricted")
    expect(restrictedOption).toHaveAttribute("checked")
    
    const fullOption = screen.getByLabelText("Full")
    expect(fullOption).toHaveAttribute("type", "radio")
    expect(fullOption).toHaveAttribute("name", "accessType")
    expect(fullOption).toHaveAttribute("value", "full")
    expect(fullOption).not.toHaveAttribute("checked")

  })
  it("submit btn is in the document", () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute("type", "submit")
    expect(submitBtn).toHaveRole("button")
  })
  it("submit btn calls axios.post() and useRouter() if form complete", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async () => {
      fireEvent.click(submitBtn)
    })
    expect(axios.post).toHaveBeenCalledWith(
      "/ensembles/admin/api/update",
      {
        accessType: mockProps.admin.accessType,
        adminId: mockProps.admin.id,
        positionTitle: mockProps.admin.positionTitle
      }
    )
  })
})

describe("<UpdateAdminForm />", () => {
  const mockProps: InviteAdminFormProps = {
    admin: {
      ...mockEnsembleAdmin,
      positionTitle: "",
      accessType: "",
    }
  }
  beforeEach(() => {
    render(<UpdateAdminForm {...mockProps} />)
  })
  it("if form incomplete, errs render on submit btn click", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async () => {
      fireEvent.click(submitBtn)
    })
    expect(axios.post).not.toHaveBeenCalled()
    const updateForm = screen.getByTestId("update-admin-form")
    expect(updateForm.textContent).toMatch("position title required")
    expect(updateForm.textContent).toMatch("choose access type")

  })
})
