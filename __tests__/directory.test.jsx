import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import PlayerDirectory from "../components/directory/playerDirectory"
import '@testing-library/jest-dom'
import { instrumentArr } from '../components/fixing/fixing';

jest.mock("next/link", () => {
  return ({children}) => {
      return children;
  }
}); 

const mockDirectory = [
  {"id":"cl5jlqw1e0057t6u07993b5w1",
  "name":"Ollie McLaughlin",
  "email":"Daphne38@gmail.com",
  "emailVerified":null,
  "image":null,
  "instrument":"Trumpet",
  "profileInfo":null,
  "isFixer":null},
  {"id":"cl5jlqzfg0064t6u0l73nhzz5","name":"Phyllis Lowe","email":"Naomi_Bogisich@gmail.com","emailVerified":null,"image":null,"instrument":"Percussion","profileInfo":null,"isFixer":null},{"id":"cl5jlt9aq0081t6u0d3mrzhj1","name":"Mathew Padberg","email":"Adele_Adams@gmail.com","emailVerified":null,"image":null,"instrument":"Trumpet","profileInfo":null,"isFixer":null},{"id":"cl5jltauc0088t6u0hlal6nyp","name":"Felipe Wilderman","email":"Quincy58@hotmail.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5jltcy10095t6u0v9e2qu91","name":"Kara Rau","email":"Ida_Wilderman90@yahoo.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jlte9d0102t6u0r13plqsm","name":"Miss Kellie Considine","email":"Julien3@gmail.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5jltfk10109t6u0gv0gv94p","name":"Nina Kuhlman","email":"Alexys.Bahringer@hotmail.com","emailVerified":null,"image":null,"instrument":"Viola","profileInfo":null,"isFixer":null},{"id":"cl5jltnvz0121t6u02l7yfw57","name":"Michelle Larkin","email":"Laurie55@gmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jltp1r0128t6u0snfds4z3","name":"Mr. Amy Gislason","email":"Haley14@yahoo.com","emailVerified":null,"image":null,"instrument":"Trombone","profileInfo":null,"isFixer":null},{"id":"cl5jltq750135t6u0gih5gpsg","name":"Milton Dicki","email":"Marquis.Ruecker@gmail.com","emailVerified":null,"image":null,"instrument":"Bassoon","profileInfo":null,"isFixer":null},{"id":"cl5jltr4i0142t6u09sql0jre","name":"Justin Schulist","email":"Owen.Collins@hotmail.com","emailVerified":null,"image":null,"instrument":"Double Bass","profileInfo":null,"isFixer":null},{"id":"cl5jltryz0149t6u0r9q3u10j","name":"Kent Gusikowski","email":"Beverly_Dickens63@hotmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jltsxw0156t6u0tj0hlukn","name":"Hilda Thiel","email":"Lennie_Lindgren92@yahoo.com","emailVerified":null,"image":null,"instrument":"Timpani","profileInfo":null,"isFixer":null},{"id":"cl5jlttz50163t6u0ueg5626j","name":"Carole Rodriguez","email":"Rosanna.McGlynn@hotmail.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jltv3g0170t6u0q2wvd4qv","name":"Sharon Goldner","email":"Kristian_Gerhold@yahoo.com","emailVerified":null,"image":null,"instrument":"Horn","profileInfo":null,"isFixer":null},{"id":"cl5jltw9i0177t6u0at4zsqd3","name":"Darnell Graham","email":"Abelardo_Vandervort71@hotmail.com","emailVerified":null,"image":null,"instrument":"Trombone","profileInfo":null,"isFixer":null},{"id":"cl5jltxec0184t6u0qruqcj0s","name":"Javier Hayes","email":"Fred.Oberbrunner@hotmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlu8p10196t6u0dj2c56bq","name":"Leticia Dibbert","email":"Lora.Lubowitz17@gmail.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jlua0p0203t6u0hhsnv8d9","name":"Mrs. Naomi Emmerich","email":"Ricky.Emard@yahoo.com","emailVerified":null,"image":null,"instrument":"Viola","profileInfo":null,"isFixer":null},{"id":"cl5jlub3q0210t6u0ptm8mazj","name":"Marlon Wisozk","email":"Dawn_Fritsch20@gmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlubx30217t6u08fou8m28","name":"Dean Lueilwitz","email":"Enrique.Pfannerstill65@hotmail.com","emailVerified":null,"image":null,"instrument":"Percussion","profileInfo":null,"isFixer":null},{"id":"cl5jlucy30224t6u0hdd4z7xs","name":"Juan Reichert","email":"Jenifer.Casper@yahoo.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5jludze0231t6u0cfx5hcck","name":"Tyler Hoppe","email":"Catalina_Hermann@yahoo.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jluf2u0238t6u0h3bp1ozo","name":"Kelli Denesik","email":"Arlie_Runolfsson49@yahoo.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jlugru0245t6u0m5ovtl0v","name":"Benjamin Zieme","email":"Abigail_Torp@gmail.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jlui4y0252t6u0h65ku4wd","name":"Sidney Franecki","email":"Marlee.Stehr@hotmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jluj7b0259t6u0jaxddpdx","name":"Erick Wilderman","email":"Ramon_Christiansen83@gmail.com","emailVerified":null,"image":null,"instrument":"Double Bass","profileInfo":null,"isFixer":null},{"id":"cl5jlw4gd0291t6u0xla6oxe5","name":"Teresa Schimmel","email":"Doris_Bernier21@gmail.com","emailVerified":null,"image":null,"instrument":"Percussion","profileInfo":null,"isFixer":null},{"id":"cl5jlw4t40298t6u05wrq1k8y","name":"Jason Denesik","email":"Karli.Rolfson@gmail.com","emailVerified":null,"image":null,"instrument":"Cello","profileInfo":null,"isFixer":null},{"id":"cl5jlw5qz0305t6u0y3x5vcfk","name":"Dr. Gina Tromp","email":"Trenton_Greenfelder27@gmail.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlw6re0312t6u0zjc0po40","name":"Irma Homenick","email":"Icie_Lang68@gmail.com","emailVerified":null,"image":null,"instrument":"Bassoon","profileInfo":null,"isFixer":null},{"id":"cl5jlw7ln0319t6u09getcn2m","name":"Dr. Tara Zulauf","email":"Joan16@gmail.com","emailVerified":null,"image":null,"instrument":"Trombone","profileInfo":null,"isFixer":null},{"id":"cl5jlw8gk0326t6u078cjd24w","name":"Tanya Gusikowski","email":"Golda_Stark@hotmail.com","emailVerified":null,"image":null,"instrument":"Double Bass","profileInfo":null,"isFixer":null},{"id":"cl5jlw9ba0333t6u0axnxz0gr","name":"Ernestine Dibbert","email":"Marcos.Cassin@yahoo.com","emailVerified":null,"image":null,"instrument":"Horn","profileInfo":null,"isFixer":null},{"id":"cl5jlwa520340t6u01b6nlizn","name":"Miss Kenny Barton","email":"Malika.Dooley@gmail.com","emailVerified":null,"image":null,"instrument":"Oboe","profileInfo":null,"isFixer":null},{"id":"cl5jlwax00347t6u0snxasxvz","name":"Penny Rogahn","email":"Yesenia.Volkman91@yahoo.com","emailVerified":null,"image":null,"instrument":"Harp","profileInfo":null,"isFixer":null},{"id":"cl5jlwbrv0354t6u0wlvtc6uz","name":"Randal Denesik","email":"Lane14@hotmail.com","emailVerified":null,"image":null,"instrument":"Tuba","profileInfo":null,"isFixer":null},{"id":"cl5if30or0054ixu0y1vap3yd","name":"danmolloy","email":"danielmolloy_6@icloud.com","emailVerified":null,"image":"https://avatars.githubusercontent.com/u/64697812?v=4","instrument":"Double Bass","profileInfo":null,"isFixer":null}]

describe("Directory", () => {
  //it("Clicking on a player tile takes user to player's profile", () => {})
  //it("Has search bar", () => {})
  //it("Search bar results show players name, picture and instrument(s)", () => {})
  //it("Search bar has quick load of players", () => {})
  //it("Search bar can search ensembles people have on CV", () => {})
  //it("Clicking on search result takes user to player's profile", () => {})
  beforeEach(() => {
    render(<PlayerDirectory data={mockDirectory}/>)
  })
  it("Directory component renders", () => {
    const directory = screen.getByTestId("player-directory")
    expect(directory).toBeInTheDocument()
  })
  it("All instruments render", () => {
    let instrument;
    for (let i = 0; i < instrumentArr; i ++) {
      instrument = screen.getByTestId(`${instrumentArr[i]}-directory`)
      expect(instrument).toBeInTheDocument()
    }
  })
  it("States if there are no musicians of selected instrument", () => {
    const noClarinetsBtn = screen.getByTestId("Clarinet-directory-btn")
    const clarinetDiv = screen.getByTestId("Clarinet-directory")
    expect(noClarinetsBtn).toBeInTheDocument()
    expect(clarinetDiv).toBeInTheDocument()
    act(() => {
      fireEvent.click(noClarinetsBtn)
    })
    expect(clarinetDiv.textContent).toMatch(/No musicians found./)
  })
  it("Clicking on an instrument shows list of all players of selected instrument", () => {
    const randIndex = Math.floor(Math.random() * instrumentArr.length)
    const instrumentDiv = screen.getByTestId(`${instrumentArr[randIndex]}-directory`)
    const instrumentDivBtn = screen.getByTestId(`${instrumentArr[randIndex]}-directory-btn`)

    expect(instrumentDiv).toBeInTheDocument()
    expect(instrumentDiv.textContent).toMatch(instrumentArr[randIndex])
    expect(String(instrumentDiv.textContent).length).toEqual(instrumentArr[randIndex].length)
    act(() => {
      fireEvent.click(instrumentDivBtn)
    })
    const musos = mockDirectory.filter(i => i.instrument === instrumentArr[randIndex])
    for (let i = 0; i < musos.length; i++) {
      expect(instrumentDiv.textContent).toMatch(musos[i].name)
    }
  })
  it("Player tile has name, instrument and profile picture", () => {
    const randIndex = Math.floor(Math.random() * instrumentArr.length)
    const instrumentDiv = screen.getByTestId(`${instrumentArr[randIndex]}-directory`)
    const instrumentDivBtn = screen.getByTestId(`${instrumentArr[randIndex]}-directory-btn`)
    expect(instrumentDiv).toBeInTheDocument()
    expect(instrumentDiv.textContent).toMatch(instrumentArr[randIndex])
    expect(String(instrumentDiv.textContent).length).toEqual(instrumentArr[randIndex].length)

    act(() => {
      fireEvent.click(instrumentDivBtn)
    })

    const musos = mockDirectory.filter(i => i.instrument === instrumentArr[randIndex])
    for (let i = 0; i < musos.length; i++) {
      let musoTile = screen.getByTestId(`${musos[i].email}-tile`)
      expect(musoTile).toBeInTheDocument()
      let musoImg = screen.getByTitle(`${musos[i].name}`)
      expect(musoImg).toBeInTheDocument()
    }
  })
  it("Player tile has contact button", () => {
    const randIndex = Math.floor(Math.random() * instrumentArr.length)
    const instrumentDiv = screen.getByTestId(`${instrumentArr[randIndex]}-directory`)
    const instrumentDivBtn = screen.getByTestId(`${instrumentArr[randIndex]}-directory-btn`)
    expect(instrumentDiv).toBeInTheDocument()
    expect(instrumentDiv.textContent).toMatch(instrumentArr[randIndex])
    expect(String(instrumentDiv.textContent).length).toEqual(instrumentArr[randIndex].length)

    act(() => {
      fireEvent.click(instrumentDivBtn)
    })

    const musos = mockDirectory.filter(i => i.instrument === instrumentArr[randIndex])
    for (let i = 0; i < musos.length; i++) {
      let musoTile = screen.getByTestId(`${musos[i].email}-tile`)
      expect(musoTile).toBeInTheDocument()
      //let musoImg = screen.getByTitle(`${musos[i].name}`)
      expect(musoTile.textContent).toMatch(/Contact/)
    }
  })
})