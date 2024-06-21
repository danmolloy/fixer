import { EnsembleContact, EnsembleSection } from "@prisma/client"
import ContactCard from "./contactCard";
import CreateContactForm from "./createContactForm";
import { Formik } from "formik";
import { useState } from "react";
import EditSection from "../ensembles/section/edit";

export type ContactsIndexProps = {
  contacts: (EnsembleContact & {
    section: EnsembleSection
  })[]
  ensembleId: string
  sections: (EnsembleSection & {contacts: EnsembleContact[]})[] 
  editContact: (arg: string) => void
  sortContacts: "Alphabetical"|"Sections"
  filterContacts: string[]
}

export default function ContactsIndex(props: ContactsIndexProps) {
  const { sections, contacts, editContact, sortContacts, filterContacts } = props;
  const [editSection, setEditSection] = useState<string|null>(null)


  return (
    <div data-testid="contacts-index" className=" w-full">
      {contacts.filter(i => i.category === null || filterContacts.includes(i.category)).length === 0 
      ? <p>No contacts</p>
      : sortContacts === "Alphabetical"
      ? contacts.filter(i => i.category === null || filterContacts.includes(i.category)).sort((a, b) => a.lastName.localeCompare(b.lastName)).map(i => (
        <ContactCard editContact={(arg) => editContact(arg)} contact={i} key={i.id} />
      )) 
      : sections.sort((a, b) => a.name.localeCompare(b.name)).map(i => (
        <div key={i.id} className="py-2">
          <div className="flex flex-col lg:flex-row justify-between">
            <h2 className="font-medium">{i.name}</h2>
            <button onClick={() => {editSection === i.id ? setEditSection(null) : setEditSection(i.id)}} className="bg-indigo-600 text-white h-7 px-2 rounded shadow hover:bg-indigo-500 w-12 m-1">Edit</button>
          </div>
          {editSection === i.id && <EditSection section={i} setEditSection={() => setEditSection(null)} />}
          {i.contacts.filter(i => i.category === null || filterContacts.includes(i.category)).length === 0 
          ? <p>No contacts</p>
          : i.contacts.filter(i => i.category === null || filterContacts.includes(i.category)).sort((a, b) => a.lastName.localeCompare(b.lastName)).map(contact => (
            <ContactCard editContact={(arg) => editContact(arg)} contact={{...contact, section: i}} key={contact.id} />
          )) }
        </div>
      )) }
    </div>
  )
}