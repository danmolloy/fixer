import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppendedContactRow, { AppendedContactRowProps } from "../../../../../../app/fixing/contactMessage/form/appendedContacts/contactRow";
import { mockEnsembleContact } from "../../../../../../__mocks__/models/ensembleContact";
import { mockCall } from "../../../../../../__mocks__/models/call";
import { Formik } from "formik";

global.focus = jest.fn()

const mockProps: AppendedContactRowProps = {
  contact: {
    contactId: mockEnsembleContact.id,
    contactMessageId: Math.random() > .5 ? Math.ceil(Math.random() * 10) : undefined,
    name: `${mockEnsembleContact.firstName} ${mockEnsembleContact.lastName}`,
    playerMessage: Math.random() > .5 ? "mock message" : null,
    calls: [mockCall.id]
  },
  index: Math.ceil(Math.random() * 10),
  eventCalls: [mockCall],
  remove: jest.fn(),
  swap: jest.fn(),
  numContacts: Math.ceil(Math.random() * 10) + 10,
}

describe("<AppendedContactRow />", () => {
  beforeEach(() => {
    render(
      <Formik onSubmit={() => {}} initialValues={{}}>
        <table>
          <tbody>
            <AppendedContactRow {...mockProps} />
          </tbody>
        </table>
      </Formik>
  )
  })
  it("<AppendedContactRow /> renders", () => {})
  it("contact name is in the document", () => {})
  it("position select is in the document with name attr & options", () => {})
  it("all event call checkboxes are in the document with checked, type, value & name attrs", () => {})
  it("menu btn is in the document and renders menu on click", () => {})
  it("moveUp btn is in the documentand calls 'swap(index, index - 1)' on click", () => {})
  it("moveUp btn is disabled if contact is in position 0", () => {})
  it("moveDown btn is disabled if contact is in bottom position", () => {})
  it("moveDown btn is in the documentand calls 'swap(index, index + 1)' on click", () => {})
  it("it remove btn is in menu and calls remove() on click", () => {})

})