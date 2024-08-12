import { EnsembleContact, EnsembleSection } from "@prisma/client"
import ContactCard from "./contactCard";
import Link from 'next/link'

export type ContactsIndexProps = {
  contacts: (EnsembleContact & {
    section: EnsembleSection
  })[]
  ensembleId: string
  sections: (EnsembleSection & {contacts: EnsembleContact[]})[] 
  editContact: (arg: string) => void
  sortContacts: string
  filterContacts: string[]
}

export default function ContactsIndex(props: ContactsIndexProps) {
  const { sections, contacts, editContact, sortContacts, filterContacts } = props;


  return (
    <div data-testid="contacts-index" className=" w-full m-1">
      <h2>Musicians</h2>
      {contacts.filter(i => i.category === null || filterContacts.includes(i.category)).length === 0 
      ? <p>No contacts</p>
      : sortContacts === "Alphabetical"
      ? <div data-testid="alphabetical-list">
        {contacts.filter(i => i.category === null || filterContacts.includes(i.category)).sort((a, b) => a.lastName.localeCompare(b.lastName)).map(i => (
        <ContactCard editContact={(arg) => editContact(arg)} contact={i} key={i.id} />
      ))} </div>
      : sections.sort((a, b) => a.name.localeCompare(b.name)).map(i => (
        <div data-testid={`${i.id}-section`} key={i.id} className="py-2">
          <div className="flex flex-col lg:flex-row justify-between">
            <h2 className="font-medium">{i.name}</h2>
            <Link href={`/ensembles/section/${i.id}/edit`} className="">Edit</Link>
          </div>
          
          {i.contacts.filter(i => i.category === null || filterContacts.includes(i.category)).length === 0 
          ? <p>No contacts</p>
          : i.contacts.filter(i => i.category === null || filterContacts.includes(i.category)).sort((a, b) => (
            a.lastName.localeCompare(b.lastName))).sort((a,b) => a.indexNumber - b.indexNumber).sort((a, b) => (
              a.role.localeCompare(b.role))).sort((a, b) => (
                a.category!.localeCompare(b.category!)
              )).map(contact => (
            <ContactCard editContact={(arg) => editContact(arg)} contact={{...contact, section: i}} key={contact.id} />
          )) 
          }
        </div>
      )) }
    </div>
  )
}