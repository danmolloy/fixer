import axios from 'axios';
import { useRouter } from 'next/navigation';

export type ContactMenuProps = {
  contactId: string;
  editContact: (id: string) => void;
  setShowOptions: (arg: boolean) => void;
};

export default function ContactMenu(props: ContactMenuProps) {
  const { contactId, editContact, setShowOptions } = props;
  const router = useRouter();

  const deleteContact = async (contactId: string) => {
    return await axios
      .post('/contacts/api/archive', { id: contactId })
      .then(() => router.refresh());
  };

  return (
    <div
      data-testid='contact-options'
      className='absolute z-10 -ml-12 flex flex-col rounded border bg-white'
    >
      <button
        onClick={() => {
          document.body.scrollTop = 0;
          document.body.scrollTop = 0;
          editContact(contactId);
          setShowOptions(false);
        }}
        className='h-8 w-14 px-1 hover:bg-gray-50'
      >
        Edit
      </button>
      <button
        onClick={() => {
          deleteContact(contactId);
          setShowOptions(false);
        }}
        className='h-8 w-14 px-1 hover:bg-gray-50'
      >
        Delete
      </button>
    </div>
  );
}
