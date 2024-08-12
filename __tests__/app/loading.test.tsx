import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "../../app/loading";

describe("<Loading />", () => {
  beforeEach(() => {
    render(<Loading />)
  })
  it("<Loading /> renders and clearly states 'Loading'", () => {
    const loading = screen.getByTestId("loading")
    expect(loading).toBeInTheDocument()
    expect(loading.textContent).toMatch(/^Loading...$/)
  })
  it("matches snapshot", () => {
    const loading = screen.getByTestId("loading")
    expect(loading).toMatchSnapshot()
  })
})