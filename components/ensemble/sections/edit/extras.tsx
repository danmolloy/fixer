import { Field, FieldArray } from "formik"
import ComboBox from "../../../event/createUpdate/comboBox"
import { User } from "@prisma/client"
import { AiOutlineClose } from "react-icons/ai"

export type EditExtrasProps = {
  extras: {
    name: string
    id: string
    positionTitle: string
  }[]
  directory: User[]
  handleSelect: (args: {
    id: string
    name: string
    playerList: "extras"
    searchCategory: "searchedExtra"
  }) => void
  searchedExtra: string
}

export default function EditExtras(props: EditExtrasProps) {
  const { searchedExtra, directory, extras, handleSelect } = props;

  return (
    <div data-testid="edit-extras" className="border rounded p-2 w-full my-2">
      <h3>Extra Players</h3>
        <div data-testid="extras-list">
          {extras.length === 0 
          ? <div className="text-center my-3">
            <h3 className="font-medium">No extras added.</h3>
            <p className="text-zinc-600">Find them in the directory below.</p>
          </div>
          : <FieldArray name="extras" >
              {({ remove }) => (
                extras.map((i, index) => (
                  <div data-testid={`extra-${i.id}`} key={i.id} className="border my-1 p-1 flex flex-row justify-between items-start">
                    <div className="flex flex-col ">
                      <p>{i.name}</p>
                      <Field
                        className='m-1 border p-1 rounded'
                        data-testid={`${i.id}-position-select`} 
                        name={`extras[${index}]positionTitle`} 
                        as="select" >
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
          <ComboBox 
            options={directory.map(i => ({
              id: i.id,
              textPrimary: `${i.firstName} ${i.lastName}`
            }))}
            id="find-extras"
            label="Search Directory"
            includeId={true}
            setValue={(playerObj: {
              id: string
              textPrimary: string
            }) => handleSelect({id: playerObj.id, name: playerObj.textPrimary, playerList: "extras", searchCategory: "searchedExtra"})}
            propsValue={searchedExtra}
            name={"searchedExtra"}
            optional={false} />
        </div>
    </div>
  )
}