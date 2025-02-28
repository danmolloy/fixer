import { EnsembleContact } from '@prisma/client';

export type DiaryContactProps = {
  contact: EnsembleContact;
  setSelectContact: () => void;
  disabled: boolean;
};

export default function DiaryContact(props: DiaryContactProps) {
  const { disabled, contact, setSelectContact } = props;
  return (
    <tr
      data-testid={`${contact.id}-contact-tile`}
      className={`hover:cursor-pointer ${disabled && 'cursor-pointer opacity-30'} h-8 text-sm hover:bg-slate-50`}
      onClick={(e) => {
        e.preventDefault();
        !disabled && setSelectContact();
      }}
    >
      <td className=''>
        <div
          className={`m-2 hidden h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white sm:flex ${contact.category!.toLowerCase() === 'member' && 'bg-orange-500'} `}
        >
          {contact.firstName[0]}
          {contact.lastName[0]}
        </div>
      </td>
      <td className='text-start'>
        <p>
          {contact.firstName} {contact.lastName}
        </p>
      </td>
      <td className='text-start'>
        <p>{contact.category}</p>
      </td>
      <td className='text-start'>
        <p className=''>{contact.role}</p>
      </td>
    </tr>
  );
}
