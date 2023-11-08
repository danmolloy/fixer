import { Field, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import TextInput from "../../../event/createEvent/textInput";
import { useState } from "react";

export type FixingEnsembleProps = {
  ensemblesList: string[]
}

export default function FixingEnsembles(props: FixingEnsembleProps) {
  const { ensemblesList } = props;
  const [ensembleName, setEnsembleName] = useState<string>("")

  return (
    <div data-testid="fixing-ensembles">
      <h2>Ensembles You Fix</h2>
      <p>Add ensembles you fix to save time and keep consistency in your bookings.</p>
      <p>If you are a player only, leave this section blank.</p>
      <div data-testid="fixing-ensembles-list">
        <p>Current ensembles</p>
        <FieldArray 
          name="fixingEnsembles" 
          render={arrayHelpers => (
            <div>
      {ensemblesList.length > 0 
        ? ensemblesList.map((i, index) => (
          <div key={i}>
            <button data-testid={`${i.toLocaleLowerCase()}-remove-btn`} onClick={() => arrayHelpers.remove(index)}>
              <AiOutlineClose />
            </button>
            <p>{i}</p>
          </div>
        ))
        : <p>You have no ensembles currently listed.</p>}
        
          <div>
            <label htmlFor="add-ensemble">Add Ensemble</label>
            <input id="add-ensemble" onChange={e => setEnsembleName(e.target.value)} value={ensembleName} type="text"/>
            <button data-testid="add-btn" onClick={() => arrayHelpers.push(ensembleName)}>Add</button>
          </div>
        
          </div>
        )}/>
      </div>
    </div>
  )
}