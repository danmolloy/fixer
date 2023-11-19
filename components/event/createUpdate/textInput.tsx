import { ErrorMessage, Field } from "formik";
import React from "react";

export interface TextInputProps {
  name: string
  id: string
  className?: string
  label: string
  asHtml?: "input"|"textarea"|"email"
  type?: string
  min?: string
  max?: string
  optional?: boolean
}

export default function TextInput(props: TextInputProps) {
  const { name, id, className, label, asHtml, type, min, max, optional } = props;

  return (
    <div className="flex flex-col py-4 w-full" data-testid={`${id}-div`}>
      <label htmlFor={id} className="font-medium">{label}</label>
      {optional && <span className="text-slate-400 text-sm ml-2">Optional</span>}
      <Field
        as={asHtml}
        id={id}
        label={label ? label : name}
        data-testid={`${id}-input`}
        className={`border rounded px-1 my-1 shadow-sm h-8 max-w-[60vw] ${className}`}
        name={name}
        type={type ? type: "text"}
        min={min}
        max={max}
      />
        <ErrorMessage name={name}>
          { msg => <div className="p-1 text-red-600 text-sm" data-testid={`${name}-error`}>{msg}</div> }
        </ErrorMessage>
    </div>
  )
}