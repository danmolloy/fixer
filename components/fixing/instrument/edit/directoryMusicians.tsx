import { Call, PlayerCall, User } from "@prisma/client"
import { FieldArray } from "formik"
import MusicianTile from "./musicianTile"

export type DirectoryMusiciansProps = {
  musicians: User[]
  allEventCalls: Call[]
  eventMusicianIds: string[]
}


export default function DirectoryMusicians(props: DirectoryMusiciansProps) {
  const { musicians, allEventCalls, eventMusicianIds } = props

  return (
    <div data-testid="directory-musicians" className="m-2 mt-12">
      <div>
        <h3>
          Select from Directory
        </h3>
      </div>
      <FieldArray name="musicians">
        {({insert, remove, push}) => (
          <div className="border h-96 overflow-scroll m-2 ">
            {musicians.filter(i => !eventMusicianIds.includes(i.id)).map(i => (
              <MusicianTile 
                disabled={eventMusicianIds.includes(i.id)}
                appendPlayer={() => push({
                  user: i,
                  addedMessage: "",
                  calls: allEventCalls,
                })} 
                key={i.id} musician={i}/>
            ))}
            {musicians.filter(i => eventMusicianIds.includes(i.id)).map(i => (
              <MusicianTile 
                disabled={eventMusicianIds.includes(i.id)}
                appendPlayer={() => push({
                  user: i,
                  addedMessage: "",
                  calls: allEventCalls,
                })} 
                key={i.id} musician={i}/>
            ))}
          </div>
          )}
      </FieldArray>
    </div>
  )
}