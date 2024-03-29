import { useState } from "react"

type ToggleProps = {
  toggled: boolean
  label: string
  setToggled: (arg: boolean) => void
}

export default function ToggleSwitch(props: ToggleProps) {
  const { toggled, label, setToggled } = props;

  return (
    <div data-testid="toggle-switch" onClick={() => setToggled(!toggled)} className="hover:cursor-pointer flex flex-row flex-wrap items-center">
    <div className={toggled ? "bg-blue-500 overflow-y-visible w-8 h-4 flex flex-row items-center  rounded-full" : " overflow-y-visible w-8 h-4 flex flex-row items-center rounded-full bg-zinc-50 border"}>
      <div className={toggled ? "bg-zinc-100 border shadow w-5 h-5 rounded-full translate-x-full duration-200" : " -ml-2 bg-zinc-100 border shadow w-5 h-5 rounded-full duration-200"} />
    </div>
    <p className={toggled ? "text-sm text-zinc-800 m-3" : "text-sm text-zinc-400 m-3"}>{label}</p>
    </div>
  )
}