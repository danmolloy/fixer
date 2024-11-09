import { EnsembleContact, EnsembleSection } from '@prisma/client';
import ContactCard from './contactCard';
import Link from 'next/link';
import { FaCaretDown } from 'react-icons/fa';

export type ContactsIndexProps = {
  contacts: (EnsembleContact & {
    section: EnsembleSection;
  })[];
  ensembleId: string;
  sections: (EnsembleSection & { contacts: EnsembleContact[] })[];
  editContact: (arg: string) => void;
  sortContacts: string;
  setSortedContacts: (arg: string) => void;
  filterContacts: string[];
};

export default function ContactsIndex(props: ContactsIndexProps) {
  const {
    setSortedContacts,
    sections,
    contacts,
    editContact,
    sortContacts,
    filterContacts,
  } = props;

  return (
    <div data-testid='contacts-index' className='m-1 w-full'>
      <h2>Musicians</h2>
      {
        contacts.filter(
          (i) => i.category === null || filterContacts.includes(i.category)
        ).length === 0 ? (
          <p>No contacts</p>
        ) : (
          /* sortContacts === 'Alphabetical' ? */ <table
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
              {contacts
                .filter(
                  (i) =>
                    i.category === null || filterContacts.includes(i.category)
                )
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
                ))}{' '}
            </tbody>
          </table>
        ) /* : (
        sections
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((i) => (
            <div data-testid={`${i.id}-section`} key={i.id} className='py-2'>
              <div className='flex flex-col justify-between lg:flex-row '>
                <h2 className='font-medium'>{i.name}</h2>
                <Link href={`/ensembles/section/${i.id}/edit`} className=''>
                  Edit
                </Link>
              </div>

              {i.contacts.filter(
                (i) =>
                  i.category === null || filterContacts.includes(i.category)
              ).length === 0 ? (
                <p>No contacts</p>
              ) : (
                <table
                  data-testid='alphabetical-list'
                  className='overflow-scroll'
                >
                  <thead>
                    <tr className='text-sm'>
                      <th>Name</th>
                      <th>Section</th>
                      <th>Position</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {i.contacts
                      .filter(
                        (i) =>
                          i.category === null ||
                          filterContacts.includes(i.category)
                      )
                      .sort((a, b) => a.lastName.localeCompare(b.lastName))
                      .sort((a, b) => a.indexNumber - b.indexNumber)
                      .sort((a, b) => a.role.localeCompare(b.role))
                      .sort((a, b) => a.category!.localeCompare(b.category!))
                      .map((contact) => (
                        <ContactCard
                          editContact={(arg) => editContact(arg)}
                          contact={{ ...contact, section: i }}
                          key={contact.id}
                        />
                      ))}{' '}
                  </tbody>
                </table>
              )}
            </div>
          ))
      ) */
      }
    </div>
  );
}
