import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import EventsIndex from "../../components/upcomingEvents/eventsIndex";
import moment from "moment";


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

describe("EventsIndex component", () => {
  beforeEach(() => {
    render(<EventsIndex />)
  })
  it("Renders", () => {
    const eventsIndex = screen.getByTestId("events-index-div")
    expect(eventsIndex).toBeInTheDocument()
  })
  it("Date picker Calendar is in the document", () => {
    const calendar = screen.getByTestId("date-picker-div")
    expect(calendar).toBeInTheDocument()
  })
  it("Events Dashboard is in the document", () => {
    const dashboard = screen.getByTestId('event-dashboard-div')
    expect(dashboard).toBeInTheDocument()
  })
  it("Default view is All Upcoming Events", () => {
    const viewAllUpcoming = screen.getByTestId("upcoming-events-div")
    expect(viewAllUpcoming).toBeInTheDocument()
  })
  //it("Week view btn renders week view", () => {})
})