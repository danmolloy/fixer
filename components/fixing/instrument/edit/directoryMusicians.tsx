import { User } from "@prisma/client"
import { FieldArray } from "formik"
import MusicianTile from "./musicianTile"

export type DirectoryMusiciansProps = {
  musicians: User[]
}


export default function DirectoryMusicians(props: DirectoryMusiciansProps) {
  const { musicians } = props

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
              <MusicianTile appendPlayer={() => push(i)} key={i.id} musician={i}/>
            ))}
          </div>
          )}
      </FieldArray>
    </div>
  )
}