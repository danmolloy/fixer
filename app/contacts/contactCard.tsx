import { EnsembleContact, EnsembleSection } from '@prisma/client';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import ContactMenu from './contactMenu';

export type ContactCardProps = {
  contact: EnsembleContact & { section: EnsembleSection };
  editContact: (arg: string) => void;
};

export default function ContactCard(props: ContactCardProps) {
  const { contact, editContact } = props;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr
      data-testid='contact-card'
      className='m-1 w-full rounded border-b text-xs sm:text-sm'
    >
      <td className='flex flex-row px-1 py-2'>
        
        <div>
          <p>
            {contact.firstName} {contact.lastName}
          </p>
          
        </div>
      </td>
      <td>
        <p>{contact.section.name}</p>
      </td>
      <td>
        <p>{contact.role} </p>
      </td>
      <td>{contact.category}</td>
      <td>
        <p className='flex flex-col text-start'>{contact.email}</p>
      </td>
      <td>
        <p className='flex flex-col text-start'>{contact.phoneNumber}</p>
      </td>
      <td>
        <button
          onClick={() => {
            focus();
            setShowMenu(!showMenu);
          }}
          onBlur={() => setTimeout(() => setShowMenu(false), 250)}
        >
          <BsThreeDotsVertical />
          <p className='hidden'>Contact Options</p>
        </button>
        {showMenu && (
          <ContactMenu
            setShowOptions={(arg) => setShowMenu(arg)}
            editContact={(arg) => editContact(arg)}
            contactId={contact.id}
          />
        )}
      </td>
    </tr>
  );
}
