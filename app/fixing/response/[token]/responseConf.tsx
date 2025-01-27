'use client';
import { Call, ContactMessage, Event, EventSection } from '@prisma/client';
import axios from 'axios';
import { DateTime } from 'luxon';
import {
  TiThumbsOk,
  TiThumbsUp,
  TiThumbsDown,
  TiCalendarOutline,
} from 'react-icons/ti';
import Confetti from 'react-confetti';
import { useSearchParams } from 'next/navigation';
import { FiAlertTriangle } from 'react-icons/fi';
export type ResponseConfProps = {
  contactMessage: ContactMessage & {
    calls: Call[];
    eventSection: EventSection & {
      event: Event;
    };
  };
};

export default function ResponseConf(props: ResponseConfProps) {
  const { contactMessage } = props;
  const params = useSearchParams();

  const handleCalendar = async () => {
    return await axios
      .post('/fixing/response/ics', contactMessage)
      .then((response) => {
        const blob = new Blob([response.data], { type: 'text/calendar' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'events.ics';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating ICS file:', error);
      });
  };

  if (contactMessage.status === 'ERROR') {
    return (
      <div
        data-testid='response-confirmation'
        className='my-4 flex w-[95vw] flex-col items-center justify-center rounded border bg-white p-2 shadow md:w-2/3'
      >
        <div className='flex flex-row items-center justify-center text-red-600'>
          <FiAlertTriangle size={18} />
          <p className='mx-2'>
            There has been an error. Please contact GigFix immediately.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid='response-confirmation'
      className='my-4 flex w-[95vw] flex-col items-center justify-center rounded border bg-white p-2 shadow md:w-2/3'
    >
      {params.get('accepted') && (
        <Confetti
          recycle={false}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
      {contactMessage.status === 'FINDINGDEP' ? (
        <h2>Finding Dep</h2>
      ) : contactMessage.type === 'AUTOBOOK' &&
        contactMessage.status === 'DECLINED' ? (
        <h2>Released.</h2>
      ) : contactMessage.type === 'AUTOBOOK' ? (
        <h2>Auto Booked</h2>
      ) : contactMessage.type === 'BOOKING' &&
        contactMessage.status === 'ACCEPTED' ? (
        <h2>Offer accepted.</h2>
      ) : contactMessage.type === 'BOOKING' &&
        contactMessage.status === 'DECLINED' ? (
        <h2>Offer declined.</h2>
      ) : (
        <h2>Response received.</h2>
      )}
      <div className='my-4 text-center text-gray-700'>
        {contactMessage.status === 'DECLINED' &&
        contactMessage.type === 'AUTOBOOK' ? (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsUp size={18} />
            <p className='mx-2'>You are no longer booked for this work.</p>
          </div>
        ) : contactMessage.status === 'ACCEPTED' ? (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsUp size={18} />
            <p className='mx-2'>You are booked for this work.</p>
          </div>
        ) : contactMessage.status === 'AUTOBOOKED' ? (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsUp size={18} />
            <p className='mx-2'>
              The fixer automatically booked you for this work.
            </p>
          </div>
        ) : contactMessage.status === 'FINDINGDEP' ? (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsOk size={18} />
            <p className='mx-2'>
              You are currently booked for this work, however we are trying to
              find you a dep.
            </p>
          </div>
        ) : contactMessage.type === 'AVAILABILITY' &&
          (contactMessage.status === 'AVAILABLE' ||
            contactMessage.status === 'MIXED') ? (
          <div>
            <div className='flex flex-row items-center justify-center'>
              <TiThumbsOk size={18} />
              <p className='mx-2'>You are available for the following calls:</p>
            </div>
            <div className='my-2'>
              {contactMessage.calls
                .filter((i) =>
                  contactMessage.availableFor.includes(Number(i.id))
                )
                .map((i) => (
                  <p key={i.id}>
                    {DateTime.fromJSDate(new Date(i.startTime)).toFormat(
                      'HH:mm DD'
                    )}
                  </p>
                ))}
            </div>
          </div>
        ) : contactMessage.status === 'DECLINED' ? (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsDown size={18} />
            <p className='mx-2'>You declined this work.</p>
          </div>
        ) : (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsDown size={18} />
            <p className='mx-2'>You are not available for this work.</p>
          </div>
        )}
      </div>
      {(contactMessage.status === 'ACCEPTED' ||
        contactMessage.status === 'AUTOBOOKED') && (
        <button
          className='flex flex-row items-center justify-center rounded border p-1 text-sm hover:bg-slate-50'
          onClick={() => handleCalendar()}
        >
          <TiCalendarOutline />
          <p className='mx-1'>Add to Calendar</p>
        </button>
      )}
    </div>
  );
}
