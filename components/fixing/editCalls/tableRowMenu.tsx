import Link from "next/link"
import React from "react"
import MenuShell from "../../index/menuShell"
import { Field, FieldArray } from "formik"
import TextInput from "../../createEvent/textInput"
import ButtonPrimary from "../../index/buttonPrimary"
import { UserWithCalls } from "./editCalls"

export type EditTableRowMenuProps = {
  menuOptions?: {
    id: string
    text: string
  }[]
  setShowMenu: () => void
  appendedPlayers: UserWithCalls[]
  menuIndex: number|null
  makeAvailable: (arg: UserWithCalls) => void
}

export default function TableRowMenu(props: EditTableRowMenuProps) {
  const { makeAvailable, appendedPlayers, menuIndex, setShowMenu } = props;

  return (
    <FieldArray name="appendedPlayers">
            {({ insert, remove, push}) => (
          <MenuShell testId="table-row-menu" title={appendedPlayers[menuIndex].name} setShowMenu={() => setShowMenu()}>
                <div className=" w-full flex flex-col px-2 ">
                <button className="text-start py-2 hover:bg-zinc-50">
                  <a data-testid="profile-link" target="_blank" rel="noreferrer" href={`/user/${appendedPlayers[menuIndex].name}`} >
                    View Profile
                  </a>
                </button>
                <button className="text-start py-2 hover:bg-zinc-50" onClick={(e) => {
                e.preventDefault();
                setShowMenu();
                remove(menuIndex);
                makeAvailable(appendedPlayers[menuIndex])
                
                }}>
                  Remove from List
                </button>
                <TextInput 
                  asHtml="textarea"
                  name={`appendedPlayers[${menuIndex}]playerMessage`} 
                  id={`appendedPlayers[${menuIndex}]playerMessage`}
                  min={"0"}
                  max={"250"}
                  label={"Add Message"} />
                  <ButtonPrimary id="" text="Done" className="border-blue-500 text-blue-500 hover:bg-blue-50 w-16" handleClick={() => setShowMenu()} />
                  </div>
              </MenuShell>
            )}
            </FieldArray>
  );
}