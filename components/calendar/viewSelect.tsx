import { useEffect, useRef, useState } from "react";

export const viewOptions = ["Day", "Month", "Year"]

export type ViewSelectProps = {
  selectedView: "Day"|"Month"|"Year"
  setSelectedView: (arg: "Day"|"Month"|"Year") => void
}

export default function ViewSelect(props: ViewSelectProps) {
  const { selectedView, setSelectedView } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleSelect = (i: "Day" | "Month" | "Year") => {
    setSelectedView(i)
    setTimeout(() => setShowOptions(false), 120)
  }

  return (
    <div tabIndex={-1}  ref={ref} onBlur={() => setTimeout(() => setShowOptions(false), 120)} data-testid="view-select" className="flex flex-col">
      <button className="border shadow h-8 p-1 w-28 bg-white rounded" data-testid="selected-view" onClick={() => setShowOptions(!showOptions)}>
        <p>{selectedView} View</p>
      </button>
      {showOptions 
      && <ul className="mt-9 w-28 bg-white  border rounded shadow absolute">
        {viewOptions.map((i: "Day"|"Month"|"Year") => (
          <li key={i} data-testid={`${i}-option`}>
            <button className="w-full h-full p-1 text-start hover:bg-indigo-600 hover:text-white"  onClick={() => handleSelect(i)}>
              {i}
            </button>
          </li>
        ))}
      </ul>}
    </div>
  )
}