import BillingIndex from "../../../app/billing/page";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { paymentOptions } from "../../../app/billing/paymentOptions";

describe("<BillingIndex />", () => {
  beforeEach(() => {
    render(<BillingIndex />);
  });
  it("billing-index is in the document", () => {
    const billingIndex = screen.getByTestId("billing-index");
    expect(billingIndex).toBeInTheDocument();
  });
  it("'Choose Plan' title is in the document", () => {
    const billingTitle = screen.getByText("Choose Plan");
    expect(billingTitle).toBeInTheDocument();
  });
  it("all payment options are in the document", () => {
    for (let i = 0; i < paymentOptions.length; i ++) {
      const paymentOption = screen.getByTestId(`${paymentOptions[i].id}-option`)
      expect(paymentOption).toBeInTheDocument()
    }
  })
  it("manage account form is in the document with expected attrs", () => {
    const manageForm = screen.getByTestId("manage-acc-form")
    expect(manageForm).toBeInTheDocument()
    expect(manageForm).toHaveAttribute("action", "/billing/api/manage/")
    expect(manageForm).toHaveAttribute("method", "POST")
  })
  it("manage acc button is in the document with label and expected attrs", () => {
    const manageAccBtn = screen.getByTestId("manage-btn")
    expect(manageAccBtn).toBeInTheDocument()
    expect(manageAccBtn.textContent).toMatch("Manage Account")
    expect(manageAccBtn).toHaveAttribute("type", "submit")
    expect(manageAccBtn).toHaveAttribute("role", "link")
  })
  //it("matches snapshot", () => {})
})