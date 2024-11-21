import { Call } from '@prisma/client';
import { DateTime } from 'luxon';
import { TiThumbsOk, TiThumbsUp, TiThumbsDown } from 'react-icons/ti';

export type ResponseConfProps = {
  bookingOrAvailability: string;
  accepted: boolean | null;
  contactMessageCalls: Call[];
  availableFor: number[];
};

export default function ResponseConf(props: ResponseConfProps) {
  const { bookingOrAvailability, accepted, availableFor, contactMessageCalls } =
    props;

  return (
    <div className='my-4 flex w-[95vw] flex-col items-center justify-center rounded border bg-white p-2 shadow md:w-2/3'>
      <h2>Response received.</h2>
      <div className='my-4 text-center text-gray-700'>
        {bookingOrAvailability.toLocaleLowerCase() === 'booking' &&
        accepted === true ? (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsUp size={18} />
            <p className='mx-2'>You have accepted this work.</p>
          </div>
        ) : bookingOrAvailability.toLocaleLowerCase() === 'availability' &&
          accepted === true ? (
          <div>
            <div className='flex flex-row items-center justify-center'>
              <TiThumbsOk size={18} />
              <p className='mx-2'>You are available for the following calls:</p>
            </div>
            <div className='my-2'>
              {contactMessageCalls
                .filter((i) => availableFor.includes(Number(i.id)))
                .map((i) => (
                  <p key={i.id}>
                    {DateTime.fromJSDate(new Date(i.startTime)).toFormat(
                      'HH:mm DD'
                    )}
                  </p>
                ))}
            </div>
          </div>
        ) : bookingOrAvailability.toLocaleLowerCase() === 'booking' &&
          accepted === true ? (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsDown size={18} />
            <p className='mx-2'>You have declined this work.</p>
          </div>
        ) : (
          <div className='flex flex-row items-center justify-center'>
            <TiThumbsDown size={18} />
            <p className='mx-2'>You are not available for this work.</p>
          </div>
        )}
      </div>
    </div>
  );
}
