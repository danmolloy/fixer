'use client'
import { useRouter } from "next/navigation"
import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { Ensemble, EnsembleSection } from "@prisma/client";

export type ImportFormProps = {
  ensemble: Ensemble & {
    sections: EnsembleSection[]
  }
}


export default function ImportForm(props: ImportFormProps) {
  const [data, setData] = useState<any>([]);
  const { ensemble } = props;
  const router = useRouter()
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true, // Assuming the CSV has a header row
      complete: (results: any) => {
      //const currentSections = ensemble.sections.map(i => i.name.toLowerCase().trim())
        for (let i = 0; i < results.data.length; i ++) {
          results.data[i].sectionId = ensemble.sections.find(j => j.name.toLowerCase().trim() === (results.data[i].Section.toLowerCase().trim()))?.id
        }
        setData(results.data); // Results will be an object with data as the parsed array
      },
    });
  };

  const handleSubmit = async () => {
    return axios.post("/contacts/api/create/import", {
      ensembleId: ensemble.id,
      contacts: data
    }).then(() => {
      router.push(`/ensembles/${ensemble.id}`)
    })
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
            <table>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Role</th>
      <th>Section</th>
      <th>Section Id</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    {data.map((row, index) => (
      <tr key={index}>
        <td>{row['First Name'].trim()}</td>  {/* Access using bracket notation for spaces */}
        <td>{row['Last Name'].trim()}</td>
        <td>{row['Email'].trim()}  {/* Trim extra space in Email */}</td>
        <td>{row['Phone Number'].trim()}</td>
        <td>{row['Role']}</td>
        <td>{row['Section']}</td>
        <td>{row['sectionId']}</td>
        <td>{row['Category']}</td>
      </tr>
    ))}
  </tbody>
</table>
    <button className="disabled:opacity-40" disabled={data.length === 0} onClick={() => handleSubmit()}>
      Submit
    </button>
    </div>
  )
}