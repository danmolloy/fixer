import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import EnsembleForm, { EnsembleFormProps } from "../../../components/users/settings/ensembleForm"
import { mockEnsemble } from "../../../__mocks__/models/ensemble"
import axios from "axios"
import { mockUserId } from "../../../__mocks__/models/user"
import { mockAdminWithEnsemble } from "../../../__mocks__/models/ensembleAdmin"

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });


const mockProps: EnsembleFormProps = {
  userEnsembles: [mockAdminWithEnsemble],
  userId: mockUserId
}

describe("<EnsembleForm />", () => {
  beforeEach(() => {
    render(<EnsembleForm {...mockProps} />)
  })
  it("ensemble-form is in the document with title 'Your Ensembles'", () => {
    const ensembleForm = screen.getByTestId("ensemble-form")
    expect(ensembleForm).toBeInTheDocument()
    const formTitle = screen.getByText("Your Ensembles")

  })
  it("form has page title 'Create Ensemble'", () => {
    const formTitle = screen.getByText("Create Ensemble")
    expect(formTitle).toBeInTheDocument()
  })
  it("list of user's listed ensembles is in the document", () => {
    const userEnsembles = screen.getByTestId("current-ensembles")
    expect(userEnsembles).toBeInTheDocument()
    expect(userEnsembles.textContent).toMatch("Current Ensembles")
    for (let i = 0; i < mockProps.userEnsembles.length; i++) {
      let ensemble = screen.getByText(mockProps.userEnsembles[i].ensemble.name)
      expect(ensemble).toBeInTheDocument()
    }
  })
  it("ensemble text input is in the document with expected name attr and label", () => {
    const ensembleInput = screen.getByLabelText("Ensemble Name")
    expect(ensembleInput).toBeInTheDocument()
    expect(ensembleInput).toHaveAttribute("name", "ensembleName")
  })
  it("adminOrMusician radio input in the document with expected label", () => {
    const adminOrPlayer = screen.getByText("Your Position")
    expect(adminOrPlayer).toBeInTheDocument()

  })
  it("adminOrMusician radio group has Admin only option with expected labels, name and value attr", () => {
    const adminOption = screen.getByLabelText("Administration")
    expect(adminOption).toBeInTheDocument()
    expect(adminOption).toHaveAttribute("type", "radio")
    expect(adminOption).toHaveAttribute("name", "adminOrMusician")
    expect(adminOption).toHaveAttribute("value", "admin")
  })

  it("err msgs if ensemble name, adminOrMusician or position missing", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async() => {
      await fireEvent.click(submitBtn)
    })
    const ensembleForm = screen.getByTestId("ensemble-form")
    expect(ensembleForm.textContent).toMatch("ensemble name required")
    //expect(ensembleForm.textContent).toMatch("department required")
    expect(ensembleForm.textContent).toMatch("position title required")

  })
  
  it("submit btn calls api/ensemble/create if form completed by admin (no section needed)", async () => {
    const ensembleInput = screen.getByLabelText("Ensemble Name")
    const ensembleName = "BBCSO"
    const adminOrMusician = "Admin"
    const positionTitle = "Orchestra Manager"
    await act(async () => {
      await fireEvent.change(ensembleInput, {target: { value: ensembleName}})
    })
    const positionInput = screen.getByLabelText("Your Position")
    await act(async () => {
      await fireEvent.change(positionInput, {target: { value: positionTitle}})
    })
    const submitBtn = screen.getByText("Submit")
    await act(async() => {
      await fireEvent.click(submitBtn)
    })

    expect(axios.post).toHaveBeenCalledWith("/api/ensemble/create", {
      ensembleName,
      userPositionTitle: positionTitle,
      userId: mockProps.userId
    })
  })
  //it("ComboBox to add ensemble", () => {})
  //it("ComboBox has list of already existing ensembles", () => {})
  //it("if player is selected, there is a select menu of orchestra sections which has expected label and name attr", () => {})
  //it("section select options have expected value attr and text", () => {})
  //it("position title text input is in the document", () => {})
  //it("submit btn calls api/ensemble/update if user is adding themselves to ensemble", () => {})
})

