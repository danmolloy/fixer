import { fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import CreateEventForm from '../components/createEvent/createEventForm';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { prismaMock } from '../singleton';
import Events from '../pages/events';
import moment from 'moment';

const dateTimeRegex = /[a-z]{3}\s[a-z]{3}\s[\d]{2}\s[\d]{4}\s[\d]{2}:[\d]{2}/i

jest.mock('uuid', () => ({ v4: () => 'mockedUuid' }));
jest.mock("axios")
const mockSession = {
  "user":{
    "name":"danmolloy","email":"danielmolloy_6@icloud.com","image":"https://avatars.githubusercontent.com/u/64697812?v=4"
  },
  "userData":{"id":"cl5if30or0054ixu0y1vap3yd","name":"danmolloy","email":"danielmolloy_6@icloud.com","emailVerified":null,"image":"https://avatars.githubusercontent.com/u/64697812?v=4","instrument":"Double Bass","profileInfo":null,"isFixer":null,"events":[{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime": moment(),"endTime": moment().add(3, 'hours'),"venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}]}],"calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime": moment().add(4, "hours"),"endTime": moment().add(5, "hours"),"venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com","event":{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com"}}]},
  "expires":"2022-11-13T20:04:30.199Z"
}
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

const eventProps = {"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime": moment().add(1, "days"),"endTime": moment().add(25, "hours"),"venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}],"instrumentSections":[{"id":119,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T11:09:49.866Z","eventId":20,"instrumentName":"Violin","numToBook":1,"callOrder":"ordered","musicians":[{"id":270,"createdAt":"2022-10-03T12:36:30.338Z","updatedAt":"2022-10-03T12:38:19.070Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":119,"musician":{"name":"Tyler Hoppe"}},{"id":271,"createdAt":"2022-10-03T12:38:28.714Z","updatedAt":"2022-10-03T12:38:28.714Z","recieved":false,"accepted":null,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":119,"musician":{"name":"Benjamin Zieme"}},{"id":265,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T12:38:29.465Z","recieved":true,"accepted":false,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":119,"musician":{"name":"Kara Rau"}}]},{"id":120,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T11:21:14.648Z","eventId":20,"instrumentName":"Viola","numToBook":1,"callOrder":"ordered","musicians":[{"id":267,"createdAt":"2022-10-03T12:31:04.326Z","updatedAt":"2022-10-03T12:31:04.327Z","recieved":false,"accepted":null,"musicianEmail":"Ricky.Emard@yahoo.com","eventInstrumentId":120,"musician":{"name":"Mrs. Naomi Emmerich"}},{"id":266,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T12:31:05.059Z","recieved":true,"accepted":false,"musicianEmail":"Alexys.Bahringer@hotmail.com","eventInstrumentId":120,"musician":{"name":"Nina Kuhlman"}}]},{"id":121,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:08.704Z","eventId":20,"instrumentName":"Cello","numToBook":1,"callOrder":"ordered","musicians":[{"id":268,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:10.821Z","recieved":true,"accepted":null,"musicianEmail":"Karli.Rolfson@gmail.com","eventInstrumentId":121,"musician":{"name":"Jason Denesik"}}]},{"id":122,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:26.895Z","eventId":20,"instrumentName":"Double Bass","numToBook":1,"callOrder":"ordered","musicians":[{"id":269,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:27.828Z","recieved":true,"accepted":null,"musicianEmail":"Owen.Collins@hotmail.com","eventInstrumentId":122,"musician":{"name":"Justin Schulist"}}]}]}

describe("Upcoming Events", () => {
    //it("Contact Fixer button renders contact info", () => {})
    //it("Displays Calls rather than Events", () => {})
    //it("Displays Calls in order of soonest to latest", () => {})
    //it("Doesn't display past calls", () => {})
    //it("Link to view venue in Google Maps", () => {})
  beforeEach(() => {
    render(<Events />)
  })

  //it("upcomingCalls function returns expected arr", () => {})

  it("Upcoming Events Page Loads", () => {
    const header = screen.getByText(/Upcoming Events/)
    expect(header).toBeInTheDocument()
  })
  it("Finds upcoming Events", () => {
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv).toBeInTheDocument()
    expect(eventsDiv.textContent).toMatch(eventProps.ensembleName)
  })
  it("Has button to contact fixer", () => {
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv).toBeInTheDocument()
    expect(eventsDiv.textContent).toMatch(/Fixer Details/g)
  })
  it("Has link to event page", () => {
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv).toBeInTheDocument()
    expect(eventsDiv.textContent).toMatch(/View Event/g)
  })
  it("Displays Start date and time", () => {
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv).toBeInTheDocument()
    expect(eventsDiv.textContent).toMatch(dateTimeRegex)
  })
  it("Displays End Date/Time", () => {
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv).toBeInTheDocument()
    expect(eventsDiv.textContent).toMatch(dateTimeRegex)
  })
  it("Program Displayed", () => {
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv).toBeInTheDocument()
    expect(eventsDiv.textContent).toMatch(eventProps.concertProgram)
  })
  it("Venue displayed", () => {
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv.textContent).toMatch(eventProps.calls[0].venue)
  })
  it("Indicates if you are the fixer of the event", () => {
    expect(mockSession.user.email).toEqual(eventProps.fixerEmail)
    const eventsDiv = screen.getByTestId("event-list")
    expect(eventsDiv.textContent).toMatch(/You are the fixer of this event./gi)
  })
})

describe("Calendar", () => {
  //it("There is a month calendar where one can select dates")
  //it("It is visible on the calendar which days are selected ie 17-24 Dec")
  //it("There is a month-view calendar", () => {})
  //it("There is a week view calendar", () => {})
  //it("One can add to their calendar", () => {})
})