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
import { TiWarning } from 'react-icons/ti';

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
      {!ensemble.stripeSubscriptionId && (
        <div className='my-8 flex flex-col self-center rounded bg-amber-50 p-4 text-sm text-amber-800 lg:w-1/2'>
          <div className='flex flex-row items-center justify-start'>
            <div className='flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-amber-100'>
              <TiWarning />
            </div>
            <h4 className='ml-1 font-semibold'>No active subscription</h4>
          </div>
          <p className='mx-5 my-1 font-medium'>
            You need an active subscription to fix gigs. You can still create
            events, import your address book and invite admin users.
          </p>
          <button
            className='my-2 self-center rounded p-1 text-center hover:bg-amber-100'
            onClick={() => handleSubscribe()}
          >
            Subscribe
          </button>
        </div>
      )}
      <div className='flex flex-col justify-between lg:flex-row'>
        <div className='flex w-full flex-row items-start justify-between'>
          <h1 className='text-3xl font-semibold'>{ensemble.name}</h1>
          {/* {!ensemble.stripeSubscriptionId && (
              <button
                className='h-8 rounded border px-2 text-sm'
                onClick={() => handleSubscribe()}
              >
                Subscribe
              </button>
            )} */}
          <EnsembleDashboard ensemble={ensemble} />
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
