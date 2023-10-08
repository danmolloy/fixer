import { useEffect, useRef, useState } from "react";
import { TiTick } from "react-icons/ti";
import SelectMenuList from "./selectValList";
import { BsChevronExpand } from "react-icons/bs";

export type SelectMenuProps = {
  selectedVal: string
  handleSelect: (val: string) => void
  values: {
    val: string
    secondary?: string
    id?: string|number
  }[]
  tickSelected: boolean
}

export default function SelectMenu(props: SelectMenuProps) {
  const { selectedVal, handleSelect, values } = props;
  const [showValList, setShowValList] = useState(false)
  

  return (
    <div data-testid="select-menu" className=" border shadow-xs rounded w-60 flex justify-center">
      <div onClick={() => setShowValList(!showValList)} className="flex items-center h-8 w-full px-2 justify-between focus:ring active:border-2 active:border-indigo-600  ring-indigo-600">
        <p className="">
          {selectedVal === "" ? "Select an instrument" : selectedVal}
        </p>
        <div>
          <BsChevronExpand />
        </div>
      </div>
      {showValList 
      && <SelectMenuList {...props} showValList={showValList} setShowValList={arg => setShowValList(arg)} />}
    </div>
  )
}