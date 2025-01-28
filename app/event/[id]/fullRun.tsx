import {
  Call,
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  EventSection,
} from '@prisma/client';
import { DateTime } from 'luxon';
import { instrumentSections } from '../../contacts/lib';

export type FullRunIndexProps = {
  calls: Call[];
  sections: (EventSection & {
    contacts: (ContactMessage & {
      contact: EnsembleContact;
      calls: Call[];
    })[];
    ensembleSection: EnsembleSection;
  })[];
};

export default function FullRunIndex(props: FullRunIndexProps) {
  const { calls, sections } = props;

  const sortedSections = sections
  .map((i) => ({
    ...i,
    indexNum: instrumentSections.find(
      (j) =>
        j.name.replace(/\s/g, '').toLowerCase() ===
        i.ensembleSection.name.replace(/\s/g, '').toLowerCase()
    )!.index,
  }))
    .sort((a, b) => a.indexNum - b.indexNum);

  if (sections.length === 0) {
    return (
      <div
        data-testid='help-msg'
        className='mt-6 flex flex-col self-center text-center'
      >
        <h3 className='text-lg font-semibold'>No calls made.</h3>
        <p className='text-sm'>
          To get started, fix sections in the Fixing tab.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center p-2'>
      <table className='border-collapse  text-sm '>
        <tr className='border-b text-xs  '>
          <th className='border-b p-1 font-semibold'>Instrument</th>
          {calls.map((i) => (
            <th className=' p-1 px-2' key={i.id}>
              <p>
                {DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm')}
              </p>
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}</p>
            </th>
          ))}
        </tr>
        {sortedSections
          .filter((i) => i.numToBook > 0)
          .map((i) =>
            new Array(i.numToBook).fill(null).map((_, index) => (
              <tr className='border-b' key={index}>
                <td className='flex flex-row justify-between p-2'>
                  <p>{index === 0 && `${i.ensembleSection.name} `}</p>
                  <p className='ml-1'>{index + 1}</p>
                </td>
                {calls.map((j) => (
                  <td className=' p-1' key={j.id}>
                    <p>
                      {i.contacts
                        .filter(
                          (c) =>
                            (c.status === 'ACCEPTED' ||
                              c.status === 'AUTOBOOKED' ||
                              c.status === 'FINDINGDEP') &&
                            c.type !== 'AVAILABILITY' &&
                            c.calls.map((z) => z.id).includes(j.id)
                        )
                        .map((c, ind) => (
                          <p key={c.id}>
                            {ind === index &&
                              `${c.contact.firstName} ${c.contact.lastName}`}
                          </p>
                        ))}
                    </p>
                  </td>
                ))}
              </tr>
            ))
          )}
      </table>
    </div>
  );
}
