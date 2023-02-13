import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EditCalls from "../../components/fixing/editCalls"

const mockData = {
  instrumentName: "Violin", 
  instrumentalists: [{"id":"cl5jltfk10109t6u0gv0gv94p","name":"Nina Kuhlman","email":"Alexys.Bahringer@hotmail.com","emailVerified":null,"image":null,"instrument":"Viola","profileInfo":null,"isFixer":null},{"id":"cl5jlua0p0203t6u0hhsnv8d9","name":"Mrs. Naomi Emmerich","email":"Ricky.Emard@yahoo.com","emailVerified":null,"image":null,"instrument":"Viola","profileInfo":null,"isFixer":null}]
}

describe("EditCalls component", () => {
  beforeEach(() => {
    render(<EditCalls 
      handleSubmit={jest.fn()} 
      instrumentName={mockData.instrumentName} 
      instrumentalists={mockData.instrumentalists}/>)
  })
  it("Renders", () => {
    const editCallsDiv = screen.getByTestId(`${mockData.instrumentName}-edit`)
    expect(editCallsDiv).toBeInTheDocument()
  })
  it("Call order select menu exists", () => {
    const callOrderMenu = screen.getByTestId("call-order-drop-down")
    expect(callOrderMenu).toBeInTheDocument()
  })
  //it("'Select Players' list explicitly states if there are no players left", () => {})
  it("Text input exists for each instrument to add additional info", () => {
    const msgInput = screen.getByTestId("instrument-msg-input")
    expect(msgInput).toBeInTheDocument()
  })
  

})

//it("Edit button renders list of players not yet on call list")
//"Edit component has number input for Num to Book"
//"When player added to appendedCalls, only that name is removed from available players"
//"Text input exists for each instrument to add additional info"
  //it("Text input for each instrument to add additional info actually adds the info", () => {})
//"Fix button adds changes"
  //it("Text input for each player to add additional info actually adds the info", () => {})
