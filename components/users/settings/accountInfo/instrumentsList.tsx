import { useState } from "react";
import ComboBox from "../../../event/createEvent/comboBox";
import { instrumentArr } from "../../../fixing/fixing";
import { AiOutlineClose } from "react-icons/ai";
import SelectMenu from "../../../index/selectMenu";
import { FieldArray } from "formik";

export type InstrumentsListProps = {
  instrumentsList: string[]
}

export default function InstrumentsList(props: InstrumentsListProps) {
  const { instrumentsList } = props;
  const [selectedInstrument, setSelectedInstrument] = useState(null)

  return (
    <div data-testid="instruments-list">
      <h2>Your instrument(s)</h2>
      <p>Add your instrument(s) to be in the directory and bookable for gigs.</p>
      <p>If you are a fixer/administrator only, just leave this blank.</p>
      <div data-testid="user-instrument-list">
        <p>Current instruments</p>
        <FieldArray 
          name="instrumentsList" 
          render={arrayHelpers => (
            <div>
      {instrumentsList.length > 0 
        ? instrumentsList.map((i, index) => (
          <div key={i}>
            <button data-testid={`${i.toLocaleLowerCase()}-remove-btn`} onClick={() => arrayHelpers.remove(index)}>
              <AiOutlineClose />
            </button>
            <p>{i}</p>
          </div>
        ))
        : <p>You have no instruments currently listed.</p>}
        <SelectMenu 
        id="instrument"
        selectedVal={""} 
        handleSelect={(instrument: string) => {setSelectedInstrument(instrument); arrayHelpers.push(instrument)}} 
        tickSelected={false}
        values={instrumentArr.map((i, index) => ({
          id: index,
          val: i
        }))} />
          </div>
        )}/>
      </div>
    </div>
  )
}