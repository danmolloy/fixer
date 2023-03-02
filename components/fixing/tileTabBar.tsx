import React from "react";

interface TileTabBarProps {
  selectedTab: string
  setSelectedTab: (arg: string) => void
}

export default function TileTabBar(props: TileTabBarProps) {
  const { setSelectedTab, selectedTab } = props

  return (
    <div data-testid="tile-tab-bar" className=" w-full flex flex-row justify-evenly ">
      <button 
        data-testid="booking-tab-toggle"
        onClick={() => setSelectedTab("Booking")}
        className={selectedTab === "Booking" ? "py-2 border-b-2 border-blue-600 text-blue-600" :"text-slate-400 py-2"}>
        Booking
      </button>
      <button
        data-testid="availability-tab-toggle" 
        onClick={() => setSelectedTab("Availability")}
        className={selectedTab === "Availability" ? "py-2 border-b-2 border-blue-600 text-blue-600" :"text-slate-400 py-2"}>
        Availability
      </button>
    </div>
  )
}