import { DateTime } from 'luxon';
import prisma from '../../../../client';
import InfoDiv from '../../../event/[id]/infoDiv';
import CallTile from '../../../event/[id]/callTile';
import ResponseForm from './form';
import ResponseHeader from './header';
import ResponseConf from './responseConf';

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
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  const data = await getContactMessage(token);

  if (!data) {
    return <div>Error: Gig offer not found</div>;
  }

  return (
    <div className='-mb-16 flex w-full flex-col items-center justify-center bg-slate-50 py-12'>
      {data.status === 'AWAITINGREPLY' ? (
        <ResponseHeader
          type={data.type}
          fixerName={`${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName}`}
          contactFirstName={`${data.contact.firstName}`}
        />
      ) : (
        <ResponseConf contactMessage={data} />
      )}
      <table className='my-4 w-[95vw] rounded border md:w-2/3'>
        <tbody className={''}>
          <InfoDiv
            className='bg-slate-50'
            id='call-type'
            title='Call Type'
            value={
              data.type !== 'AVAILABILITY' ? 'Gig Offer' : 'Availability Check'
            }
          />
          <InfoDiv
            className='bg-white'
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
            className='flex w-full flex-col bg-white p-4 md:flex-row lg:items-center lg:justify-evenly'
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
            className='bg-white'
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
            className='bg-white'
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
            className='bg-white'
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
            className='bg-white'
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
          <InfoDiv
            className='bg-white text-sm text-slate-600'
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

      <div className='my-4 flex flex-col items-center justify-center'>
        {(data.status == 'AWAITINGREPLY' || data.type === 'AVAILABILITY') && (
          <ResponseForm
            contactMessage={data}
            fixerName={data.eventSection.event.fixerName!}
            type={data.type}
          />
        )}
        <p className='my-2 text-sm text-gray-600'>
          Please contact {data.eventSection.event.fixer.firstName}{' '}
          {data.eventSection.event.fixer.lastName} directly for any gig related
          queries or to change your response. <br /> For technical issues,
          please contact GigFix.
        </p>
      </div>
    </div>
  );
}
