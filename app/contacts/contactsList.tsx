import { EnsembleContact, EnsembleSection } from '@prisma/client';
import ContactCard from './contactCard';
import { FaCaretDown } from 'react-icons/fa';
import Link from 'next/link';

export type ContactsIndexProps = {
  contacts: (EnsembleContact & {
    section: EnsembleSection;
  })[];
  ensembleId: string;
  editContact: (arg: string) => void;
  sortContacts: string;
  setSortedContacts: (arg: string) => void;
};

export default function ContactsIndex(props: ContactsIndexProps) {
  const { setSortedContacts, contacts, editContact, sortContacts, ensembleId } = props;

  return (
    <div data-testid='contacts-index' className='m-1 my-4 w-full'>
      <h2 className='py-2 text-2xl'>Musicians</h2>
      <table
        data-testid='alphabetical-list'
        className='w-full overflow-scroll border'
      >
        <thead className='bg-slate-100'>
          <tr className='text-sm'>
            <th className='p-1 py-2 text-start'>
              <button
                onClick={() => setSortedContacts('Alphabetical')}
                className='flex flex-row items-center hover:text-gray-700'
              >
                Name
                {sortContacts.toLocaleLowerCase() === 'alphabetical' && (
                  <FaCaretDown />
                )}
              </button>
            </th>
            <th className='py-2 text-start'>
              <button
                onClick={() => setSortedContacts('Section')}
                className='flex flex-row items-center hover:text-gray-700'
              >
                Section
                {sortContacts.toLocaleLowerCase() === 'section' && (
                  <FaCaretDown />
                )}
              </button>
            </th>
            <th className='py-2 text-start'>
              <button
                onClick={() => setSortedContacts('Position')}
                className='flex flex-row items-center hover:text-gray-700'
              >
                Position
                {sortContacts.toLocaleLowerCase() === 'position' && (
                  <FaCaretDown />
                )}
              </button>
            </th>
            <th className='py-2 text-start'>
              <button
                onClick={() => setSortedContacts('Category')}
                className='flex flex-row items-center hover:text-gray-700'
              >
                Category
                {sortContacts.toLocaleLowerCase() === 'category' && (
                  <FaCaretDown />
                )}
              </button>
            </th>
            <th className='py-2 text-start'>
              <p>Email</p>
            </th>
            <th className='py-2 text-start'>
              <p>Phone</p>
            </th>
            <th className='py-2 text-start'></th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <div className='flex w-full flex-col items-center justify-center py-8'>
                  <h2 className='text-lg'>No contacts</h2>
                  <p className='text-sm'>Get started by adding your musicians.</p>
                  <Link 
                    className='text-sm border rounded hover:bg-slate-50 mt-6 p-1'
                    href={`/ensembles/${ensembleId}/contacts/import`}>
                      Add Musicians
                  </Link>
                </div>
              </td>
            </tr>
          ) : (
            contacts
              .sort((a, b) =>
                sortContacts.toLocaleLowerCase() === 'section'
                  ? a.section.name.localeCompare(b.section.name)
                  : sortContacts.toLocaleLowerCase() === 'position'
                    ? a.role.localeCompare(b.role)
                    : sortContacts.toLocaleLowerCase() === 'category'
                      ? a.category!.localeCompare(b.category!)
                      : a.lastName.localeCompare(b.lastName)
              )
              .map((i) => (
                <ContactCard
                  editContact={(arg) => editContact(arg)}
                  contact={i}
                  key={i.id}
                />
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}
