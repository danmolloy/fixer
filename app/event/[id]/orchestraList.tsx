import { ContactMessage, EnsembleContact, EnsembleSection, EventSection } from "@prisma/client"
import { instrumentSections } from "../../contacts/lib"
import { useRef } from "react"
import html2pdf from 'html2pdf.js';


export type OrchestraListProps = {
  sections: (EventSection & {
    contacts: (ContactMessage & {
      contact: EnsembleContact
    })[]
    ensembleSection: EnsembleSection
  })[]
}

export default function OrchestraList(props: OrchestraListProps) {
  const { sections } = props;
  const playersRef = useRef(null);


  const sortedSections = sections.map(i => ({
    ...i,
    indexNum: instrumentSections.find(j => j.name.toLowerCase() === i.ensembleSection.name.toLowerCase())!.index
  })).sort((a, b) => a.indexNum - b.indexNum)

  const getOrchList = () => {
    const orchList = playersRef.current;

    const options = {
      margin: 1,
      filename: 'orchestra_list.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(orchList).set(options).save();
  }

  return (
    <div className="flex flex-col">
      <button className="bg-black text-white rounded px-1 m-1 hover:bg-gray-700 self-end" onClick={() => getOrchList()}>Print List</button>
    <div ref={playersRef} className="flex flex-col ">
    <h2>Orchestra List</h2>
      {sections.filter(i => i.contacts.length > 0).length < 1 
      && <div className="flex flex-col self-center text-center">
          <h3 className="text-xl font-semibold">No calls made.</h3>
          <p>To get started, fix sections in the Fixing tab.</p>
        </div>}
            {sortedSections.map(i => (
              <div key={i.id}>
                <h3>{i.ensembleSection.name}</h3>
                <ol>
                  {i.contacts.filter(j => j.accepted === true).sort((a, b) => a.indexNumber - b.indexNumber).map(j => (
                    <li>
                      {`${j.contact.firstName} ${j.contact.lastName} (${j.position})`}
                    </li>
                  ))}
                  {new Array(i.numToBook - i.contacts.filter(j => j.accepted === true).length).fill(
                    <li>TBC</li>
                  )}
                </ol>
              </div>
            ))}
    </div>
    </div>
  )
}