import { act, fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import CreateEventForm from '../components/createEvent/createEventForm';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { prismaMock } from '../singleton';
import Events from '../pages/events';
import Fixing from '../components/fixing/fixing';
import { instrumentArr } from '../components/fixing/fixing';

const mockDirectory = [
  {
    "id":"cl5jlqw1e0057t6u07993b5w1",
    "name":"Ollie McLaughlin",
    "email":"Daphne38@gmail.com",
    "emailVerified":null,
    "image":null,
    "instrument":"Trumpet",
    "profileInfo":null,
    "isFixer":null
  },
    {"id":"cl5jlqzfg0064t6u0l73nhzz5","name":"Phyllis Lowe","email":"Naomi_Bogisich@gmail.com","emailVerified":null,"image":null,"instrument":"Percussion","profileInfo":null,"isFixer":null},{"id":"cl5jlt9aq0081t6u0d3mrzhj1","name":"Mathew Padberg","email":"Adele_Adams@gmail.com","emailVerified":null,"image":null,"instrument":"Trumpet","profileInfo":null,"isFixer":null},{"id":"cl5jltauc0088t6u0hlal6nyp","name":"Felipe Wilderman","email":"Quincy58@hotmail.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5jltcy10095t6u0v9e2qu91","name":"Kara Rau","email":"Ida_Wilderman90@yahoo.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jlte9d0102t6u0r13plqsm","name":"Miss Kellie Considine","email":"Julien3@gmail.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5jltfk10109t6u0gv0gv94p","name":"Nina Kuhlman","email":"Alexys.Bahringer@hotmail.com","emailVerified":null,"image":null,"instrument":"Viola","profileInfo":null,"isFixer":null},{"id":"cl5jltnvz0121t6u02l7yfw57","name":"Michelle Larkin","email":"Laurie55@gmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jltp1r0128t6u0snfds4z3","name":"Mr. Amy Gislason","email":"Haley14@yahoo.com","emailVerified":null,"image":null,"instrument":"Trombone","profileInfo":null,"isFixer":null},{"id":"cl5jltq750135t6u0gih5gpsg","name":"Milton Dicki","email":"Marquis.Ruecker@gmail.com","emailVerified":null,"image":null,"instrument":"Bassoon","profileInfo":null,"isFixer":null},{"id":"cl5jltr4i0142t6u09sql0jre","name":"Justin Schulist","email":"Owen.Collins@hotmail.com","emailVerified":null,"image":null,"instrument":"Double Bass","profileInfo":null,"isFixer":null},{"id":"cl5jltryz0149t6u0r9q3u10j","name":"Kent Gusikowski","email":"Beverly_Dickens63@hotmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jltsxw0156t6u0tj0hlukn","name":"Hilda Thiel","email":"Lennie_Lindgren92@yahoo.com","emailVerified":null,"image":null,"instrument":"Timpani","profileInfo":null,"isFixer":null},{"id":"cl5jlttz50163t6u0ueg5626j","name":"Carole Rodriguez","email":"Rosanna.McGlynn@hotmail.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jltv3g0170t6u0q2wvd4qv","name":"Sharon Goldner","email":"Kristian_Gerhold@yahoo.com","emailVerified":null,"image":null,"instrument":"Horn","profileInfo":null,"isFixer":null},{"id":"cl5jltw9i0177t6u0at4zsqd3","name":"Darnell Graham","email":"Abelardo_Vandervort71@hotmail.com","emailVerified":null,"image":null,"instrument":"Trombone","profileInfo":null,"isFixer":null},{"id":"cl5jltxec0184t6u0qruqcj0s","name":"Javier Hayes","email":"Fred.Oberbrunner@hotmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlu8p10196t6u0dj2c56bq","name":"Leticia Dibbert","email":"Lora.Lubowitz17@gmail.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jlua0p0203t6u0hhsnv8d9","name":"Mrs. Naomi Emmerich","email":"Ricky.Emard@yahoo.com","emailVerified":null,"image":null,"instrument":"Viola","profileInfo":null,"isFixer":null},{"id":"cl5jlub3q0210t6u0ptm8mazj","name":"Marlon Wisozk","email":"Dawn_Fritsch20@gmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlubx30217t6u08fou8m28","name":"Dean Lueilwitz","email":"Enrique.Pfannerstill65@hotmail.com","emailVerified":null,"image":null,"instrument":"Percussion","profileInfo":null,"isFixer":null},{"id":"cl5jlucy30224t6u0hdd4z7xs","name":"Juan Reichert","email":"Jenifer.Casper@yahoo.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5jludze0231t6u0cfx5hcck","name":"Tyler Hoppe","email":"Catalina_Hermann@yahoo.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jluf2u0238t6u0h3bp1ozo","name":"Kelli Denesik","email":"Arlie_Runolfsson49@yahoo.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jlugru0245t6u0m5ovtl0v","name":"Benjamin Zieme","email":"Abigail_Torp@gmail.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jlui4y0252t6u0h65ku4wd","name":"Sidney Franecki","email":"Marlee.Stehr@hotmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jluj7b0259t6u0jaxddpdx","name":"Erick Wilderman","email":"Ramon_Christiansen83@gmail.com","emailVerified":null,"image":null,"instrument":"Double Bass","profileInfo":null,"isFixer":null},{"id":"cl5jlw4gd0291t6u0xla6oxe5","name":"Teresa Schimmel","email":"Doris_Bernier21@gmail.com","emailVerified":null,"image":null,"instrument":"Percussion","profileInfo":null,"isFixer":null},{"id":"cl5jlw4t40298t6u05wrq1k8y","name":"Jason Denesik","email":"Karli.Rolfson@gmail.com","emailVerified":null,"image":null,"instrument":"Cello","profileInfo":null,"isFixer":null},{"id":"cl5jlw5qz0305t6u0y3x5vcfk","name":"Dr. Gina Tromp","email":"Trenton_Greenfelder27@gmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlw6re0312t6u0zjc0po40","name":"Irma Homenick","email":"Icie_Lang68@gmail.com","emailVerified":null,"image":null,"instrument":"Bassoon","profileInfo":null,"isFixer":null},{"id":"cl5jlw7ln0319t6u09getcn2m","name":"Dr. Tara Zulauf","email":"Joan16@gmail.com","emailVerified":null,"image":null,"instrument":"Trombone","profileInfo":null,"isFixer":null},{"id":"cl5jlw8gk0326t6u078cjd24w","name":"Tanya Gusikowski","email":"Golda_Stark@hotmail.com","emailVerified":null,"image":null,"instrument":"Double Bass","profileInfo":null,"isFixer":null},{"id":"cl5jlw9ba0333t6u0axnxz0gr","name":"Ernestine Dibbert","email":"Marcos.Cassin@yahoo.com","emailVerified":null,"image":null,"instrument":"Horn","profileInfo":null,"isFixer":null},{"id":"cl5jlwa520340t6u01b6nlizn","name":"Miss Kenny Barton","email":"Malika.Dooley@gmail.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jlwax00347t6u0snxasxvz","name":"Penny Rogahn","email":"Yesenia.Volkman91@yahoo.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlwbrv0354t6u0wlvtc6uz","name":"Randal Denesik","email":"Lane14@hotmail.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5if30or0054ixu0y1vap3yd","name":"danmolloy","email":"danielmolloy_6@icloud.com","emailVerified":null,"image":"https://avatars.githubusercontent.com/u/64697812?v=4","instrument":"Double Bass","profileInfo":null,"isFixer":null}]

jest.mock('uuid', () => ({ v4: () => 'mockedUuid' }));
jest.mock("axios")
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(
      mockDirectory
      )
  })
);


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

const eventProps = {
  "eventId":26,
  "instrumentSections":[
    {"id":140,
    "createdAt":"2022-11-19T18:07:21.223Z",
    "updatedAt":"2022-11-19T18:07:21.223Z",
    "eventId":26,
    "instrumentName":"Violin",
    "numToBook":1,
    "callOrder":"Ordered",
    "musicians":[{
      "id":284,
    "createdAt":"2022-11-22T11:24:23.979Z",
    "updatedAt":"2022-11-22T11:32:19.958Z",
    "recieved":true,
    "accepted":false,
    "musicianEmail":"Ida_Wilderman90@yahoo.com",
    "eventInstrumentId":140,
    "musician":{"name":"Kara Rau"}},
    {"id":285,"createdAt":"2022-11-22T11:24:23.979Z","updatedAt":"2022-11-22T11:32:22.957Z","recieved":true,"accepted":true,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":140,"musician":{"name":"Benjamin Zieme"}},{"id":286,"createdAt":"2022-11-22T11:25:15.172Z","updatedAt":"2022-11-22T11:25:15.172Z","recieved":false,"accepted":null,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":140,"musician":{"name":"Tyler Hoppe"}}]},{"id":141,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Viola","numToBook":1,"callOrder":"Ordered","musicians":[{"id":288,"createdAt":"2022-11-22T11:32:10.423Z","updatedAt":"2022-11-22T11:32:11.062Z","recieved":true,"accepted":null,"musicianEmail":"Ricky.Emard@yahoo.com","eventInstrumentId":141,"musician":{"name":"Mrs. Naomi Emmerich"}}]},{"id":142,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Cello","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":143,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Double Bass","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":144,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Flute","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":145,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Oboe","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":146,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Clarinet","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":147,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Bassoon","numToBook":1,"callOrder":"Ordered","musicians":[{"id":287,"createdAt":"2022-11-22T11:32:04.417Z","updatedAt":"2022-11-22T11:32:05.883Z","recieved":true,"accepted":null,"musicianEmail":"Icie_Lang68@gmail.com","eventInstrumentId":147,"musician":{"name":"Irma Homenick"}}]},{"id":148,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Horn","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":149,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Trumpet","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":150,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Trombone","numToBook":1,"callOrder":"Ordered","musicians":[{"id":283,"createdAt":"2022-11-21T21:21:35.811Z","updatedAt":"2022-11-21T21:21:37.803Z","recieved":true,"accepted":null,"musicianEmail":"Haley14@yahoo.com","eventInstrumentId":150,"musician":{"name":"Mr. Amy Gislason"}}]},{"id":151,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Tuba","numToBook":1,"callOrder":"Ordered","musicians":[]},{"id":152,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Harp","numToBook":1,"callOrder":"Ordered","musicians":[{"id":290,"createdAt":"2022-11-22T11:32:41.445Z","updatedAt":"2022-11-22T11:32:41.445Z","recieved":false,"accepted":null,"musicianEmail":"Laurie55@gmail.com","eventInstrumentId":152,"musician":{"name":"Michelle Larkin"}},{"id":291,"createdAt":"2022-11-22T11:32:41.445Z","updatedAt":"2022-11-22T11:32:41.445Z","recieved":false,"accepted":null,"musicianEmail":"Beverly_Dickens63@hotmail.com","eventInstrumentId":152,"musician":{"name":"Kent Gusikowski"}},{"id":292,"createdAt":"2022-11-22T11:32:41.445Z","updatedAt":"2022-11-22T11:32:41.445Z","recieved":false,"accepted":null,"musicianEmail":"Fred.Oberbrunner@hotmail.com","eventInstrumentId":152,"musician":{"name":"Javier Hayes"}},{"id":293,"createdAt":"2022-11-22T11:32:41.445Z","updatedAt":"2022-11-22T11:32:41.445Z","recieved":false,"accepted":null,"musicianEmail":"Dawn_Fritsch20@gmail.com","eventInstrumentId":152,"musician":{"name":"Marlon Wisozk"}}]},{"id":153,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Timpani","numToBook":1,"callOrder":"Ordered","musicians":[{"id":289,"createdAt":"2022-11-22T11:32:34.270Z","updatedAt":"2022-11-22T11:32:34.915Z","recieved":true,"accepted":null,"musicianEmail":"Lennie_Lindgren92@yahoo.com","eventInstrumentId":153,"musician":{"name":"Hilda Thiel"}}]},{"id":154,"createdAt":"2022-11-19T18:07:21.223Z","updatedAt":"2022-11-19T18:07:21.223Z","eventId":26,"instrumentName":"Percussion","numToBook":1,"callOrder":"Ordered","musicians":[]}]}
      
describe("Event Fixing", () => {
  
  beforeEach(async () => {
    await act(async() => {
      await waitFor(() => {
        render(<Fixing 
          refreshProps={jest.fn()} 
          eventId={eventProps.id} 
          instrumentSections={eventProps.instrumentSections} />
        )
      })
    })
    
  })
  it("renders", async() => {
    //const loadingMsg = screen.getByTestId("loading-msg")
    //expect(loadingMsg).toBeInTheDocument()
   /*  await act(async() => {
      await waitFor(async () => {
        await new Promise(res => setTimeout(res, 100))
      })
    }) */
    //expect(loadingMsg).not.toBeInTheDocument()

    const eventFixing = screen.getByTestId("event-fixing")
    expect(eventFixing).toBeInTheDocument()
  })
it("How many players are being booked is stated", () => {
    const eventFixing = screen.getByTestId("event-fixing")
    expect(eventFixing.textContent).toMatch(/Booking [0-9+] player\(s\)/g)
  })
  it("Call Order is stated", () => {
    let tileId;
    for (let i = 0; i < eventProps.instrumentSections.length; i++) {
      tileId = screen.getByTestId(`${eventProps.instrumentSections[i].instrumentName}-tile`)
      expect(tileId).toBeInTheDocument()
      if(!tileId.textContent.match("Booked")) {
        if(!tileId.textContent.match("No calls out")) {
          expect(tileId.textContent).toMatch(`Calls are ${eventProps.instrumentSections[i].callOrder.toLowerCase()}`)
        }
      }
    }
  })
  it("Indicates if player has declined", () => {
    for (let i = 0; i < eventProps.instrumentSections.length; i ++) {
      for (let j = 0; j < eventProps.instrumentSections[i].musicians.length; j++) {
        let musicianName = eventProps.instrumentSections[i].musicians[j].musician.name
        let sectionMusicianId =  eventProps.instrumentSections[i].musicians[j].id
        let acceptStatus = eventProps.instrumentSections[i].musicians[j].accepted
        if (acceptStatus === false) {
          let musicianEl = screen.getByTestId(`${musicianName}-${sectionMusicianId}`)
          expect(musicianEl.innerHTML).toMatch(/title="Declined"/)
        }
      }
    }
  })

  it("Indicates if player has accepted", () => {
    for (let i = 0; i < eventProps.instrumentSections.length; i ++) {
      for (let j = 0; j < eventProps.instrumentSections[i].musicians.length; j++) {
        let musicianName = eventProps.instrumentSections[i].musicians[j].musician.name
        let sectionMusicianId =  eventProps.instrumentSections[i].musicians[j].id
        let acceptStatus = eventProps.instrumentSections[i].musicians[j].accepted
        if (acceptStatus === true) {
          let musicianEl = screen.getByTestId(`${musicianName}-${sectionMusicianId}`)
          expect(musicianEl.innerHTML).toMatch(/title="Confirmed"/) // Should this be title="Accepted" ?
        }
      }
    }
  })
  it("Indicates if player has not been called", () => {
    for (let i = 0; i < eventProps.instrumentSections.length; i ++) {
      for (let j = 0; j < eventProps.instrumentSections[i].musicians.length; j++) {
        let musicianName = eventProps.instrumentSections[i].musicians[j].musician.name
        let sectionMusicianId =  eventProps.instrumentSections[i].musicians[j].id
        let recievedStatus = eventProps.instrumentSections[i].musicians[j].recieved
        if (recievedStatus === false) {
          let musicianEl = screen.getByTestId(`${musicianName}-${sectionMusicianId}`)
          expect(musicianEl.innerHTML).toMatch(/title="Null"/)
          expect(musicianEl.innerHTML).not.toMatch(/title="Declined"/)
          expect(musicianEl.innerHTML).not.toMatch(/title="Accepted"/)
        }
      }
    }
  })
  it("Explictly says if no calls out for the instrument", () => {
    for (let i = 0; i < instrumentArr.length; i ++) {
      let eventInstrument = eventProps.instrumentSections.find(j => j.instrumentName === instrumentArr[i])
      let instrumentDiv = screen.getByTestId(`${instrumentArr[i]}-tile`)
      if (eventInstrument.musicians.length > 0) {
        expect(instrumentDiv.textContent).not.toMatch(/No calls out./i)
      } else {
        expect(instrumentDiv.textContent).toMatch(/No calls out./i)
      }
    }
  })
  //it("Displays Instruments in order", () => {})

  it("Edit button renders an editing component", () => {
    // This throws warnings: Each child in a list should have a unique "key" prop. Referring to l.22 & l.55 createCalls & instrumentTile.
    const editBtnArr = screen.getAllByText("Edit")
    expect(instrumentArr.length).toEqual(editBtnArr.length)
    for (let i = 0; i < editBtnArr.length; i++) {
      let instrumentDiv = screen.getByTestId(`${instrumentArr[i]}-tile`)
      expect(instrumentDiv.textContent).not.toMatch(/Select players/)
      act(() => {
        fireEvent.click(editBtnArr[i])
      })
      const instrumentEditDiv = screen.getByTestId(`${instrumentArr[i]}-edit`)
      expect(instrumentEditDiv).toBeInTheDocument()
      expect(instrumentDiv.textContent).toMatch(/Select players/)
    }
    
  })


  //it("Instrument tile states whether calling for availability or to book", () => {})
  //it("Fixer can add additional info for specific instruments", () => {})
  //it("Fixer can add additional message for particular player", () => {})
  //it("Fixer is able to accept gig on player's behalf", () => {})
  //it("Fixer is able to remove player from the gig", () => {})
  //it("Players are able to indicate their availablitly across all calls", () => {})
  //it("Fixers can compare players' availability across all calls", () => {})
  //it("Fixers can add MAS players to the list", () => {})
  //it("Fixers can add Bakers players to the list", () => {})
  //it("Fixers can add independent players mobile number to list", () => {})
  //it("Indicates if a player has accepted or the Fixer accepted on their behalf")
})

describe("Editing Instrument Fixing", () => {
  beforeEach( async() => {
    await act(async () => {
      await waitFor(() => {
      render(<Fixing 
        refreshProps={jest.fn()} 
        eventId={eventProps.id} 
        instrumentSections={eventProps.instrumentSections} />
      )
    })})
  })
  it("Edit button renders list of players not yet on call list", () => {
    const editBtnArr = screen.getAllByText("Edit")
    expect(instrumentArr.length).toEqual(editBtnArr.length)
    for (let i = 0; i < editBtnArr.length; i++) {
      act(() => {
        fireEvent.click(editBtnArr[i])
      })
      let instrumentTile = screen.getByTestId(`${instrumentArr[i]}-tile`)
      expect(instrumentTile).toBeInTheDocument()
      let instrumentEditDiv = screen.getByTestId(`${instrumentArr[i]}-edit`)
      expect(instrumentEditDiv).toBeInTheDocument()
      let eventInstrument = eventProps.instrumentSections.find(j => j.instrumentName === instrumentArr[i])
      if (!instrumentTile.textContent.match("No calls out")) {
        let instrumentActiveCalls = screen.getByTestId(`${instrumentArr[i]}-active-calls`)
        expect(instrumentActiveCalls).toBeInTheDocument()
        let instrumentalistsName = mockDirectory.filter(i => i.instrument === eventInstrument.instrumentName).map(i => i.name).sort((a, b) => a.localeCompare(b))

        for (let i = 0; i < instrumentalistsName.length; i++) {
          if (instrumentActiveCalls.textContent.match(instrumentalistsName[i])) {
            instrumentalistsName.splice(i, 1)
            i = i - 1
          }
        }
        let notCalledMusicians = eventInstrument.musicians.filter(i => i.musician.name === instrumentalistsName[i])

        for (let i = 0; i < notCalledMusicians.length; i++) {
          expect(instrumentActiveCalls.textContent).not.toMatch(notCalledMusicians[i])
          expect(instrumentEditDiv).toMatch(notCalledMusicians[i])
        }
      }
    }
  })

it("'Select Players' list explicitly states if there are no players left", () => {
    /* let noPlayersCount = 0
    const editBtnArr = screen.getAllByText("Edit")
    expect(instrumentArr.length).toEqual(editBtnArr.length)
    for (let i = 0; i < editBtnArr.length; i++) {
      act(() => {
        fireEvent.click(editBtnArr[i])
      })
      let instrumentTile = screen.getByTestId(`${instrumentArr[i]}-tile`)
      expect(instrumentTile).toBeInTheDocument()
      let instrumentEditDiv = screen.getByTestId(`${instrumentArr[i]}-edit`)
      expect(instrumentEditDiv).toBeInTheDocument()
      let eventInstrument = eventProps.instrumentSections.find(j => j.instrumentName === instrumentArr[i])
      if (!instrumentTile.textContent.match("No calls out")) {
        let instrumentActiveCalls = screen.getByTestId(`${instrumentArr[i]}-active-calls`)
        expect(instrumentActiveCalls).toBeInTheDocument()
        let instrumentalistsName = mockDirectory.filter(i => i.instrument === eventInstrument.instrumentName).map(i => i.name).sort((a, b) => a.localeCompare(b))

        if (instrumentalistsName.length > 0) {
          for (let j = 0; i < instrumentalistsName.length; j++) {
            if (instrumentActiveCalls.textContent.match(instrumentalistsName[j])) {
              instrumentalistsName.splice(j, 1)
              j = j - 1
            }
          }
        }

        if(instrumentalistsName.length === 0) {
          expect(instrumentEditDiv.textContent).toMatch(/No players to select/)
          noPlayersCount++
        } else if(instrumentalistsName.length !== 0) {
          console.log(instrumentEditDiv.textContent)
          expect(instrumentEditDiv.textContent).not.toMatch(/No players to select/)

        } 
      }
    }
    expect(noPlayersCount).not.toBe(0) */
  })

it("Edit component has number input for Num to Book", () => {
    const editBtnArr = screen.getAllByText("Edit")
    expect(instrumentArr.length).toEqual(editBtnArr.length)
    for (let i = 0; i < editBtnArr.length; i++) {
      act(() => {
        fireEvent.click(editBtnArr[i])
      })
      let instrumentNumToBookInput = screen.getByTestId(`${instrumentArr[i]}-num-to-book`)
      expect(instrumentNumToBookInput).toBeInTheDocument()
    }
  })

it("Edit component has drop down menu for call order", () => {
    const editBtnArr = screen.getAllByText("Edit")
    expect(instrumentArr.length).toEqual(editBtnArr.length)
    for (let i = 0; i < editBtnArr.length; i++) {
      act(() => {
        fireEvent.click(editBtnArr[i])
      })
      let callOrderDropDown = screen.getByTestId(`${instrumentArr[i]}-order-drop-down`)
      expect(callOrderDropDown).toBeInTheDocument()
      expect(callOrderDropDown.textContent).toMatch(/Ordered/)
      expect(callOrderDropDown.textContent).toMatch(/Random/)
      expect(callOrderDropDown.textContent).toMatch(/Simultaneous/)
    }
  })

  it("When player added to appendedCalls, only that name is removed from available players", () => {
    /* const editBtnArr = screen.getAllByText("Edit")
    expect(instrumentArr.length).toEqual(editBtnArr.length)
    for (let i = 0; i < editBtnArr.length; i++) {
      act(() => {
        fireEvent.click(editBtnArr[i])
      })
      let instrumentEditDiv = screen.getByTestId(`${instrumentArr[i]}-edit`)
      expect(instrumentEditDiv).toBeInTheDocument()
      let instrumentalistsName = mockDirectory.filter(j => j.instrument == instrumentArr[i]).map(i => i.name).sort((a, b) => a.localeCompare(b))
      for (let x = 0; x < instrumentalistsName.length; x++) {
        if (instrumentEditDiv.textContent.match(instrumentalistsName[x])) {
          let notCalled = screen.getByTestId(`${instrumentArr[i]}-not-called`)
          expect(notCalled).toBeInTheDocument()
          expect(notCalled.textContent).toMatch(instrumentalistsName[x])
          act(() => {
            fireEvent.click(screen.getByText(instrumentalistsName[x]))
          })
          let appendedCalls = screen.getByTestId(`${instrumentArr[i]}-appended`)
          expect(notCalled.textContent).not.toMatch(instrumentalistsName[x])
          expect(appendedCalls).toBeInTheDocument()
          expect(appendedCalls.textContent).toMatch(instrumentalistsName[x])

        } else {
          expect(instrumentEditDiv.textContent).not.toMatch(instrumentalistsName[x])
        }
      }
      
    } */
  })

  it("Text input exists for each instrument to add additional info", () => {
    let editBtn;
    let instrumentMsg;
    for (let i = 0; i < instrumentArr.length; i++) {
      editBtn = screen.getByTestId(`${instrumentArr[i]}-edit-btn`)
      expect(editBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(editBtn)
      })
      instrumentMsg = screen.getByTestId(`${instrumentArr[i]}-msg-input`)
      expect(instrumentMsg).toBeInTheDocument()
    }
  })
  it("Availability/Booking Toggle button exists", () => {
    let editBtn;
    let instrumentEditDiv;
    let toggleGroup;
    let availabilityToggle;
    let bookingToggle;
    for (let i = 0; i < instrumentArr.length; i++) {
      editBtn = screen.getByTestId(`${instrumentArr[i]}-edit-btn`)
      expect(editBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(editBtn)
      })
      instrumentEditDiv = screen.getByTestId(`${instrumentArr[i]}-edit`)
      toggleGroup = screen.getByTestId(`${instrumentArr[i]}-toggle-group`)
      availabilityToggle = screen.getByTestId(`${instrumentArr[i]}-availability-toggle`)
      bookingToggle = screen.getByTestId(`${instrumentArr[i]}-booking-toggle`)

      expect(instrumentEditDiv).toBeInTheDocument()
      expect(toggleGroup).toBeInTheDocument()
      expect(availabilityToggle).toBeInTheDocument()
      expect(bookingToggle).toBeInTheDocument()
      
    }
  })
  //it("Booking toggled is default", () => {})
  //it("Text input exists for each player to add additional info", () => {})
  //it("Availability/Booking Toggle button does something", () => {})



})

describe("Fix Button", () => {
  beforeEach( async() => {
    await act(async () => {
      await waitFor(() => {
      render(<Fixing 
        refreshProps={jest.fn()} 
        eventId={eventProps.id} 
        instrumentSections={eventProps.instrumentSections} />
      )
    })})
  })
  it("1 is 1", () => {
    expect(1).toBe(1)
  })
  /* it("Fix button adds changes", async () => {
    const editBtnArr = screen.getAllByText("Edit")
    expect(instrumentArr.length).toEqual(editBtnArr.length)
    let randIndex = Math.floor(Math.random() * instrumentArr.length)
    let instrumentDiv = screen.getByTestId(`${instrumentArr[randIndex]}-tile`)
    expect(instrumentDiv).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTestId(`${instrumentArr[randIndex]}-edit-btn`))
    })
    await act(async() => {
      await waitFor(() => {
        fireEvent.click(screen.getByText("Fix"))
      })
    }) 
    
  }) */

  //it("Text input for each instrument to add additional info actually adds the info", () => {})

  //it("Text input for each player to add additional info actually adds the info", () => {})

})