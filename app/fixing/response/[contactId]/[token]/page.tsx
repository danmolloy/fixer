import { DateTime } from "luxon";
import prisma from "../../../../../client";
import InfoDiv from "../../../../event/[id]/infoDiv";
import CallTile from "../../../../event/[id]/callTile";
import ResponsePanel from "./responsePanel";

const getContactMessage = async (contactId: string, token: string) => {
  return await prisma.contactMessage.findUnique({
    where: {
      token: token,
    },
    include: {
      eventSection: {
        include: {
          ensembleSection: true,
          event: {
            include: {
              fixer: true
            }
          },
        }
      },
      calls: true,
      contact: true
    }
  })
}

export default async function GigResponse({ params }: { params: { contactId: string, token: string } }) {
  const { contactId, token } = params;
  const data = await getContactMessage(contactId, token);

  if (!data) {
    return (
      <div>Error: Gig offer not found</div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <h1>{data.bookingOrAvailability.toLocaleLowerCase() === "booking" ? "Gig Offer" : "Availability Check"}</h1>
       {data.accepted === null && <p>Please indicate your decision below.</p>}
      </div>
      <table className="w-[95vw] md:w-2/3 ">
        <tbody className={''}>
          <InfoDiv className='bg-slate-50'
          id='call-type'
          title='Call Type' value={data.bookingOrAvailability.toLocaleLowerCase() === "booking" ? "Gig Offer" : "Availability Check"} />
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
        className='bg-slate-50'
        id='position'
        title='Position'
        value={data.position}
      />
      <InfoDiv
        className=''
        id='event-dress'
        title='Dress'
        value={data.eventSection.event.dressCode}
      />
      <InfoDiv
        className='bg-slate-50'
        id='event-fee'
        title='Fee'
        value={data.eventSection.event.fee}
      />
      <InfoDiv
        className=''
        id='event-additional-info'
        title='Additional Info'
        value={data.eventSection.event.additionalInfo}
      />
      <InfoDiv
        className='bg-slate-50'
        id='event-fixer-name'
        title='Fixer'
        value={data.eventSection.event.fixerName}
      />
      <InfoDiv
        className=''
        id='event-fixer-name'
        title='Fixer Number'
        value={"0414 281 850"}
      />
      <InfoDiv
        className='bg-slate-50'
        id='event-fixer-name'
        title='Fixer email'
        value={"greg@ievers.com.au"}
      />
      
      <InfoDiv
        className=''
        id='personal-message'
        title='Personal Message'
        value={data.playerMessage}
      />
      <InfoDiv
        className=''
        id='section-message'
        title='Section Message'
        value={"Not specified"}
      />
      <InfoDiv
        className='text-sm text-slate-600'
        id='created-datetime'
        title='Event created'
        value={String(
          DateTime.fromJSDate(new Date(data.eventSection.event.createdAt)).toFormat('HH:mm DD')
        )}
      />
      <InfoDiv
        className='bg-slate-50 text-sm text-slate-600'
        id='updated-datetime'
        title='Last updated'
        value={String(
          DateTime.fromJSDate(new Date(data.eventSection.event.updatedAt)).toFormat('HH:mm DD')
        )}
      />
        </tbody>
      </table>
      <ResponsePanel 
        contactMessage={data}
        fixerName={data.eventSection.event.fixerName!}
        bookingOrAvailability={data.bookingOrAvailability} 
        accepted={data.accepted} 
         />
    </div>
  )
}