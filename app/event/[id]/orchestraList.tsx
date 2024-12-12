import {
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  EventSection,
} from '@prisma/client';
import { instrumentSections } from '../../contacts/lib';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { BsThreeDotsVertical } from 'react-icons/bs';

export type OrchestraListProps = {
  sections: (EventSection & {
    contacts: (ContactMessage & {
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
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const playersRef = useRef(null);

  const sortedSections = sections
    .map((i) => ({
      ...i,
      indexNum: instrumentSections.find(
        (j) => j.name.toLowerCase() === i.ensembleSection.name.toLowerCase()
      )!.index,
    }))
    .sort((a, b) => a.indexNum - b.indexNum);

  const getOrchList = () => {
    const orchList = playersRef.current;

    html2pdf().from(orchList).set(pdfOptions).save();
  };

  return (
    <div data-testid='orchestra-list' className='flex flex-col'>

<div className=' flex justify-end'>
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
                className='mt-8 absolute -ml-10 flex flex-col rounded border bg-white'
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

      
      <div ref={playersRef} className=' flex flex-col'>
{/* 1 */}        {sections.filter((i) => i.contacts.length > 0).length < 1 && (
          <div
            data-testid='help-msg'
            className='flex flex-col self-center text-center'
          >
            <h3 className='text-xl font-semibold'>No calls made.</h3>
            <p>To get started, fix sections in the Fixing tab.</p>
          </div>
        )}
        {sortedSections
          .filter((i) => i.contacts.length > 0)
          .map((i) => (
            <div data-testid={`${i.id}-section`} key={i.id} className='my-2'>
              <h3 className='font-semibold'>{i.ensembleSection.name}</h3>
              <ol>
                {i.contacts
                  .filter((j) => (j.status === "ACCEPTED" || j.status === "AUTOBOOKED"))
                  .sort((a, b) => a.indexNumber - b.indexNumber)
                  .map((j) => (
                    <li className='text-sm' key={j.id}>
                      {`${j.contact.firstName} ${j.contact.lastName} (${j.position})`}
                    </li>
                  ))}
                {i.numToBook - i.contacts.filter((j) => (j.status === "ACCEPTED" || j.status === "AUTOBOOKED")).length === 0 
                ? null
                : i.numToBook - i.contacts.filter((j) => (j.status === "ACCEPTED" || j.status === "AUTOBOOKED")).length < 0 
                ? <p className='font-bold'>Overbooked by {i.contacts.filter((j) => (j.status === "ACCEPTED" || j.status === "AUTOBOOKED")).length - i.numToBook} </p>
                : new Array(
                  i.numToBook
                )
                  .fill(null)
                  .map((_, index) => (
                    <li
                      data-testid={`${i.id}-tbc`}
                      key={index}
                      className='text-sm'
                    >
                      TBC
                    </li>
                  ))}
              </ol>
            </div>
          ))}
      </div>
    </div>
  );
}
