
export type TabSelectProps = {
  selectedTab: string
  setSelectedTab: (arg: "Booking"|"Availability") => void
}

export default function TabSelect(props: TabSelectProps) {
  const { setSelectedTab, selectedTab } = props

  return (
    <div data-testid="tab-select" className=" w-full flex flex-row justify-evenly ">
      <button 
        data-testid="booking-tab-toggle"
        onClick={(e) => {e.preventDefault(); setSelectedTab("Booking")}}
        className={selectedTab === "Booking" ? "py-2 border-b-2 border-blue-600 text-blue-600" :"text-slate-400 py-2"}>
        Booking
      </button>
      <button
        data-testid="availability-tab-toggle" 
        onClick={(e) => {e.preventDefault(); setSelectedTab("Availability")}}
        className={selectedTab === "Availability" ? "py-2 border-b-2 border-amber-600 text-amber-600" :"text-slate-400 py-2"}>
        Availability
      </button>
    </div>
  )
}