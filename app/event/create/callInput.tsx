import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import TextInput from '../../forms/textInput';
import ComboBox from '../../forms/comboBox';

export const venueOptions = [
  {
    id: '0',
    textPrimary: 'BBC Maida Vale Studios',
  },
  {
    id: '1',
    textPrimary: 'LSO St Lukes',
  },
  {
    id: '2',
    textPrimary: 'Barbican Concert Hall',
  },
  {
    id: '3',
    textPrimary: 'Royal Festival Hall',
  },
];

export type CallInputProps = {
  index: number;
  id: number;
  remove: (arg: number) => void;
  propsValueVenue: string;
  setVenue: (venue: string) => void;
  call: {
    startTime: string;
    endTime: string;
    venue: string;
    info?: string;
  };
};

export default function CallInput(props: CallInputProps) {
  const { index, remove, propsValueVenue, setVenue, call } = props;
  return (
    <div data-testid={`call-${index}-input-div`} className='flex flex-col'>
      <div className='flex flex-row items-center justify-between'>
        <p className='font-medium'>{`Call ${index + 1}`}</p>
        <button
          disabled={index === 0}
          data-testid={`calls-${index}-delete`}
          className='delete-btn m-1 rounded-full p-1 text-xl text-slate-700 hover:bg-slate-100'
          onClick={() => remove(index)}
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className='flex flex-col sm:flex-row'>
        <div className='flex w-1/2 flex-col py-4'>
          <label className='font-medium' htmlFor={`calls.${index}.startTime`}>
            Start Time
          </label>
          <Field
            data-testid={`calls.${index}.startTime`}
            label='Start Time'
            className='my-1 w-48 rounded border p-2 shadow-sm'
            name={`calls.${index}.startTime`}
            id={`calls.${index}.startTime`}
            type='datetime-local'
            value={call.startTime}
          />
          <ErrorMessage name={`calls.${index}.startTime`}>
            {(msg) => (
              <div
                className='-mt-1 ml-4 text-xs text-red-600'
                data-testid={`calls-${index}-startTime-error`}
              >
                {msg}
              </div>
            )}
          </ErrorMessage>
        </div>

        <div className='flex w-1/2 flex-col py-4'>
          <label className='font-medium' htmlFor={`calls.${index}.endTime`}>
            End Time
          </label>
          <Field
            label='End Time'
            className='my-1 w-48 rounded border p-2 shadow-sm'
            id={`calls.${index}.endTime`}
            data-testid={`calls.${index}.endTime`}
            name={`calls.${index}.endTime`}
            htmlFor={`calls.${index}.endTime`}
            type='datetime-local'
            value={call.endTime}
          />
          <ErrorMessage name={`calls.${index}.endTime`}>
            {(msg) => (
              <div
                className='-mt-1 ml-4 text-xs text-red-600'
                data-testid={`calls-${index}-endTime-error`}
              >
                {msg}
              </div>
            )}
          </ErrorMessage>
        </div>
      </div>
      {/*  <TextInput */}
      <ComboBox
        optional={false}
        setValue={(venue: string) => setVenue(venue)}
        includeId={false}
        options={venueOptions}
        propsValue={propsValueVenue}
        label='Venue'
        className=''
        id={`calls.${index}.venue`}
        name={`calls.${index}.venue`}
        asHtml='input'
      />
      <TextInput
        optional={true}
        label={`Call Information`}
        className=''
        id={`calls.${index}.info`}
        name={`calls.${index}.info`}
        asHtml='textarea'
      />
    </div>
  );
}
