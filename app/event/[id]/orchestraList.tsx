'use client';
import {
  Call,
  ContactEventCall,
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  EventSection,
  Orchestration,
} from '@prisma/client';
import { instrumentSections } from '../../contacts/lib';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { BsThreeDotsVertical } from 'react-icons/bs';

export type OrchestraListProps = {
  sections: (EventSection & {
    orchestration: Orchestration[];
    contacts: (ContactMessage & {
      eventCalls: (ContactEventCall & {
        call: Call;
      })[];
      contact: EnsembleContact;
    })[];
    ensembleSection: EnsembleSection;
  })[];
};

export const pdfOptions = {
  margin: 1,
  filename: 'orchestra_list.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
};

export default function OrchestraList(props: OrchestraListProps) {
  const { sections } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const playersRef = useRef(null);

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

  const getOrchList = () => {
    const orchList = playersRef.current;
    html2pdf().from(orchList).set(pdfOptions).save();
  };

  const sectionStatus = (section: (EventSection &  { 
    orchestration: Orchestration[], 
    ensembleSection: EnsembleSection,
    contacts: (ContactMessage & {
      eventCalls: (ContactEventCall & {
        call: Call
      })[]
      contact: EnsembleContact
    })[]
  })): {
    totalBooked: number
    numRequired: number
  } => {
      const totalBooked = section.contacts.reduce(
        (acc, j) =>
          acc +
          j.eventCalls.filter((k) => (k.status === 'ACCEPTED' || k.status === "AUTOBOOKED")).length,
        0
      )
      
      const numRequired = section.orchestration.reduce((acc, j) => acc + j.numRequired, 0)
      
     return { totalBooked, numRequired }
  }

  return (
    <div data-testid='orchestra-list' className='flex flex-col'>
      <div className='flex justify-end'>
        <button
          className='rounded border p-1 text-center text-black hover:bg-gray-50'
          onClick={() => {
            focus();
            setShowMenu(!showMenu);
          }}
          onBlur={() => setTimeout(() => setShowMenu(false), 250)}
        >
          <BsThreeDotsVertical />
          <p className='hidden'>Options</p>
        </button>
        {showMenu && (
          <div
            data-testid='options-menu'
            className='absolute -ml-10 mt-8 flex flex-col rounded border bg-white'
          >
            <button
              className='px-2 py-1 hover:bg-gray-50'
              onClick={() => getOrchList()}
            >
              Print List
            </button>
          </div>
        )}
      </div>

      <div ref={playersRef} className='flex flex-col'>
        {/* 1 */}{' '}
        {sections.length < 1 && (
          <div
            data-testid='help-msg'
            className='flex flex-col self-center text-center'
          >
            <h3 className='text-xl font-semibold'>No calls made.</h3>
            <p>To get started, fix sections in the Fixing tab.</p>
          </div>
        )}
        {sortedSections.map((i) => (
          <div data-testid={`${i.id}-section`} key={i.id} className='my-2'>
            <h3 className='font-semibold'>{i.ensembleSection.name}</h3>
            <ol>
              {i.contacts
                .filter((j) =>
                  j.eventCalls.map((c) => c.status).includes('ACCEPTED')
                )
                .sort((a, b) => a.indexNumber - b.indexNumber)
                .map((j) => (
                  <li className='text-sm' key={j.id}>
                    {`${j.contact.firstName} ${j.contact.lastName} (${j.position})`}
                  </li>
                ))}
              {sectionStatus(i).numRequired > sectionStatus(i).totalBooked && (
                new Array(
                  sectionStatus(i).numRequired - sectionStatus(i).totalBooked)
                  .fill(null)
                  .map((_, index) => (
                    <li
                      data-testid={`${i.id}-tbc`}
                      key={index}
                      className='text-sm'
                    >
                      TBC
                    </li>
                  ))
              )}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
