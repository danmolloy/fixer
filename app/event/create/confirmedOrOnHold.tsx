import { ErrorMessage, Field } from 'formik';
import React from 'react';

export default function ConfirmedOrOnHold(props: {
  disabled: boolean
}) {
  const { disabled } = props;
  return (
    <div data-testid='status-div' className='w-1/2 py-4 sm:self-start'>
      <label htmlFor='confirmedOrOnHold' className='font-medium'>
        Gig Status
      </label>

      <div
        className='flex flex-col py-1'
        role='group'
        aria-label='confirmedOrOnHold'
        data-testid={`confirm-or-hold-toggle-group`}
      >
        <label className='py-1'>
          <Field
          disabled={disabled}
            className='mr-2'
            type='radio'
            id='confirmedOrOnHold'
            name='confirmedOrOnHold'
            value='Confirmed'
            data-testid={`confirmed-toggle`}
          />
          Confirmed
        </label>
        <label className='py-1'>
          <Field
          disabled={disabled}
            className='mr-2'
            type='radio'
            id='confirmedOrOnHold'
            name='confirmedOrOnHold'
            value='On Hold'
            data-testid={`on-hold-toggle`}
          />
          On Hold
        </label>
        <ErrorMessage name={`confirmedOrOnHold`}>
          {(msg) => (
            <div
              className='-mt-1 ml-4 text-xs text-red-600'
              data-testid={'confirmedOrOnHold-error'}
            >
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    </div>
  );
}
