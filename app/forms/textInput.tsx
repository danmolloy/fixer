import { ErrorMessage, Field } from 'formik';
import React from 'react';

export interface TextInputProps {
  name: string;
  id: string;
  className?: string;
  label: string;
  asHtml?: 'input' | 'textarea' | 'email';
  type?: string;
  min?: string;
  max?: string;
  optional?: boolean;
}

export default function TextInput(props: TextInputProps) {
  const { name, id, className, label, asHtml, type, min, max, optional } =
    props;

  return (
    <div className='flex w-full flex-col py-4' data-testid={`${id}-div`}>
      <label htmlFor={id} className=''>
        {label}
      </label>
      {optional && (
        <span className='ml-2 text-sm text-slate-500'>Optional</span>
      )}
      <Field
        as={asHtml}
        id={id}
        label={label ? label : name}
        data-testid={`${id}-input`}
        className={`my-1 h-8 max-w-[60vw] rounded border px-1 shadow-sm ${className}`}
        name={name}
        type={type ? type : 'text'}
        min={min}
        max={max}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div
            className='p-1 text-sm text-red-600'
            data-testid={`${name}-error`}
          >
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
}
