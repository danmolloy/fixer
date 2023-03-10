import { ErrorMessage, Field } from "formik";
import React from "react";

interface TextInputProps {
  name: string
  id: string
  className?: string
  label: string
  asHtml?: string
  type?: string
  min?: string
  max?: string
}

export default function TextInput(props: TextInputProps) {
  const { name, id, className, label, asHtml, type, min, max } = props;

  return (
    <div className="flex flex-col py-4" data-testid={`${id}-div`}>
      <label htmlFor={name} className="text-slate-700">{label}</label>
      <Field
        as={asHtml}
        id={name}
        label={label ? label : name}
        data-testid={`${id}-input`}
        className={`border rounded p-2 my-1 shadow-sm ${className}`}
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