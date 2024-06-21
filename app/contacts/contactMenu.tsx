import axios from "axios";
import { useRouter } from "next/navigation";

export type ContactMenuProps = {
  contactId: string
  editContact: (id: string) => void
  setShowOptions: (arg: boolean) => void
}

export default function ContactMenu(props: ContactMenuProps) {
  const { contactId, editContact, setShowOptions } = props;
  const router = useRouter()


  const deleteContact = async (contactId: string) => {
    return await axios.post("/contact/api/archive", {id: contactId}).then(() => router.refresh())
  }

  return (
    <div  data-testid="contact-options" className=" bg-white absolute z-10  flex flex-col border">
      <button onClick={() => {editContact(contactId); setShowOptions(false)}} className="w-14 h-8 hover:bg-gray-200 px-1">
        Edit
      </button>
      <button onClick={() => {deleteContact(contactId); setShowOptions(false)}} className="w-14 h-8 hover:bg-gray-200 px-1">
        Delete
      </button> 
    </div>
  )
}