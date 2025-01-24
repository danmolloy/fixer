'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Papa from 'papaparse';
import { Ensemble, EnsembleSection } from '@prisma/client';
import ContactInput from './contactInput';
import { instrumentSections } from '../../../../contacts/lib';
import { faker } from '@faker-js/faker';
import { sectionNamesArr } from '../../../create/api/functions';

export type ImportFormProps = {
  ensemble: Ensemble & {
    sections: EnsembleSection[];
  };
  environment: string | undefined;
};

export default function ImportForm(props: ImportFormProps) {
  const [data, setData] = useState<null | any[]>(null);
  const { ensemble, environment } = props;
  const router = useRouter();

  const csvHeaders = [
    'First Name,Last Name,Email,Phone Number,Section,Role,Category',
    'Brett,Sturdy,brett@sturdy.com,07055281329,Double Bass,Tutti,Extra',
    'Gregory,Ievers,greg@ievers.com,07414281850,Viola,Principal,Member',
  ];
  const csvContent = csvHeaders.join('\n');

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MusicianAddressBookTemplate.csv';
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  const handleManually = () => {
    setData([
      {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        sectionName: '',
        role: '',
        category: '',
      },
    ]);
  };

  const handleSeeding = () => {
    alert(ensemble.sections[Math.floor(Math.random() * ensemble.sections.length)].id)
    const mockContacts = new Array(100).fill(null).map((i) => ({
      Section:
      ensemble.sections[Math.floor(Math.random() * ensemble.sections.length)].id,
      'First Name': faker.person.firstName(),
      'Last Name': faker.person.lastName(),
      Category: Math.random() > 0.5 ? 'Extra' : 'Member',
      Email: faker.internet.email(),
      'Phone Number': faker.phone.number({ style: 'international' }),
      Role: Math.random() > 0.3 ? 'Tutti' : 'Principal',
    }));
    console.log(mockContacts[0].Section)
    setData(mockContacts);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        alert(JSON.stringify(results.data));
        const currentSections = ensemble.sections.map((i) =>
          i.name.toLowerCase().trim()
        );

        for (let i = 0; i < results.data.length; i++) {
          const correspondingSection =
            results.data[i].Section &&
            ensemble.sections.find(
              (j) =>
                j.name.toLowerCase().trim() ===
                results.data[i].Section.toLowerCase().trim()
            );
          if (correspondingSection) {
            results.data[i].sectionId = correspondingSection.id;
          }
        }
        setData(results.data);
      },
    });
  };

  const handleBackBtn = () => {
    const conf = confirm(
      'Are you sure you want to go back? Any unsaved contacts will be lost.'
    );
    if (conf) {
      setData(null);
    }
  };

  return (
    <div
      data-testid='import-form'
      className='flex w-screen flex-col items-center justify-center'
    >
      <h2 className='m-4 text-2xl'>Add Contacts</h2>
      {data && <button onClick={() => handleBackBtn()}>Back</button>}
      {data === null && (
        <div>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-sm text-gray-700'>
              Add musicians to your address book by either entering their
              details manually or importing a spreadsheet. <br /> If importing a
              spreadsheet, please follow the format of the downloadable
              template.
            </p>
            <button
              className='m-4 rounded border px-2 py-1 text-sm hover:bg-slate-50'
              onClick={handleDownload}
            >
              Download Template
            </button>
          </div>

          <div className='flex w-screen flex-col items-center justify-evenly'>
            <div className='flex flex-col items-center text-sm'>
              {/*             <h3 className='text-sm '>Import Spreadsheet</h3>
               */}{' '}
              <input
                data-testid='spreadsheet-input'
                className='my-4 items-center text-gray-400 file:rounded file:border file:bg-white file:px-2 file:py-1 file:shadow-none file:hover:cursor-pointer file:hover:bg-slate-50'
                type='file'
                onChange={handleFileUpload}
              />
            </div>
            <div className='my-4 w-1/2 border-b border-slate-400' />
            <button
              className='rounded border px-2 py-1 text-sm hover:bg-slate-50'
              onClick={() => handleManually()}
            >
              <p>Enter manually</p>
            </button>
            {environment === 'preview' && (
              <div className='flex w-1/2 flex-col items-center'>
                <div className='my-4 w-full self-center border-b border-slate-400' />
                <button
                  className='rounded border px-2 py-1 text-sm hover:bg-slate-50'
                  onClick={() => handleSeeding()}
                >
                  <p>Seed Database</p>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className='m-1 w-screen p-1'>
        {data && (
          <ContactInput
          sections={ensemble.sections}
            ensembleId={ensemble.id}
            contacts={data.map((i, index) => ({
              firstName: i['First Name'],
              lastName: i['Last Name'],
              email: i['Email'],
              phoneNumber: i['Phone Number'],
              sectionId: i['Section'],
              role: i['Role'],
              category: i['Category'],
            }))}
          />
        )}
      </div>
    </div>
  );
}
