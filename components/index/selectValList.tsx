import { useEffect, useRef } from "react"
import { BiCheck } from "react-icons/bi"

export type SelectValListProps = {
  setShowValList: (arg: boolean) => void
  selectedVal: string
  values: {
    val: string
    secondary?: string
    id?: string|number
  }[]
  handleSelect: (val: string) => void
  showValList: boolean
  tickSelected: boolean
  id: string
}

export default function SelectMenuList(props: SelectValListProps) {
  const { id, setShowValList, selectedVal, values, handleSelect, showValList, tickSelected } = props;
  const ref = useRef(null)

  useEffect(() => {
    if(showValList) {
      ref.current.focus()
    }
  }, [setShowValList])
  
  return (
    <ul data-testid={`${id}-vals-list`} tabIndex={-1}  ref={ref} onBlur={() => setTimeout(() => setShowValList(false), 150)} className=" absolute bg-white w-60 mt-10 h-48 overflow-scroll shadow-sm border py-1 rounded">
        {values.map(i => (
          <li className="w-full items-center justify-between flex flex-row text-start py-1 px-2  hover:bg-indigo-600 hover:text-white" data-testid={`${i.val}-option`} key={i.id ? i.id : i.val} onClick={() => {handleSelect(i.val); setShowValList(false)}}>
            <p>{i.val}</p>
            {i.secondary 
            ? <p className="text-sm">{i.secondary}</p> 
            : tickSelected && i.val === selectedVal
            && <div className=""><BiCheck /></div>}
          </li>
        ))}
      </ul>
  )
}