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
      className={`hover:cursor-pointer ${disabled && 'opacity-30 cursor-pointer'} text-sm hover:bg-slate-50  h-8`}
      onClick={(e) => {
        e.preventDefault();
        !disabled
        && setSelectContact();
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
      {/* <td>
        <button
          data-testid={`${contact.id}-select-btn`}
          disabled={disabled}
          className='m-1 rounded border px-2 py-1 text-sm hover:bg-gray-50'
          onClick={(e) => {
            e.preventDefault();
            setSelectContact();
          }}
        >
          Select
        </button>
      </td> */}
    </tr>
  );
}
