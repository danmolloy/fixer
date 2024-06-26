'use client'
import { Ensemble, EnsembleAdmin, EnsembleContact, EnsembleSection, User } from "@prisma/client";
import EnsembleManagement from "./admin";
import EnsembleDashboard from "./dashboard";
import ContactsIndex from "../contacts/contactsList";
import { useState } from "react";
import CreateContactForm from "../contacts/createContactForm";

export type EnsembleIndexProps = {
  sections: (EnsembleSection & {contacts: EnsembleContact[]})[]
  ensemble: Ensemble
  contacts: (EnsembleContact & {section: EnsembleSection})[]
  admins: (EnsembleAdmin & {user: User})[]
}

export default function EnsembleIndex(props: EnsembleIndexProps) {
  const { ensemble, contacts, sections, admins } = props;
  const [addContact, setAddContact] = useState<boolean|string>(false)
  const [sortContacts, setSortContacts] = useState<"Alphabetical"|"Sections">("Alphabetical")
  const [filterContacts, setFilterContacts] = useState<string[]>(["Member", "Extra"])

  return (
    <div data-testid="ensemble-index" className="p-2 w-full lg:w-4/5">
      <div className="flex flex-col lg:flex-row justify-between">
      <h1 className="m-4 font-semibold">{ensemble.name}</h1>
        <EnsembleDashboard
          ensembleId={ensemble.id} 
          filterContacts={filterContacts} 
          setFilterContacts={arg => {filterContacts.includes(arg) ? setFilterContacts(filterContacts.filter(i => i !== arg)) : setFilterContacts([...filterContacts, arg])}} 
          setSortContacts={(arg) => setSortContacts(arg)} 
          sortContacts={sortContacts} 
          addContact={() => setAddContact(!addContact)}/>
          </div>
          {addContact && <CreateContactForm contact={addContact !== true ? contacts.find(i => i.id === addContact): undefined} closeForm={() => setAddContact(false)} sections={sections} ensembleId={ensemble.id} />}
        <EnsembleManagement admins={admins}/> 
        <ContactsIndex filterContacts={filterContacts} sortContacts={sortContacts} editContact={(arg) => setAddContact(arg)} sections={sections} contacts={contacts} ensembleId={ensemble.id} />
    </div>
  )
}