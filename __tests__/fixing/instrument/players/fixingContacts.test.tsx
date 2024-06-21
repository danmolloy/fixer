import { render, screen } from "@testing-library/react";
import { mockCall } from "../../../../__mocks__/models/call";
import { mockEnsembleContact } from "../../../../__mocks__/models/ensembleContact";
import { mockUserId } from "../../../../__mocks__/models/user";
import FixingContacts, { FixingContactsProps } from "../../../../components/fixing/instrument/players/fixingContacts";
import { Formik } from "formik";
import "@testing-library/jest-dom"

const mockProps: FixingContactsProps = {
  contacts: [mockEnsembleContact],
  eventCalls: [mockCall],
  appendedPlayerIds: [mockUserId]
}

describe("<FixingContacts />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {props => (
          <FixingContacts {...mockProps} />
        )}
      </Formik>)
  })
  it("fixing-contacts is in the document", () => {
    const fixingContacts = screen.getByTestId("fixing-contacts")
    expect(fixingContacts).toBeInTheDocument()
  })

  it("contact tile for each contact", () => {
    for (let i = 0; i < mockProps.contacts.length; i++) {
      const contactTile = screen.getByTestId(`${mockProps.contacts[i].id}-contact-tile`)
      expect(contactTile).toBeInTheDocument()
    }
  })
})



describe("<FixingContacts />", () => {
  const mockProps: FixingContactsProps = {
    contacts: [],
    eventCalls: [mockCall],
    appendedPlayerIds: [mockUserId]
  }
  beforeEach(() => {
    render(<FixingContacts {...mockProps} />)
  })
  it("if contacts.length === 0, there is a helpful message", () => {
    const fixingContacts = screen.getByTestId("fixing-contacts")
    expect(fixingContacts.textContent).toMatch("No ensemble contacts on your list.")
    expect(fixingContacts.textContent).toMatch("Add them via Ensemble Page or find players in the directory.")
  })
})