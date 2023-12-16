import { User } from "@prisma/client"
import { Field, FieldArray } from "formik"
import ComboBox from "../../../event/createUpdate/comboBox"
import { AiOutlineClose } from "react-icons/ai"


export type EditMembersProps = {
  members: {
    name: string
    id: string
    positionTitle: string
  }[]
  directory: User[]
  handleSelect: (args: {
    id: string
    name: string
    playerList: "members"
    searchCategory: "searchedMember"
  }) => void
  searchedMember: string
}

export default function EditMembers(props: EditMembersProps) {
  const { members, directory, handleSelect, searchedMember } = props;

  return (
    <div data-testid="edit-members" className="border rounded p-2 w-full my-2">
      <h3>Section Members</h3>
      <div data-testid="members-list">
        {members.length === 0 
        ? <div className="text-center my-3">
          <h3 className="font-medium">No members added.</h3>
          <p className="text-zinc-600">Find them in the directory below.</p>
        </div>
        : <FieldArray name="members">
          {({remove}) => (
            members.map((i, index) => (
              <div data-testid={`member-${i.id}`} key={i.id} className="border my-1 p-1 flex flex-row justify-between items-start">
                <div className="flex flex-col ">
                  <p>{i.name}</p>
                  <Field data-testid={`${i.id}-position-select`} name={`members[${index}]positionTitle`} as="select" className='m-1 border p-1 rounded'>
                    <option value="principal">Principal</option>
                    <option value="tutti">Tutti</option>
                  </Field>
                </div>
                <button data-testid={`${i.id}-remove`} onClick={() => remove(index)} className=" m-1 rounded-full p-1 hover:bg-slate-100">
                  <AiOutlineClose />
                </button>
              </div>
            ))
          )}
        </FieldArray>}
      </div>
      <ComboBox 
        optional={false} 
        id="find-members" 
        label="Search Directory"
        name="searchedMember" 
        setValue={(playerObj: {
          id: string
          textPrimary: string
        }) => handleSelect({
          id: playerObj.id, 
          name: playerObj.textPrimary, 
          playerList: "members", 
          searchCategory: "searchedMember"
        })}
        options={directory.map(i => ({
          id: i.id,
          textPrimary: `${i.firstName} ${i.lastName}`
        }))}
        includeId={true}
        propsValue={searchedMember} />
    </div>
  )
}