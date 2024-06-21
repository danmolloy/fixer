import { Field } from "formik"
import Link from "next/link"

export type EnsembleDashboardProps = {
  addContact: () => void
  sortContacts: "Alphabetical"|"Sections"
  setSortContacts: (arg: "Alphabetical"|"Sections") => void
  filterContacts: string[]
  setFilterContacts: (arg: "Member"|"Extra") => void
  ensembleId: string
}


export default function EnsembleDashboard(props: EnsembleDashboardProps) {
  const { ensembleId, addContact, sortContacts, setSortContacts, filterContacts, setFilterContacts } = props;

  return (
    <div data-testid="ensemble-dashboard" className="mx-2 my-1 flex flex-row items-center">
      
      <div className="m-2">
      Sort Contacts
      <fieldset>

  <div>
    <input type="radio" id="alphabetical" name="sort-contacts" value="Alphabetical" onChange={() => setSortContacts("Alphabetical")} checked={sortContacts === "Alphabetical"}/>
    <label htmlFor="alphabetical">Alphabetical</label>
  </div>

  <div>
    <input type="radio" id="sections" name="sort-contacts" value="Sections" onChange={() => setSortContacts("Sections")} checked={sortContacts === "Sections"}/>
    <label htmlFor="sections">Sections</label>
  </div>

</fieldset>


 </div>

      <div className="flex flex-col m-2">
        Filter:
      <label>
        <input 
          type="checkbox" 
          onChange={() => setFilterContacts("Member")}
          checked={filterContacts.includes("Member")} />
        Members
      </label>
      <label>
        <input 
          onChange={() => setFilterContacts("Extra")}
          checked={filterContacts.includes("Extra")}
          type="checkbox" />
        Extras
      </label>
      </div>
      <Link href={`/ensembles/${ensembleId}/contacts/import`}>
        Import from CSV
      </Link>
      <button onClick={() => addContact()} data-testid="add-contact-btn" className="m-2 px-2 py-1 h-8  rounded shadow text-white bg-indigo-600 hover:bg-indigo-500">
        Add Contact
      </button>
      <Link href={`/ensembles/${ensembleId}/admin/invite`}>
        Invite Admin
      </Link>
    </div>
  )
}