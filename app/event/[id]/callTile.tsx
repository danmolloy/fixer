'use client';
import { Call } from '@prisma/client';
import { DateTime } from 'luxon';
import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';

export default function CallTile(props: Call) {
  const { id, startTime, endTime, venue } = props;
  return (
    <div>
      <div data-testid='call-tile-div' className='my-2'>
        <p>
          {DateTime
            .fromISO(typeof startTime === 'string' ? startTime : startTime.toISOString(), { zone: 'utc' })
            .setZone('Europe/London')
            .toFormat("HH:mm LLL dd, yyyy (z)")}{' '}
          <span className='text-sm'>to</span>
        </p>
        <p>
          
          {String(
            DateTime.fromJSDate(new Date(endTime)).toFormat(
              "HH:mm LLL dd, yyyy"
            )
          )}
        </p>
        <div className='flex flex-row items-center text-slate-600'>
          <HiLocationMarker />
          <p className='ml-2'>{venue}</p>
        </div>
      </div>
    </div>
  );
}
