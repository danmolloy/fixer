'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Ensemble, EnsembleSection } from '@prisma/client';
import ContactInput from './contactInput';

export type ImportFormProps = {
  ensemble: Ensemble & {
    sections: EnsembleSection[];
  };
};

export default function ImportForm(props: ImportFormProps) {
  const [data, setData] = useState<null|any[]>(null);
  const { ensemble } = props;
  const router = useRouter();
  
  const csvHeaders = [
    "First Name,Last Name,Email,Phone Number,Section,Role,Category",
    "Brett,Sturdy,brett@sturdy.com,07055281329,Double Bass,Tutti,Extra",
    "Gregory,Ievers,greg@ievers.com,07414281850,Viola,Principal,Member",
  ];
  const csvContent = csvHeaders.join("\n");

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "MusicianAddressBookTemplate.csv";
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true, // Assuming the CSV has a header row
      complete: (results: any) => {
        alert(JSON.stringify(results.data))
        const currentSections = ensemble.sections.map(i => i.name.toLowerCase().trim())
        
          for (let i = 0; i < results.data.length; i++) {
            const correspondingSection = results.data[i].Section 
            && ensemble.sections.find(
              (j) =>
                j.name.toLowerCase().trim() ===
                results.data[i].Section.toLowerCase().trim()
            ) 
            if (correspondingSection) {
              results.data[i].sectionId = correspondingSection.id;
            }
          } 
          setData(results.data); // Results will be an object with data as the parsed array
        
        }
    });
  };

  

  return (
    <div className=' flex flex-col items-center justify-center w-screen '>
      <h2 className='m-4  text-2xl'>Add Contacts</h2>
      {data === null 
      && <div className='flex flex-col items-center justify-center'>
      <button 
        className='border rounded border-blue-600 text-blue-600 hover:bg-blue-50 p-1 '
        onClick={() => setData([{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        sectionName: "",
        role: "",
        category: "",
      }])}>Add manually</button>
      <p>or</p>
      <div>
        <h3>Import Spreadsheet</h3>
      <input className='text-sm' type='file' onChange={handleFileUpload} /></div>
      <button className='border border-blue-600 text-blue-600 hover:bg-blue-50 rounded p-1 m-1' onClick={handleDownload}>Download Spreadsheet Template</button>
      </div>
      }
    <div className=' w-screen p-4'>
     {data && <ContactInput 
     ensembleId={ensemble.id}
      contacts={data.map((i, index) => ({
        firstName: i["First Name"],
        lastName: i["Last Name"],
        email: i["Email"],
        phoneNumber: i["Phone Number"],
        sectionName: i["Section"],
        role: i["Role"],
        category: i["Category"],
      }))} />}
      </div>
    </div>
  );
}
