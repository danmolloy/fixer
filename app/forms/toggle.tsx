import { useState } from "react"

export type ToggleSwitchProps = {
  enabled: boolean
  disabled: boolean
  setEnabled: (arg: boolean) => void
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  const { enabled, disabled, setEnabled } = props;

  return (
    <label className={`relative inline-flex items-center cursor-pointer m-1 ${disabled && 'opacity-40'}`} >
      <input 
        type="checkbox"
        className="sr-only peer  "
        disabled={disabled}
        checked={enabled}
        onChange={() => setEnabled(!enabled)}/>
      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"/>
      <div className="absolute left-0 top-0 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transform duration-500 transition-transform border"/>
    </label>
  )
}