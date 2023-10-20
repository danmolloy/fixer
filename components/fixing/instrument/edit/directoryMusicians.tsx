import { Call, User } from "@prisma/client"
import { FieldArray } from "formik"
import MusicianTile from "./musicianTile"

export type DirectoryMusiciansProps = {
  musicians: User[]
  allEventCalls: Call[]
}


export default function DirectoryMusicians(props: DirectoryMusiciansProps) {
  const { musicians, allEventCalls } = props

  return (
    <div data-testid="directory-musicians">
      <div>
        <h3>
          Directory
        </h3>
      </div>
      <FieldArray name="availablePlayers">
        {({insert, remove, push}) => (
          <div>
            {musicians.map(i => (
              <MusicianTile 
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