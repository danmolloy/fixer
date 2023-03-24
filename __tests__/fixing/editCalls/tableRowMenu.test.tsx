import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import TableRowMenu from "../../../components/fixing/editCalls/tableRowMenu";
import React from "react";

const menuProps = {
  menuOptions: [
    {
      text: "Add Message",
      id: "0"
    },
    {
      text: "Fix Player",
      id: "1"
    },
  ]
}

describe("TableRowMenu component", () => {
  beforeEach(() => {
    render(<TableRowMenu {...menuProps} />)
  });
  it("Renders", () => {
    const menuDiv = screen.getByTestId("table-row-menu");
    expect(menuDiv).toBeInTheDocument()
  });
  it("MenuOptions are in the document", () => {
    const menuDiv = screen.getByTestId("table-row-menu");
    for (let i = 0; i < menuProps.menuOptions.length; i++) {
      expect(menuDiv.textContent).toMatch(menuProps.menuOptions[i].text)
    }
  });
});