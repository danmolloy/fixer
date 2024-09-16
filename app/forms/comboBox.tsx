import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { TextInputProps } from './textInput';

export interface ComboBoxProps extends TextInputProps {
  propsValue: string; // propsValue is the value of this field, you need this prop for the regex.
  options: {
    id: string;
    textPrimary: string;
    textSecondary?: string;
  }[];
  setValue: (
    value:
      | string
      | {
          textPrimary: string;
          id: string;
        }
  ) => void;
  name: string; // formik field name
  label: string;
  optional: boolean;
  includeId?: boolean;
}

export default function ComboBox(props: ComboBoxProps) {
  const {
    includeId,
    options,
    name,
    id,
    className,
    label,
    asHtml,
    type,
    min,
    max,
    optional,
    propsValue,
    setValue,
  } = props;
  let regEx = new RegExp(propsValue, 'gi');

  const handleSelect = (selectedVal: { textPrimary: string; id: string }) => {
    if (includeId) {
      setValue(selectedVal);
    } else {
      setValue(selectedVal.textPrimary);
    }
  };

  return (
    <div className='flex flex-col py-4' data-testid={`combobox-${id}-div`}>
      <label htmlFor={id} className='font-medium'>
        {label}
      </label>
      {optional && (
        <span className='ml-2 text-sm text-slate-400'>Optional</span>
      )}
      <Field
        as={asHtml}
        id={id}
        label={label ? label : name}
        data-testid={`${id}-input`}
        className={`my-1 h-8 rounded border px-1 shadow-sm ${className}`}
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
      {props.propsValue?.length > 1 &&
        !options.find((i) => i.textPrimary === propsValue) && (
          <div
            data-testid='combo-options-div'
            className='absolute mt-16 w-[88vw] rounded border bg-white p-1 shadow md:w-[66vw] lg:w-[45vw]'
          >
            {options
              .filter((i) => i.textPrimary.match(regEx))
              .map((i) => (
                <button
                  className='w-full p-1 text-start hover:bg-indigo-600 hover:text-white'
                  key={i.id}
                  onClick={() => handleSelect(i)}
                >
                  {i.textPrimary}
                </button>
              ))}
          </div>
        )}
    </div>
  );
}
