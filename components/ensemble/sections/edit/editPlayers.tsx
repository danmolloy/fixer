import { User } from "@prisma/client"
import { SectionExtraWithUser } from "../sectionExtra";
import { EnsembleMemberWithUser } from "../../../fixing/instrument/players/memberTile";
import ComboBox from "../../../event/createUpdate/comboBox";
import { FieldArray } from "formik";
import EditExtras from "./extras";
import EditMembers from "./members";

export type EditPlayersProps = {
  extras: {
    name: string
    id: string
    positionTitle: string
  }[]
  members: {
    name: string
    id: string
    positionTitle: string
  }[]
  directory: User[]
  searchedMember: string
  searchedExtra: string
  selectDirPlayer: (player: {
    name: string
    id: string
    positionTitle: string
    playerList: string
    searchCategory: string
  }) => void
}

export default function EditPlayers(props: EditPlayersProps) {
  const { selectDirPlayer, searchedMember, searchedExtra, extras, members, directory } = props;

  const handleSelect = (user: {
    name: string
    id: string
    playerList: string
    searchCategory: string
  }) => {
    selectDirPlayer({
      ...user,
      positionTitle: "tutti",
    })
    //setValue(selectedVal)
  }
  return (
    <div data-testid="edit-players" className="w-full">
    <h3>Musicians</h3>
    <EditMembers
      members={members}
      directory={directory} 
      handleSelect={(args) => handleSelect(args)} 
      searchedMember={searchedMember} />
    <EditExtras 
      searchedExtra={searchedExtra} 
      handleSelect={(args) => handleSelect(args)} 
      extras={extras} 
      directory={directory}/>
  </div>
  )
}