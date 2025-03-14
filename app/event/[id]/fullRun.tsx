import {
  Call,
  ContactEventCall,
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  EventSection,
  Orchestration,
} from '@prisma/client';
import { DateTime } from 'luxon';
import { instrumentSections } from '../../contacts/lib';

export type FullRunIndexProps = {
  calls: Call[];
  sections: (EventSection & {
    orchestration: Orchestration[];
    contacts: (ContactMessage & {
      eventCalls: (ContactEventCall & { call: Call })[];
      contact: EnsembleContact;
      //calls: Call[];
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
    <div
      data-testid='full-run-index'
      className='flex flex-col items-center justify-center p-2'
    >
      <table className='border-collapse text-sm'>
        <thead>
          <tr className='border-b text-xs'>
            <th className='border-b p-1 font-semibold'>Instrument</th>
            {calls.map((i) => (
              <th data-testid={`call-${i.id}`} className='p-1 px-2' key={i.id}>
                <p>
                  {DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm')}
                </p>
                <p>
                  {DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedSections.map((i) =>
            new Array(
              i.orchestration.sort(
                (a, b) => b.numRequired - a.numRequired
              )[0].numRequired
            )
              .fill(null)
              .map((_, index) => (
                <tr
                  data-testid={`${i.id}-${index}`}
                  className='border-b'
                  key={index}
                >
                  <td className='flex flex-row justify-between p-2'>
                    <p>{index === 0 && `${i.ensembleSection.name} `}</p>
                    <p className='ml-1'>{index + 1}</p>
                  </td>
                  {calls.map((j) => (
                    <td className='p-1' key={j.id}>
                      <div>
                        {i.orchestration.find(
                          (orch) => orch.callId === j.id
                        ) === undefined ||
                        i.orchestration.find((orch) => orch.callId === j.id)!
                          .numRequired <
                          index + 1 ? (
                          <p>N/A</p>
                        ) : (
                          i.contacts
                            .filter((c) =>
                              c.eventCalls
                                .filter((i) => i.status === 'ACCEPTED')
                                .map((z) => z.callId)
                                .includes(j.id)
                            ).filter((c, ind) => ind === index).map((c, ) => (
                              <p key={c.id}>
                                {`${c.contact.firstName} ${c.contact.lastName}`}
                  
                              </p>
                            ))
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}
