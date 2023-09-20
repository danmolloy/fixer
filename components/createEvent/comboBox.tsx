import { ErrorMessage, Field } from "formik";
import React from "react";
import { TextInputProps } from "./textInput";


export interface ComboBoxProps extends TextInputProps {
  propsValue: string
  options: { 
    id: string
    textPrimary: string 
    textSecondary?: string
  }[]
  setVenue: (venue: string) => void
}

export default function ComboBox(props: ComboBoxProps) {
  const { options, name, id, className, label, asHtml, type, min, max, optional, propsValue, setVenue } = props;
  let regEx = new RegExp(propsValue, "gi");

  const handleSelect = (venue) => {
    setVenue(venue)

  }
  
  return (
    <div className="flex flex-col py-4" data-testid={`combobox-${id}-div`}>
      <label htmlFor={name} className="text-slate-700">{label}</label>
      {optional && <span className="text-slate-400 text-sm ml-2">Optional</span>}
      <Field
        as={asHtml}
        id={name}
        label={label ? label : name}
        data-testid={`${id}-input`}
        className={`border rounded px-1 my-1 shadow-sm h-8 ${className}`}
        name={name}
        type={type ? type: "text"}
        min={min}
        max={max}
      />
        <ErrorMessage name={name}>
          { msg => <div className="p-1 text-red-600 text-sm" data-testid={`${name}-error`}>{msg}</div> }
        </ErrorMessage>
        {props.propsValue.length > 1 
          && !options.find(i => i.textPrimary === propsValue)
          &&
        <div data-testid="combo-options-div" className="mt-16 w-[88vw] md:w-[66vw] lg:w-[45vw] bg-white absolute p-1 border rounded shadow">
          {options.filter(i => i.textPrimary.match(regEx)).map(i => (
            <button className=" w-full text-start p-1 hover:bg-indigo-600 hover:text-white" key={i.id} onClick={() => handleSelect(i.textPrimary)}>
              {i.textPrimary}
            </button>
          ))}
        </div>}
    </div>
  )
}