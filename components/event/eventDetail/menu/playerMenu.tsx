import { EventWithCalls } from "./calendarEventLink" 

export type PlayerMenuProps = {
  event: EventWithCalls
}

export default function PlayerMenu(props: PlayerMenuProps) {
  const { event } = props
  return (
    <div data-testid="player-menu">
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