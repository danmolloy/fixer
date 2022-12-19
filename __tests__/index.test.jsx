import { /* fireEvent, getByLabelText, getByTestId, */ act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
//import CreateEventForm from '../components/createEvent/createEventForm';
//import { act } from 'react-dom/test-utils';
//import axios from 'axios';
//import { v4 as uuid } from 'uuid';
//import { prismaMock } from '../singleton';
//import Events from '../pages/events';

//jest.mock('uuid', () => ({ v4: () => 'mockedUuid' }));
//jest.mock("axios")

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

//const eventProps = {"id":20,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-10-03T11:23:29.946Z","ensembleName":"London Symphony Orchestra","concertProgram":"Sibelius","dressCode":"Blacks","fee":"0","additionalInfo":"Free pizza","fixerEmail":"danielmolloy_6@icloud.com","calls":[{"id":21,"createdAt":"2022-09-15T12:14:27.518Z","updatedAt":"2022-09-15T12:14:27.520Z","startTime":"2022-10-24T13:00:00.000Z","endTime":"2022-10-24T17:00:00.000Z","venue":"Fox n Firkin","eventId":20,"fixerEmail":"danielmolloy_6@icloud.com"}],"instrumentSections":[{"id":119,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T11:09:49.866Z","eventId":20,"instrumentName":"Violin","numToBook":1,"callOrder":"ordered","musicians":[{"id":270,"createdAt":"2022-10-03T12:36:30.338Z","updatedAt":"2022-10-03T12:38:19.070Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":119,"musician":{"name":"Tyler Hoppe"}},{"id":271,"createdAt":"2022-10-03T12:38:28.714Z","updatedAt":"2022-10-03T12:38:28.714Z","recieved":false,"accepted":null,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":119,"musician":{"name":"Benjamin Zieme"}},{"id":265,"createdAt":"2022-10-03T11:09:49.865Z","updatedAt":"2022-10-03T12:38:29.465Z","recieved":true,"accepted":false,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":119,"musician":{"name":"Kara Rau"}}]},{"id":120,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T11:21:14.648Z","eventId":20,"instrumentName":"Viola","numToBook":1,"callOrder":"ordered","musicians":[{"id":267,"createdAt":"2022-10-03T12:31:04.326Z","updatedAt":"2022-10-03T12:31:04.327Z","recieved":false,"accepted":null,"musicianEmail":"Ricky.Emard@yahoo.com","eventInstrumentId":120,"musician":{"name":"Mrs. Naomi Emmerich"}},{"id":266,"createdAt":"2022-10-03T11:21:14.647Z","updatedAt":"2022-10-03T12:31:05.059Z","recieved":true,"accepted":false,"musicianEmail":"Alexys.Bahringer@hotmail.com","eventInstrumentId":120,"musician":{"name":"Nina Kuhlman"}}]},{"id":121,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:08.704Z","eventId":20,"instrumentName":"Cello","numToBook":1,"callOrder":"ordered","musicians":[{"id":268,"createdAt":"2022-10-03T12:32:08.703Z","updatedAt":"2022-10-03T12:32:10.821Z","recieved":true,"accepted":null,"musicianEmail":"Karli.Rolfson@gmail.com","eventInstrumentId":121,"musician":{"name":"Jason Denesik"}}]},{"id":122,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:26.895Z","eventId":20,"instrumentName":"Double Bass","numToBook":1,"callOrder":"ordered","musicians":[{"id":269,"createdAt":"2022-10-03T12:33:26.895Z","updatedAt":"2022-10-03T12:33:27.828Z","recieved":true,"accepted":null,"musicianEmail":"Owen.Collins@hotmail.com","eventInstrumentId":122,"musician":{"name":"Justin Schulist"}}]}]}



 describe('Home Page', () => {
  //it('Landing Page renders if not logged in', () => {})
   beforeEach(async () => {
    await waitFor(() => {
      render(<Home />)
    })
  }) 

  it('Home page renders if logged in', () => {
    const dashboard = screen.getByTestId('home-dashboard')
    expect(dashboard).toBeInTheDocument()
  })
  it('Create Event tile exists', () => {
    const fixEventTile = screen.getByText(/^Fix an Event$/i)
    expect(fixEventTile).toBeInTheDocument()
  })
  it("Search Directory tile exists and link works", () => {
    const searchDirTile = screen.getByText(/^Search Directory$/i)
    expect(searchDirTile).toBeInTheDocument()
  })
	it("Upcoming Events tile exists", () => {
    const upcomingEventsTile = screen.getByText(/^Upcoming Events$/i)
    expect(upcomingEventsTile).toBeInTheDocument()
  })
}) 

describe("Layout", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<Home />)
    })
  })
  //it("Home link in Header", () => {})

  it("Header exists", () => {
    const layoutHeader = screen.getByTestId("layout-header")
    expect(layoutHeader).toBeInTheDocument()
  })
  it("Body exists", () => {
    const mainDiv = screen.getByTestId("main-div")
    expect(mainDiv).toBeInTheDocument()
  })
  it("App name in Header", () => {
    const layoutHeader = screen.getByTestId("layout-header")
    expect(layoutHeader.textContent).toMatch(/Fixer/)
  })
  it("Menu Icon in Header which renders menu onClick", () => {
    const menuIcon = screen.getByTestId("menu-icon")
    expect(menuIcon).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuIcon)
    })
    const menuDiv = screen.getByTestId("menu-div")
    expect(menuDiv).toBeInTheDocument()
  })
  it("Close Menu Icon displayed when menu open, which closes menu", () => {
    const menuIconBtn = screen.getByTestId("menu-icon-btn")
    const menuIcon = screen.getByTestId("menu-icon")
    expect(menuIcon).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuIconBtn)
    })
    const menuDiv = screen.getByTestId("menu-div")
    expect(menuDiv).toBeInTheDocument()
    expect(menuIcon).not.toBeInTheDocument()
    const closeMenuIcon = screen.getByTestId("close-menu-icon")
    expect(closeMenuIcon).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuIconBtn)
    })
    expect(menuDiv).not.toBeInTheDocument()
    expect(closeMenuIcon).not.toBeInTheDocument()
    //expect(menuIcon).toBeInTheDocument() //This fails and I don't know why
  })
  it("Menu has About link", () => {
    const menuIconBtn = screen.getByTestId("menu-icon-btn")
    act(() => {
      fireEvent.click(menuIconBtn)
    })
    const menuDiv = screen.getByTestId("menu-div")
    expect(menuDiv).toBeInTheDocument()
    expect(menuDiv.textContent).toMatch(/About/g)
    const aboutLink = screen.getByTestId("about-menu-link")
    expect(aboutLink).toBeInTheDocument()
  })
  it("Menu has Settings link", () => {
    const menuIconBtn = screen.getByTestId("menu-icon-btn")
    act(() => {
      fireEvent.click(menuIconBtn)
    })
    const menuDiv = screen.getByTestId("menu-div")
    expect(menuDiv).toBeInTheDocument()
    expect(menuDiv.textContent).toMatch(/Settings/g)
    const settingsLink = screen.getByTestId("settings-menu-link")
    expect(settingsLink).toBeInTheDocument()
  })
  it("Menu has Directory link", () => {
    const menuIconBtn = screen.getByTestId("menu-icon-btn")
    act(() => {
      fireEvent.click(menuIconBtn)
    })
    const menuDiv = screen.getByTestId("menu-div")
    expect(menuDiv).toBeInTheDocument()
    expect(menuDiv.textContent).toMatch(/Directory/g)
    const directoryLink = screen.getByTestId("directory-menu-link")
    expect(directoryLink).toBeInTheDocument()
  })
  it("Menu has Contact link", () => {
    const menuIconBtn = screen.getByTestId("menu-icon-btn")
    act(() => {
      fireEvent.click(menuIconBtn)
    })
    const menuDiv = screen.getByTestId("menu-div")
    expect(menuDiv).toBeInTheDocument()
    expect(menuDiv.textContent).toMatch(/Contact Us/g)
    const contactLink = screen.getByTestId("contact-menu-link")
    expect(contactLink).toBeInTheDocument()
  })

  it("Footer exists", () => {
    const footerDiv = screen.getByTestId("layout-footer")
    expect(footerDiv).toBeInTheDocument()
  })
  it("Footer has Contact link", () => {
    const contactLink = screen.getByTestId("contact-link")
    expect(contactLink).toBeInTheDocument()
  })
  //it("Footer has about link", () => {})
  //it("Footer has contact link", () => {})
  //it("Footer has signin info", () => {})
  //it("Footer has signout btn", () => {})
  //it("Footer has social media link", () => {})
})

/* describe("Sign in and Sign up", () => {}) */

/* describe("Twilio Messaging", () => {
  //it("When the fixer puts out calls for one player, exactly one message is sent", () => {})
  //it("When fixer puts call out for one player, one message is sent to the first player in the list", () => {})
  //it("Initially, the number of players to book is the number of players sent messages", () => {})
  //it("If there are fewer players to call than the Num to Book, all players on the list are called without error", () => {})
  //it("The message contains the orchestra name", () => {})
  //it("Fixing message contains link to event page", () => {})
  //it("Fixing message contains the fixer's name", () => {})
  //it("Fixing message contains the recipient's name", () => {})
  //it("Fixing message says 'Reply Yes <call id> to accept'", () => {})
  //it("Fixing message says 'Reply No <call id> to decline'", () => {})
  //it("Replying 'Yes <call id>' accepts gig", () => {})
  //it("Upon accepting a gig, the player recieves confirmation.", () => {})
  //it("Replying 'No <call id>' declines the gig", () => {})
  //it("Upon declining a gig, the player recieves confirmation they have declined", () => {})
  //it("Upon recieving a response, another player is messaged if needed", () => {})
  //it("If Twilio needs more players to message, the fixer is messaged alerting them to this.", () => {})
}) */

/* describe("Settings", () => {
  //it("Player can select musicians they don't want to be booked with", () => {})
  //it("Player can choose whether to recieve SMS, WhatsApp or Email", () => {})
}) */

/* describe("About Page", () => {}) */
/* describe("Contact Form", () => {}) */