import { Call, ContactMessage, EnsembleContact, EnsembleSection, EventSection } from "@prisma/client"
import { DateTime } from "luxon";
import { instrumentSections } from "../../contacts/lib";
import { X } from "@faker-js/faker/dist/airline-BLb3y-7w";

export type FullRunIndexProps = {
  calls: Call[]
  sections: (EventSection & {
    contacts: (ContactMessage & {
      contact: EnsembleContact;
      calls: Call[]
    })[];
    ensembleSection: EnsembleSection;
  })[];
}

export default function FullRunIndex(props: FullRunIndexProps) {
  const {calls, sections} = props;

  const sortedSections = sections
    .map((i) => ({
      ...i,
      indexNum: instrumentSections.find(
        (j) => j.name.toLowerCase() === i.ensembleSection.name.toLowerCase()
      )!.index,
    }))
    .sort((a, b) => a.indexNum - b.indexNum);

    const zeroIndContact = (section, call) => {
      return section.contacts
      .filter((c, ind) => c.accepted === true 
        && c.bookingOrAvailability === "Booking" 
        && c.calls.map(m => m.id).includes(call.id)
        )
    } 

  return (
    <div className=" p-2 flex flex-col items-center justify-center">
      <table className="text-sm border border-collapse">
        <tr className='text-xs border bg-slate-50'>
          <th className="p-1 border">Instrument</th>
          {calls.map((i) => (
            <th className="p-1 border" key={i.id} >
              <p>
                {DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm')}
              </p>
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}</p>
            </th>
          ))}
        </tr>
        {sortedSections.filter(i => i.numToBook > 0).map(i => (
          new Array(i.numToBook).fill(null)
          .map((_, index) => (
            <tr>
              <td className="border flex flex-row p-1 justify-between">
                <p>{index === 0 &&`${i.ensembleSection.name} `}</p>
                <p className="ml-1">{index + 1}</p>
              </td>
              {calls.map((j) => (
              <td className="border p-1" key={j.id} >
                <p>
                {i.contacts.filter(c => (
                  c.accepted === true 
                  && c.bookingOrAvailability === "Booking"
                  && c.calls.map(z => z.id).includes(j.id))) 
                  .map((c, ind) => (
                    <p>{ind === index && `${c.contact.firstName} ${c.contact.lastName}`}</p>
                  ))}
                </p>
              </td>
           ))}
            </tr>
          ))
        ))}
      </table>
    </div>
  )
}