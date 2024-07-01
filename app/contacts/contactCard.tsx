import { EnsembleContact, EnsembleSection } from "@prisma/client"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import ContactMenu from "./contactMenu";


export type ContactCardProps = {
  contact: (EnsembleContact & {section: EnsembleSection})
  editContact: (arg: string) => void
}

export default function ContactCard(props: ContactCardProps) {
  const { contact, editContact } = props;
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div data-testid="contact-card" className="border m-1 rounded p-1 w-full flex flex-row justify-between ">
      <div className="flex flex-row">
      <div 
        className={`w-8 h-8 rounded-full m-2 text-white bg-indigo-500 flex items-center justify-center ${contact.category!.toLowerCase() === "member" && "bg-orange-500"} `}>
        {contact.firstName[0]}{contact.lastName[0]}
      </div>
      <div>
        <p>{contact.firstName} {contact.lastName}</p>
        <p>({contact.category}) <span data-testid="index-num">{contact.indexNumber}</span></p>
      </div>
      </div>
      <div>
        <p>{contact.section.name}</p>
      </div>
      <div>
        <p>{contact.role} </p>
      </div>
      <div className="flex flex-col text-start">
        <p>{contact.email}</p>
        <p>{contact.phoneNumber}</p>
      </div>
      <div>
      <button onClick={() => setShowMenu(!showMenu)}>
        <BsThreeDotsVertical />
        <p className="hidden">Contact Options</p>
      </button>
      {showMenu && <ContactMenu setShowOptions={(arg) => setShowMenu(arg)} editContact={(arg) => editContact(arg)} contactId={contact.id}/>}
      </div>
    </div>
  )
}