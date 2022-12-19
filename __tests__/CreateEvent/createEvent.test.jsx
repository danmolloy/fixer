import { fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import Home from '../../pages/index'
import '@testing-library/jest-dom'
import CreateEventForm from '../../components/createEvent/createEventForm';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import { v4 as uuid } from 'uuid';

const mockSession = {
  "user":{
    "name":"danmolloy","email":"danielmolloy_6@icloud.com","image":"https://avatars.githubusercontent.com/u/64697812?v=4"
  },
  "userData":{"id":"cl5if30or0054ixu0y1vap3yd","name":"danmolloy","email":"danielmolloy_6@icloud.com","emailVerified":null,"image":"https://avatars.githubusercontent.com/u/64697812?v=4","instrument":"Double Bass","profileInfo":null,"isFixer":null,"events":[{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}]}],"calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com","event":{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com"}}]},
  "expires":"2022-11-13T20:04:30.199Z"
}
jest.mock("axios")

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

jest.mock("next/link", () => {
  return ({children}) => {
      return children;
  }
});

const eventProps = {"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}],"instrumentSections":[{"id":119,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T11:09:49.866Z","eventId":20,"instrumentName":"Violin","numToBook":1,"callOrder":"ordered","musicians":[{"id":270,"createdAt":"2022-10-03T12:36:30.338Z","updatedAt":"2022-10-03T12:38:19.070Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":119,"musician":{"name":"Tyler Hoppe"}},{"id":271,"createdAt":"2022-10-03T12:38:28.714Z","updatedAt":"2022-10-03T12:38:28.714Z","recieved":false,"accepted":null,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":119,"musician":{"name":"Benjamin Zieme"}},{"id":265,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T12:38:29.465Z","recieved":true,"accepted":false,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":119,"musician":{"name":"Kara Rau"}}]},{"id":120,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T11:21:14.648Z","eventId":20,"instrumentName":"Viola","numToBook":1,"callOrder":"ordered","musicians":[{"id":267,"createdAt":"2022-10-03T12:31:04.326Z","updatedAt":"2022-10-03T12:31:04.327Z","recieved":false,"accepted":null,"musicianEmail":"Ricky.Emard@yahoo.com","eventInstrumentId":120,"musician":{"name":"Mrs. Naomi Emmerich"}},{"id":266,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T12:31:05.059Z","recieved":true,"accepted":false,"musicianEmail":"Alexys.Bahringer@hotmail.com","eventInstrumentId":120,"musician":{"name":"Nina Kuhlman"}}]},{"id":121,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:08.704Z","eventId":20,"instrumentName":"Cello","numToBook":1,"callOrder":"ordered","musicians":[{"id":268,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:10.821Z","recieved":true,"accepted":null,"musicianEmail":"Karli.Rolfson@gmail.com","eventInstrumentId":121,"musician":{"name":"Jason Denesik"}}]},{"id":122,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:26.895Z","eventId":20,"instrumentName":"Double Bass","numToBook":1,"callOrder":"ordered","musicians":[{"id":269,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:27.828Z","recieved":true,"accepted":null,"musicianEmail":"Owen.Collins@hotmail.com","eventInstrumentId":122,"musician":{"name":"Justin Schulist"}}]}]}


describe("Create Event Form", () => {
  //it("Calls has concert option which doesn't require endtime", () => {})
  //it("Contains a dropdown menu for 'Venue'", () => {})
  //it("Create Event button", () => {})
  //it("shows error if Other ensemble selected and no text input", () => {})
  //it("shows errors if a required field is missing", () => {})
  //it("It removes empty Calls", () => {})
  //it("Shows error if a Call's details are partially entered", () => {})
  //it("Throws additionalInfo") // Pourqoui? It is not required.
  //it("Select whether call is confirmed", () => {})

  beforeEach(() => {
    render(<CreateEventForm />)
  })
  it("Create Event Form renders", () => {
    const eventForm = screen.getByTestId("create-event-form")
    expect(eventForm).toBeInTheDocument()
  })
  it("Ensemble has radio options, including 'other' option/text input, which is visible only when other is selected", async () => {
    const ensembleOptions = screen.getByTestId("ensemble-radio-fieldset")
    expect(ensembleOptions).toBeInTheDocument()
    const otherOption = screen.getByLabelText(/Other/)
    expect(otherOption).toBeInTheDocument()
    await act(async() => {
      await waitFor(() => {
        fireEvent.click(otherOption)
      })
    })
    const otherEnsembleName = screen.getByTestId("other-ensemble-input")
    expect(otherEnsembleName).toBeInTheDocument()
    await act(async() => {
      await waitFor(() => {
        fireEvent.click(screen.getByLabelText(/BBC Symphony Orchestra/))
      })
    })
    expect(otherEnsembleName).not.toBeInTheDocument()
  })
  it("Concert Program input exists", () => {
    const programInput = screen.getByTestId("concert-program-input")
    expect(programInput).toBeInTheDocument()
  })
  it("Calls Array has two child elements which are 'Call 1' and Add Call button", () => {
    const callsArray = screen.getByTestId("calls-array")
    expect(callsArray.children).toHaveLength(2) // Call 1 & Add Call btn
    expect(callsArray.children[0]).toHaveTextContent(/^Call 1/)
    expect(callsArray.children[0]).not.toHaveTextContent(/Call 2/g)
    expect(callsArray.children[1]).toHaveTextContent(/^Add Call$/)
  })
  it("'Call 1' Start Time exists and is datetime-local input", () => {
    const startTimeInput = screen.getByLabelText(/Start Time/)
    expect(startTimeInput).toBeInTheDocument()
  })
  it("'Call 1' End Time input exists", () => {
    const endTimeInput = screen.getByLabelText(/End Time/)
    expect(endTimeInput).toBeInTheDocument()
  })
  it("'Call 1' Venue input exists", () => {
    const venueInput = screen.getByLabelText(/^Venue$/)
    expect(venueInput).toBeInTheDocument()
  })
  it("Add Call button exists", () => {
    const addCallBtn = screen.getByTestId("add-call-btn")
    expect(addCallBtn).toBeInTheDocument()
  })
  it("Add Call button adds element labelled 'Call 2'", async () => {
    const callsArray = screen.getByTestId("calls-array")
    expect(callsArray.children).toHaveLength(2) // Call 1 & Add Call btn
    expect(callsArray).toHaveTextContent(/^Call 1/)
    expect(callsArray).not.toHaveTextContent(/Call 2/gi)
    expect(callsArray.children[1]).toHaveTextContent(/^Add Call$/)
    await act(async () => {
      await waitFor(() => {
        fireEvent.click(callsArray.children[1])
      })
    })
    
    expect(callsArray).toHaveTextContent(/Call 2/g)
  })
  it("All Calls have Delete Call Button, except for Call 1", async () => {
    const callsArray = screen.getByTestId("calls-array")
    expect(callsArray.children).toHaveLength(2) // Call 1 & Add Call btn
    expect(callsArray).toHaveTextContent(/^Call 1/)
    expect(callsArray).not.toHaveTextContent(/Call 2/gi)
    expect(callsArray.children[1]).toHaveTextContent(/^Add Call$/)
    const callsDiv = screen.getByTestId("calls-array")
    expect(callsDiv.innerHTML).not.toMatch(/delete-btn/)

    await act(async () => {
      await waitFor(() => {
        fireEvent.click(callsArray.children[1])
      })
    })
    expect(callsDiv.textContent).toMatch(/Call 2/)
    expect(callsDiv.innerHTML).toMatch(/delete-btn/)
    const call2DeleteBtn = screen.getByTestId("calls-1-delete")
    expect(call2DeleteBtn).toBeInTheDocument()
    await act(async () => {
      await waitFor(() => {
        fireEvent.click(call2DeleteBtn)
      })
    })
    expect(callsDiv.textContent).toMatch(/Call 1/)
    expect(callsDiv.innerHTML).not.toMatch(/delete-btn/)
    expect(callsDiv.textContent).not.toMatch(/Call 2/)
  })

  it("Dress Code text input exists", () => {
    const dressCodeInput = screen.getByTestId("dress-code-input")
    expect(dressCodeInput).toBeInTheDocument()
  })
  it('Fee text input exists', () => {
    const feeInput = screen.getByTestId("fee-input")
    expect(feeInput).toBeInTheDocument()
  })
  it("Addional Info text input exists", () => {
    const addInfoInput = screen.getByTestId("additional-info-input")
    expect(addInfoInput).toBeInTheDocument()
  })
  it("Create Event button exists", () => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
  })
   
})

describe("Form Validation", () => {
  beforeEach(() => {
    render(<CreateEventForm />)
  })
  /* Need to find more reasons to throw other than being 'required' field. */
  //it("Throws if fixer is not Object{ name: String (required), email: String (required) }", () => {})
  //it("Throws calls[i] id")
  //it("Throws calls") // Why would it throw this? If calls.length == 0?

  it("Confirmed or On Hold not selected throws Error Message", async () => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const confirmOrHoldToggleGroup = screen.getByTestId("confirm-or-hold-toggle-group")
    expect(confirmOrHoldToggleGroup).toBeInTheDocument()
    expect(confirmOrHoldToggleGroup.textContent).toMatch(/Required/)

  })

  it("Ensemble name not selected throws Error Message", async() => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const ensembleError = screen.getByTestId("create-form-error-ensemble")
    expect(ensembleError).toBeInTheDocument()
    expect(ensembleError.textContent).toMatch(/Select ensemble/)

  })
  it("If Ensemble === 'Other', throws Error Message if name not entered", async() => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    const otherEnsemble = screen.getByTestId("other-ensemble-radio")
    act(() => {
      fireEvent.click(otherEnsemble)
    })
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const otherEnsembleName = screen.getByTestId("other-ensemble-input")
    expect(otherEnsembleName).toBeInTheDocument()
    expect(otherEnsembleName.textContent).toMatch(/Ensemble name required/)

  })
  it("Concert Program undefined throws Error Message", async() => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 10))
    })
    const concertProgramDiv = screen.getByTestId("concert-program-div")
    expect(concertProgramDiv).toBeInTheDocument()
    expect(concertProgramDiv.textContent).toMatch(/Required/)
    
  })
  it("Calls[i] startTime undefined throws Error Message", async() => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    const addCallBtn = screen.getByTestId("add-call-btn")
    expect(addCallBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(addCallBtn)
    })
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const call1StartTime = screen.getByTestId(`calls-0-startTime-error`)
    expect(call1StartTime).toBeInTheDocument()
    expect(call1StartTime.textContent).toMatch(/Required/)
    const call2StartTime = screen.getByTestId(`calls-1-startTime-error`)
    expect(call2StartTime).toBeInTheDocument()
    expect(call2StartTime.textContent).toMatch(/Required/)

  })
  it("Calls[i] endTime undefined throws Error Message", async () => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    const addCallBtn = screen.getByTestId("add-call-btn")
    expect(addCallBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(addCallBtn)
    })
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const call1EndTime = screen.getByTestId(`calls-0-endTime-error`)
    expect(call1EndTime).toBeInTheDocument()
    const call2EndTime = screen.getByTestId(`calls-1-endTime-error`)
    expect(call2EndTime).toBeInTheDocument()
  })
  it("Calls[i] Venue undefined throws Error Message", async () => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    const addCallBtn = screen.getByTestId("add-call-btn")
    expect(addCallBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(addCallBtn)
    })
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const call1Div = screen.getByTestId("call-1-div")
    expect(call1Div).toBeInTheDocument()
    expect(call1Div.textContent).toMatch("Venue required")
    const call2Div = screen.getByTestId(`call-2-div`)
    expect(call2Div).toBeInTheDocument()
    expect(call2Div.textContent).toMatch("Venue required")

  })
  it("Dress Code === undefined throws Error Message", async () => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const dressCodeDiv = screen.getByTestId("dress-code-div")
    expect(dressCodeDiv).toBeInTheDocument()
    expect(dressCodeDiv.textContent).toMatch(/Required/)

  })
  it("Fee undefined throws Error Message", async () => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const feeDiv = screen.getByTestId("fee-div")
    expect(feeDiv).toBeInTheDocument()
    expect(feeDiv.textContent).toMatch(/Required/)
  })
  it("Select whether gig is confirmed", () => {
    const confirmOrHoldToggleGroup = screen.getByTestId("confirm-or-hold-toggle-group")
    expect(confirmOrHoldToggleGroup).toBeInTheDocument()
  })

}) 

describe("Edit Event", () => {
  it("1 is 1", () => {
    expect(1).toBe(1)
  })
  //it("Calls event form with event info as initial values", () => {}) // Did you check call times and ensemble name?
  //it("Create Event button edits event and doesn't delete all the calls", () => {}) // I think this happens
  //it("Create Event button edits event and retains the eventID", () => {}) // Definitely worth checking
})
