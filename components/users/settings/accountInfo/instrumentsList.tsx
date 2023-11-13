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
    <div data-testid="instruments-list" className="p-1 my-4 flex flex-col items-center w-full">
      <h2 className="font-medium">Your instrument(s)</h2>
      <p className="font-sm">Add your instrument(s) to be in the directory and bookable for gigs.</p>
      <p className="font-sm">If you are a fixer/administrator only, just leave this blank.</p>
      <div data-testid="user-instrument-list" className="p-1 my-4 flex flex-col items-center w-full">
        <p className="font-medium">Current instruments</p>
        <FieldArray 
          name="instrumentsList" 
          render={arrayHelpers => (
            <div className=" flex flex-col w-full my-2">
      {instrumentsList.length > 0 
        ? instrumentsList.map((i, index) => (
          <div key={i} className="border bg-gray-100 rounded my-1 p-1 w-36 flex flex-row items-center justify-between">
            <p>{i}</p>
            <button className="text-sm text-center border m-1 rounded-full bg-gray-50 hover:text-red-500" data-testid={`${i.toLocaleLowerCase()}-remove-btn`} onClick={() => arrayHelpers.remove(index)}>
              <AiOutlineClose />
            </button>
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