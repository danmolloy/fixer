import { fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import CreateEventForm from '../components/createEvent/createEventForm';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { prismaMock } from '../singleton';
import Events from '../pages/events';
import EventInfo from '../components/event/event';

jest.mock('uuid', () => ({ v4: () => 'mockedUuid' }));
jest.mock("axios")

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    "user":{
      "name":"danmolloy","email":"danielmolloy_6@icloud.com","image":"https://avatars.githubusercontent.com/u/64697812?v=4"
    },
    "userData":{"id":"cl5if30or0054ixu0y1vap3yd","name":"danmolloy","email":"danielmolloy_6@icloud.com","emailVerified":null,"image":"https://avatars.githubusercontent.com/u/64697812?v=4","instrument":"Double Bass","profileInfo":null,"isFixer":null,"events":[{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}]}],"calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com","event":{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com"}}]},
    "expires":"2022-11-13T20:04:30.199Z"
  }
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

const mockSession = {
    "user":{
      "name":"danmolloy","email":"danielmolloy_6@icloud.com","image":"https://avatars.githubusercontent.com/u/64697812?v=4"
    },
    "userData":{"id":"cl5if30or0054ixu0y1vap3yd","name":"danmolloy","email":"danielmolloy_6@icloud.com","emailVerified":null,"image":"https://avatars.githubusercontent.com/u/64697812?v=4","instrument":"Double Bass","profileInfo":null,"isFixer":null,"events":[{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}]}],"calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com","event":{"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com"}}]},
    "expires":"2022-11-13T20:04:30.199Z"
  }

const eventProps = {"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}],"instrumentSections":[{"id":119,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T11:09:49.866Z","eventId":20,"instrumentName":"Violin","numToBook":1,"callOrder":"ordered","musicians":[{"id":270,"createdAt":"2022-10-03T12:36:30.338Z","updatedAt":"2022-10-03T12:38:19.070Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":119,"musician":{"name":"Tyler Hoppe"}},{"id":271,"createdAt":"2022-10-03T12:38:28.714Z","updatedAt":"2022-10-03T12:38:28.714Z","recieved":false,"accepted":null,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":119,"musician":{"name":"Benjamin Zieme"}},{"id":265,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T12:38:29.465Z","recieved":true,"accepted":false,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":119,"musician":{"name":"Kara Rau"}}]},{"id":120,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T11:21:14.648Z","eventId":20,"instrumentName":"Viola","numToBook":1,"callOrder":"ordered","musicians":[{"id":267,"createdAt":"2022-10-03T12:31:04.326Z","updatedAt":"2022-10-03T12:31:04.327Z","recieved":false,"accepted":null,"musicianEmail":"Ricky.Emard@yahoo.com","eventInstrumentId":120,"musician":{"name":"Mrs. Naomi Emmerich"}},{"id":266,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T12:31:05.059Z","recieved":true,"accepted":false,"musicianEmail":"Alexys.Bahringer@hotmail.com","eventInstrumentId":120,"musician":{"name":"Nina Kuhlman"}}]},{"id":121,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:08.704Z","eventId":20,"instrumentName":"Cello","numToBook":1,"callOrder":"ordered","musicians":[{"id":268,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:10.821Z","recieved":true,"accepted":null,"musicianEmail":"Karli.Rolfson@gmail.com","eventInstrumentId":121,"musician":{"name":"Jason Denesik"}}]},{"id":122,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:26.895Z","eventId":20,"instrumentName":"Double Bass","numToBook":1,"callOrder":"ordered","musicians":[{"id":269,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:27.828Z","recieved":true,"accepted":null,"musicianEmail":"Owen.Collins@hotmail.com","eventInstrumentId":122,"musician":{"name":"Justin Schulist"}}]}]}

describe("Event", () => {
  //it("Refresh button refreshes event data", () => {})
  //it("Calls can be exported to a player's diary, e.g. iPhone calendar", () => {})
  //it("Booked players are alerted when the event updates", () => {})
  //it("There is a section where the fixer has explained the update", () => {})
  //it("Fixer buttons not displayed if user is not the fixer", () => {})
  //it("Export Calls button exports event to CSV", () => {})
  //it("Edit Event button redirects to create event page with info filled in", () => {})
  //it("Shows Call venue on Google Maps")
  //it("Request Practice Parts btn")

  beforeEach(() => {
    render(<EventInfo 
      updatedAt={eventProps.updatedAt}
        createdAt={eventProps.createdAt}
        calls={eventProps.calls}
        additionalInfo={eventProps.additionalInfo}
        fee={eventProps.fee}
        dressCode={eventProps.dressCode}
        concertProgram={eventProps.concertProgram}
        ensembleName={eventProps.ensembleName}
        id={eventProps.id}
        fixerEmail={eventProps.fixerEmail} 
        session={mockSession} 
    />)
  })

  it("Fixing page renders", () => {
    const eventPageHeader = screen.getByTestId("event-header")
    expect(eventPageHeader).toBeInTheDocument()
  })
  it("Fixing buttons are displayed if user is the fixer", () => {
    const fixerEmail = screen.getByTestId("event-fixer-email")
    const fixerBtns = screen.getByTestId("fixer-btns-div")
    expect(fixerEmail).toHaveTextContent(/danielmolloy_6@icloud.com/)
    expect(fixerBtns).toBeInTheDocument()
  })
  it("Ensemble name displayed", () => {
    const ensembleName = screen.getByTestId("event-header")
    expect(ensembleName).toBeInTheDocument()
    expect(ensembleName.textContent).toMatch(eventProps.ensembleName)
  })
  it("Program displayed", () => {
    const eventProgram = screen.getByTestId('event-program')
    expect(eventProgram).toBeInTheDocument()
    expect(eventProgram.textContent).toMatch(eventProps.concertProgram)
  })
  it("Dress code displayed", () => {
    const eventDressCode = screen.getByTestId('event-dress')
    expect(eventDressCode).toBeInTheDocument()
    expect(eventDressCode.textContent).toMatch(eventProps.dressCode)
  })
  it("Fee displayed", () => {
    const eventFee = screen.getByTestId('event-fee')
    expect(eventFee).toBeInTheDocument()
    expect(eventFee.textContent).toMatch(eventProps.fee)
  })
  it("Additional Info displayed", () => {
    const eventAdditionalInfo = screen.getByTestId('event-additional-info')
    expect(eventAdditionalInfo).toBeInTheDocument()
    expect(eventAdditionalInfo.textContent).toMatch(eventProps.additionalInfo)
  })
  it("Fixer contact info displayed", () => {
    const eventFixerEmail = screen.getByTestId('event-fixer-email')
    expect(eventFixerEmail).toBeInTheDocument()
    expect(eventFixerEmail.textContent).toMatch(eventProps.fixerEmail)
  })
  it("Calls list displayed", () => {
    const callsList = screen.getByTestId('event-calls-list')
    expect(callsList).toBeInTheDocument()
  })
  it("Calls list shows count of calls", () => {
    const callsCount = screen.getByTestId('event-calls-count')
    expect(callsCount).toBeInTheDocument()
    const mockEventCallsCount = eventProps.calls.length
    expect(callsCount.textContent).toMatch(String(mockEventCallsCount))
  })
  it("Calls list call shows start time, end time and venue", () => {
    const callsList = screen.getByTestId('event-calls-list')
    expect(callsList).toBeInTheDocument()  
    expect(callsList).toHaveTextContent(/Mon Oct 24 2022 14:00to Mon Oct 24 2022 18:00/gi)
    expect(callsList).toHaveTextContent(/Fox n Firkin/gi)
  })
  it("'Created' Date displayed", () => {
    const createdAt = screen.getByTestId("created-datetime")
    expect(createdAt).toBeInTheDocument()
    const textContent = createdAt.textContent
    expect(textContent).toMatch(/^Event created on /)
    const strDate = textContent.slice(17) 
    const jsonDate = JSON.stringify(new Date(strDate)).slice(1, -9)
    expect(jsonDate).toEqual(JSON.stringify(eventProps.createdAt).slice(1, -9))
  })
  it("'Last Updated' date displayed", () => {
    const updatedAt = screen.getByTestId("updated-datetime")
    expect(updatedAt).toBeInTheDocument()
    const textContent = updatedAt.textContent
    expect(textContent).toMatch(/^Last updated on /)
    const strDate = textContent.slice(17) 
    const jsonDate = JSON.stringify(new Date(strDate)).slice(1, -9)
    expect(jsonDate).toEqual(JSON.stringify(eventProps.updatedAt).slice(1, -9))

  })
  it("Indicates if you are the fixer of the event", () => {
    expect(mockSession.user.email).toEqual(eventProps.fixerEmail)
    const fixerOptions = screen.getByTestId("fixer-btns-div")
    expect(fixerOptions).toBeInTheDocument()
  })
  //it("Indicates whether each call is confirmed", () => {})
})