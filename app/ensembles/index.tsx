'use client';
import {
  Ensemble,
  EnsembleAdmin,
  EnsembleContact,
  EnsembleSection,
  User,
} from '@prisma/client';
import EnsembleManagement from './admin';
import EnsembleDashboard from './dashboard';
import ContactsIndex from '../contacts/contactsList';
import { useState } from 'react';
import CreateContactForm from '../contacts/createContactForm';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';

export type EnsembleIndexProps = {
  sections: (EnsembleSection & { contacts: EnsembleContact[] })[];
  ensemble: Ensemble;
  contacts: (EnsembleContact & { section: EnsembleSection })[];
  admins: (EnsembleAdmin & { user: User })[];
};

export default function EnsembleIndex(props: EnsembleIndexProps) {
  const { ensemble, contacts, sections, admins } = props;
  const [addContact, setAddContact] = useState<boolean | string>(false);
  const [sortContacts, setSortContacts] = useState<string>('Alphabetical');
  const [filterContacts, setFilterContacts] = useState<string[]>([
    'Member',
    'Extra',
  ]);

  const handleSubscribe = async () => {
    let response: AxiosResponse;
    ensemble.stripeSubscriptionId === null 
    ? response = await axios.post('/billing/api/manage', {subscriptionID: ensemble.stripeSubscriptionId})
    : response = await axios.post('/billing/api/manage', {subscriptionID: ensemble.stripeSubscriptionId});
    try {
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Checkout URL not returned');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred while processing your request.');
    } /* finally {
      setLoading(false);
    } */
  };

  

  return (
    <div data-testid='ensemble-index' className='w-full p-2 sm:px-4 lg:px-24'>
      <div className='flex flex-col justify-between lg:flex-row'>
        <div className='flex flex-col items-start'>
        <h1 className='m-4 text-3xl font-semibold'>{ensemble.name}</h1>
        {!ensemble.stripeSubscriptionId && <button className='border rounded py-1 px-2 text-sm' onClick={() => handleSubscribe()}>Subscribe</button>}
</div>
        <EnsembleDashboard
          ensemble={ensemble}
          filterContacts={filterContacts}
          setFilterContacts={(arg) => {
            filterContacts.includes(arg)
              ? setFilterContacts(filterContacts.filter((i) => i !== arg))
              : setFilterContacts([...filterContacts, arg]);
          }}
          setSortContacts={(arg) => setSortContacts(arg)}
          sortContacts={sortContacts}
          addContact={() => setAddContact(!addContact)}
        />
      </div>
      {addContact && (
        <CreateContactForm
          contact={
            addContact !== true
              ? contacts.find((i) => i.id === addContact)
              : undefined
          }
          closeForm={() => setAddContact(false)}
          sections={sections}
          ensembleId={ensemble.id}
        />
      )}
      <EnsembleManagement ensembleId={ensemble.id} admins={admins} />
      <ContactsIndex
        filterContacts={filterContacts}
        sortContacts={sortContacts}
        setSortedContacts={(sortStr) => setSortContacts(sortStr)}
        editContact={(arg) => setAddContact(arg)}
        sections={sections}
        contacts={contacts}
        ensembleId={ensemble.id}
      />
    </div>
  );
}
