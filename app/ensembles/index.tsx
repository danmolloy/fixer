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
import { AxiosResponse } from 'axios';
import { getBillingRoute } from '../billing/api/manage/lib';

export type EnsembleIndexProps = {
  sections: EnsembleSection[];
  ensemble: Ensemble;
  contacts: (EnsembleContact & { section: EnsembleSection })[];
  admins: (EnsembleAdmin & { user: User })[];
};

export default function EnsembleIndex(props: EnsembleIndexProps) {
  const { ensemble, contacts, sections, admins } = props;
  const [addContact, setAddContact] = useState<boolean | string>(false);
  const [sortContacts, setSortContacts] = useState<string>('Alphabetical');

  const handleSubscribe = async () => {
    let response: AxiosResponse;
    response = await getBillingRoute(ensemble);
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
          <div className='flex w-full flex-row items-center justify-between'>
            {!ensemble.stripeSubscriptionId && (
              <button
                className='h-8 rounded border px-2 text-sm'
                onClick={() => handleSubscribe()}
              >
                Subscribe
              </button>
            )}
            <EnsembleDashboard ensemble={ensemble} />
          </div>
        </div>
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
      <EnsembleManagement admins={admins} />
      <ContactsIndex
        sortContacts={sortContacts}
        setSortedContacts={(sortStr) => setSortContacts(sortStr)}
        editContact={(arg) => setAddContact(arg)}
        contacts={contacts}
        ensembleId={ensemble.id}
      />
    </div>
  );
}
