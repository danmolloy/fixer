import { DateTime } from 'luxon';
import prisma from '../../../../client';
import InfoDiv from '../../../event/[id]/infoDiv';
import CallTile from '../../../event/[id]/callTile';
import ResponsePanel from './responsePanel';
import ResponseForm from './form';

const getContactMessage = async (token: string) => {
  const contactMessage = await prisma.contactMessage.findUnique({
    where: {
      token: token,
    },
    include: {
      eventSection: {
        include: {
          ensembleSection: true,
          event: {
            include: {
              fixer: true,
            },
          },
        },
      },
      calls: true,
      contact: true,
    },
  });
  console.log(contactMessage);
  return contactMessage;
};

export default async function GigResponse({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  const data = await getContactMessage(token);

  if (!data) {
    return <div>Error: Gig offer not found</div>;
  }

  return (
    <div className='flex w-full flex-col items-center justify-center py-12'>
      <div className='p-2 text-center'>
        <h1 className='text-3xl font-semibold'>
          {data.bookingOrAvailability.toLocaleLowerCase() === 'booking'
            ? 'Gig Offer'
            : 'Availability Check'}
        </h1>
        {data.accepted === null && (
          <p className='my-2 text-sm'>
            Hi {data.contact.firstName}, please indicate your decision below.
          </p>
        )}
      </div>
      <table className='w-[95vw] md:w-2/3'>
        <tbody className={''}>
          <InfoDiv
            className='bg-slate-50'
            id='call-type'
            title='Call Type'
            value={
              data.bookingOrAvailability.toLocaleLowerCase() === 'booking'
                ? 'Gig Offer'
                : 'Availability Check'
            }
          />
          <InfoDiv
            className=''
            id='event-status'
            title='Status'
            value={data.eventSection.event.confirmedOrOnHold.toLocaleUpperCase()}
          />
          <InfoDiv
            className='bg-slate-50'
            id='ensemble-name'
            title='Ensemble'
            value={data.eventSection.event.ensembleName}
          />
          <tr
            data-testid='calls-row'
            className='flex w-full flex-col p-4 md:flex-row lg:items-center lg:justify-evenly'
          >
            <td className='text-sm text-slate-600 md:w-1/2'>
              {data.calls.length} Call(s)
            </td>
            <td className='md:w-1/2'>
              {data.calls
                .sort(
                  (a, b) =>
                    Number(DateTime.fromJSDate(new Date(a.startTime))) -
                    Number(DateTime.fromJSDate(new Date(b.startTime)))
                )
                .map((i) => (
                  <CallTile {...i} key={i.id} />
                ))}
            </td>
          </tr>
          <InfoDiv
            className='bg-slate-50'
            id='event-program'
            title='Program'
            value={data.eventSection.event.concertProgram}
          />
          <InfoDiv
            className=''
            id='position'
            title='Position'
            value={data.position}
          />
          <InfoDiv
            className='bg-slate-50'
            id='event-dress'
            title='Dress'
            value={data.eventSection.event.dressCode}
          />
          <InfoDiv
            className=''
            id='event-fee'
            title='Fee'
            value={data.eventSection.event.fee}
          />
          <InfoDiv
            className='bg-slate-50'
            id='event-additional-info'
            title='Additional Info'
            value={data.eventSection.event.additionalInfo}
          />
          <InfoDiv
            className=''
            id='event-fixer-name'
            title='Fixer'
            value={`${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName}`}
          />
          <InfoDiv
            className='bg-slate-50'
            id='event-fixer-number'
            title='Fixer Number'
            value={data.eventSection.event.fixer.mobileNumber}
          />
          <InfoDiv
            className=''
            id='event-fixer-email'
            title='Fixer email'
            value={data.eventSection.event.fixer.email}
          />

          <InfoDiv
            className='bg-slate-50'
            id='personal-message'
            title='Personal Message'
            value={data.playerMessage}
          />
          {/* <InfoDiv
        className='bg-slate-50'
        id='section-message'
        title='Section Message'
        value={data.eventSection.}
      /> */}
          <InfoDiv
            className='text-sm text-slate-600'
            id='created-datetime'
            title='Event created'
            value={String(
              DateTime.fromJSDate(
                new Date(data.eventSection.event.createdAt)
              ).toFormat('HH:mm DD')
            )}
          />
          <InfoDiv
            className='bg-slate-50 text-sm text-slate-600'
            id='updated-datetime'
            title='Last updated'
            value={String(
              DateTime.fromJSDate(
                new Date(data.eventSection.event.updatedAt)
              ).toFormat('HH:mm DD')
            )}
          />
        </tbody>
      </table>
      <div className='my-4'>
        {data.accepted !== null &&
        data.bookingOrAvailability.toLocaleLowerCase() === 'booking' ? (
          <div>
            <h2 className='text-sm'>
              You have {data.accepted === true ? 'accepted' : 'declined'} this
              offer.
            </h2>
            <p className='text-sm'>
              If this was an error, contact{' '}
              {`${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName}`}{' '}
              directly.
            </p>
          </div>
        ) : (
          <div>
            {data.accepted !== null &&
              data.bookingOrAvailability.toLocaleLowerCase() !== 'booking' && (
                <div className='text-sm'>
                  {data.accepted === false ? (
                    <h2 className='text-sm'>
                      You have indicated that you are not available for this
                      work.
                    </h2>
                  ) : data.strictlyTied ? (
                    <h2 className='text-sm'>
                      You have indicated that you are available for this work.
                    </h2>
                  ) : (
                    <div>
                      <h2 className='text-sm'>
                        You have indicated that you are available for the
                        following:
                      </h2>
                      <div className='my-2'>
                        {data.calls
                          .filter((i) =>
                            data.availableFor.includes(Number(i.id))
                          )
                          .map((i) => (
                            <p key={i.id}>
                              {DateTime.fromJSDate(
                                new Date(i.startTime)
                              ).toFormat('HH:mm DD')}
                            </p>
                          ))}
                      </div>
                    </div>
                  )}
                  <p>You can revise your response below.</p>
                </div>
              )}
            <ResponseForm
              contactMessage={data}
              fixerName={data.eventSection.event.fixerName!}
              bookingOrAvailability={data.bookingOrAvailability}
              accepted={data.accepted}
            />
          </div>
        )}
        {/* <ResponsePanel 
        contactMessage={data}
        fixerName={data.eventSection.event.fixerName!}
        bookingOrAvailability={data.bookingOrAvailability} 
        accepted={data.accepted} 
         /> */}
      </div>
    </div>
  );
}
