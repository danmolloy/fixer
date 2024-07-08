import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import AccountInfo, { AccountInfoProps } from "../../../../components/users/settings/accountInfo"
import { mockUser } from "../../../../__mocks__/models/user"
import { Formik } from "formik"
import { mockAdminWithEnsemble } from "../../../../__mocks__/models/ensembleAdmin"

const mockProps: AccountInfoProps = {
  user: {
    ...mockUser,
    blockedUsers: []
  },
  instrumentsList: ["Horn"], 
  ensembleAdminList: [mockAdminWithEnsemble]
}

describe("<AccountInfo />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {props => (
          <AccountInfo {...mockProps}/>
        )}
      </Formik>)
  })
  
  it("account-information is in the document", () => {
    const accountInfo = screen.getByTestId("account-info")
    expect(accountInfo).toBeInTheDocument()
  })
  it("instruments-list is in the document", () => {
    const instrumentsList = screen.getByTestId("instruments-list")
    expect(instrumentsList).toBeInTheDocument()
  })
  it("ensemble-admin is in the document", () => {
    const ensembleAdmin = screen.getByTestId("ensemble-admin")
    expect(ensembleAdmin).toBeInTheDocument()
  })
  //it("passes currect values to children", () => {})
  //it("blocked players list and btn to render blockPlayers selection is in the document", () => {})
})