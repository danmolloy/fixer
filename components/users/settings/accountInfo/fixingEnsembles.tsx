import { Field, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import TextInput from "../../../event/createEvent/textInput";
import { useState } from "react";

export type FixingEnsembleProps = {
  fixingEnsemblesList: string[]
}

export default function FixingEnsembles(props: FixingEnsembleProps) {
  const { fixingEnsemblesList } = props;
  const [ensembleName, setEnsembleName] = useState<string>("")

  return (
    <div data-testid="fixing-ensembles" className="p-1 my-4 flex flex-col items-center w-full">
      <h2 className="font-medium">Ensembles You Fix</h2>
      <p className="font-sm">Add ensembles you fix to save time and keep consistency in your bookings.</p>
      <p className="font-sm">If you are a player only, leave this section blank.</p>
      <div data-testid="fixing-ensembles-list" className="p-1 my-4 flex flex-col items-center w-full">
        <p className="font-medium">Current ensembles</p>
        <FieldArray 
          name="fixingEnsembles" 
          render={arrayHelpers => (
            <div className=" flex flex-col w-full my-2">
      {fixingEnsemblesList.length > 0 
        ? fixingEnsemblesList.map((i, index) => (
          <div key={i} className="border bg-gray-100 rounded my-1 p-1 w-36 flex flex-row items-center justify-between">
            <p>{i}</p>
            <button className="text-sm text-center border m-1 rounded-full bg-gray-50 hover:text-red-500"  data-testid={`${i.toLocaleLowerCase()}-remove-btn`} onClick={() => arrayHelpers.remove(index)}>
              <AiOutlineClose />
            </button>
          </div>
        ))
        : <p>You have no ensembles currently listed.</p>}
        
          <div className="flex flex-col py-4 w-full">
            <label className="font-medium" htmlFor="add-ensemble">Add Ensemble</label>
            <input className="border rounded px-1 my-1 shadow-sm h-8 max-w-[60vw]" id="add-ensemble" onChange={e => setEnsembleName(e.target.value)} value={ensembleName} type="text"/>
            <button disabled={fixingEnsemblesList.includes(ensembleName) && ensembleName.trim().length < 1 ? true : false} className="disabled:opacity-40 m-1 py-1 w-12 hover:bg-indigo-50 text-indigo-600 border border-indigo-600 rounded" data-testid="add-btn" onClick={() => arrayHelpers.push(ensembleName)}>Add</button>
          </div>
          </div>
        )}/>
      </div>
    </div>
  )
}