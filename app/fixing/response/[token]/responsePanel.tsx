'use client';
import {
  Call,
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  Event,
  EventSection,
  User,
} from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createEmailData } from '../../contactMessage/api/create/functions';
const url = `${process.env.URL}`;

export type ResponsePanelProps = {
  contactMessage: ContactMessage & {
    contact: EnsembleContact;
    eventSection: EventSection & {
      ensembleSection: EnsembleSection;
      event: Event & { fixer: User };
    };
    calls: Call[];
  };
  accepted: boolean | null;
  bookingOrAvailability: string;
  fixerName: string;
};

export default function ResponsePanel(props: ResponsePanelProps) {
  const { contactMessage, accepted, bookingOrAvailability, fixerName } = props;
  const router = useRouter();

  const handleResponse = async (response: boolean) => {
    let confMsg: boolean;
    if (
      response === true &&
      bookingOrAvailability.toLocaleLowerCase() === 'booking'
    ) {
      confMsg = confirm('Are you sure you want to ACCEPT this offer?');
    } else if (
      response !== true &&
      bookingOrAvailability.toLocaleLowerCase() === 'booking'
    ) {
      confMsg = confirm('Are you sure you want to DECLINE this offer?');
    } else if (
      response === true &&
      bookingOrAvailability.toLocaleLowerCase() !== 'booking'
    ) {
      confMsg = confirm(`
        Please confirm you are available for this work. 
        If the fixer requires you, you will get a further offer which you will need to confirm.
        `);
    } else {
      confMsg = confirm('Are you sure you are NOT available for this work?');
    }
    if (confMsg) {
      try {
        await axios
          .post(`/fixing/contactMessage/api/update`, {
            id: contactMessage.id,
            data: {
              accepted: response,
              acceptedDate: new Date(),
            },
          })
          .then(async () => {
            await axios.post(`/sendGrid`, {
              body: {
                emailData: createEmailData(contactMessage),
                templateID: 'd-49ff83e234f54edead44ec38921181c0',
                emailAddress: contactMessage.contact.email,
              },
            });
          })
          .then(() => {
            router.refresh();
          });
      } catch (e) {
        alert(`Error: ${e}`);
      }
    }
  };
  return (
    <div className='my-8 flex w-[90vw] flex-col items-center justify-center'>
      {bookingOrAvailability.toLocaleLowerCase() === 'booking' &&
      accepted === null ? (
        <div>
          <button
            onClick={() => handleResponse(false)}
            className='m-4 rounded bg-red-500 px-2 py-1 text-white shadow hover:bg-red-600'
          >
            Decline
          </button>
          <button
            onClick={() => handleResponse(true)}
            className='m-4 rounded bg-blue-500 px-2 py-1 text-white shadow hover:bg-blue-600'
          >
            Accept
          </button>
        </div>
      ) : bookingOrAvailability.toLocaleLowerCase() === 'booking' &&
        accepted !== null ? (
        <div>
          <h2>
            You have {accepted === true ? 'accepted' : 'declined'} this offer.
          </h2>
          <p className='text-sm'>
            If this was an error, contact {fixerName} directly.
          </p>
        </div>
      ) : (
        <div>
          {accepted !== null && (
            <div>
              <h2>
                You have indicated that you are {accepted !== true && 'not '}
                available for this work.
              </h2>
              <p>You can revise your response below.</p>
            </div>
          )}
          <p className='m-1 text-center text-sm font-semibold'>
            This work is{' '}
            {contactMessage.strictlyTied
              ? 'strictly tied'
              : 'not strictly tied'}
            .
          </p>
          <button className='m-1 rounded border border-amber-600 p-2 text-sm text-amber-600 hover:bg-amber-50'>
            No, I am not available
          </button>
          <button className='m-1 rounded border border-blue-600 p-2 text-sm text-blue-600 hover:bg-blue-50'>
            Yes, I am available
          </button>
        </div>
      )}
    </div>
  );
}
