import { fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
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
jest.mock('uuid', () => ({ 
  v4: () => '1234' 
}));
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


describe("Form Submit", () => {
  const handleSubmit = jest.fn()
  beforeEach(() => {
    render(<CreateEventForm handleSubmit={handleSubmit} />)
  })
  it("handleSumbit not called if form not validated", async () => {
    const createButton = screen.getByTestId("create-event-btn")
    await act(async () => {
      await waitFor(() => {
        fireEvent.click(createButton)
      })
    }) 
    expect(handleSubmit).not.toHaveBeenCalled()

  })
  // Confirmed or on hold must be specified in form submission
  it("Create Event Button calls handleSubmit with expected values if form validated", async () => {
    //axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: {} }));
    jest.mock('uuid', () => ({ v4: () => '1234' }));

    const user = userEvent.setup()
    const eventForm = screen.getByTestId("create-event-form")
    const createButton = screen.getByTestId("create-event-btn")
    await user.click(screen.getByText("On Hold"))
    await user.click(screen.getByLabelText("BBC Symphony Orchestra"))
    fireEvent.change(screen.getByLabelText("Concert Program"), {target: {value: "Schoenberg"}})
    fireEvent.change(screen.getByLabelText("Start Time"), {target: {value: "2023-10-13T10:00"}}) // 13/10/2023 10:00am
    fireEvent.change(screen.getByLabelText("End Time"), {target: {value: "2023-10-13T13:00"}}) // 13/10/2023 1:00pm
    await user.type(screen.getByLabelText("Venue"), "Maida Vale") 

    fireEvent.change(screen.getByLabelText("Dress Code"), {target: {value: "DJs/Long Black"}})
    fireEvent.change(screen.getByLabelText("Fee"), {target: {value: "ABO Category 1"}})
    //additionalInfo
    
    await act(async () => {
      await waitFor(() => {
        fireEvent.click(createButton)
      })
    }) 
    await act(async () => {
      await new Promise(res => setTimeout(res, 100))
    })

    expect(handleSubmit).toHaveBeenCalledWith({
      "fixer": {
        "email": mockSession.user.email,
        "name": mockSession.user.name
      },
      "confirmOrHold": "onHold",
      "ensemble": "BBC Symphony Orchestra",
      "ensembleName": "",
      "concertProgram": "Schoenberg",
      "calls": [{
        "id": "1234",
        "startTime": "2023-10-13T10:00",
        "endTime": "2023-10-13T13:00",
        "venue": "Maida Vale"
      }],
      "dressCode": "DJs/Long Black",
      "fee": "ABO Category 1",
      "additionalInfo": "",
    })
     
  })

})