import { useEffect, useRef } from "react"
import { EventWithCalls } from "./calendarEventLink" 

export type PlayerMenuProps = {
  event: EventWithCalls
  setShowMenu: (arg: boolean) => void
}

export default function PlayerMenu(props: PlayerMenuProps) {
  const { event, setShowMenu } = props
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])
  
  return (
    <div  ref={ref} onBlur={() => {setTimeout(() => setShowMenu(false), 150)}} tabIndex={-1} data-testid="player-menu">
      <button onClick={() => {}} className="cursor-pointer w-full text-start" data-testid={"request-parts-btn"}>
        <p className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Request Practice Parts
        </p>
      </button>
      <button onClick={() => {}} className="cursor-pointer w-full text-start" data-testid={"add-to-calendar-btn"}>
        <p className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Export to Calendar
        </p>
      </button>
      <button onClick={() => {}} className="cursor-pointer w-full text-start" data-testid={"contact-fixer-btn"}>
        <p className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Contact Fixer
        </p>
      </button>
      <button onClick={() => {}} className="cursor-pointer w-full text-start" data-testid={"dep-request-btn"}>
        <p className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
          Request to Dep
        </p>
      </button>
    </div>
  )
}