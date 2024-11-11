import { Ensemble } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { Field } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { IoCaretDown } from 'react-icons/io5';

export type EnsembleDashboardProps = {
  addContact: () => void;
  sortContacts: string;
  setSortContacts: (arg: string) => void;
  filterContacts: string[];
  setFilterContacts: (arg: 'Member' | 'Extra') => void;
  ensemble: Ensemble
};

export const buttonPrimary =
  'py-1 px-2 mx-4 rounded text-sm flex flex-row items-center hover:bg-gray-50 text-black border';

export default function EnsembleDashboard(props: EnsembleDashboardProps) {
  const {
    ensemble,
  } = props;
  const [showOptions, setShowOptions] = useState(false);

  const handleManageSub = async() => {
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
  }

  return (
    <div
      data-testid='ensemble-dashboard'
      className='m-1 flex flex-row items-center justify-between'
    >
      <div className='w-32'>
        <button
          className={buttonPrimary}
          onBlur={() => setTimeout(() => setShowOptions(false), 250)}
          onClick={() => {
            focus();
            setShowOptions(!showOptions);
          }}
        >
          <p>Options</p>
          <IoCaretDown />
        </button>
        {showOptions && (
          <div
            data-testid='options-menu'
            className='absolute mr-2 mt-1 flex flex-col rounded border bg-white text-sm'
          >
            <Link
              className='m-1 p-2 text-start hover:bg-gray-50'
              href={`/ensembles/${ensemble.id}/contacts/import`}
            >
              Create Contacts
            </Link>
            <Link
              className='m-1 p-2 text-start hover:bg-gray-50'
              href={`/ensembles/${ensemble.id}/admin/invite`}
            >
              Invite Admin
            </Link>
            <Link
              className='m-1 p-2 text-start hover:bg-gray-50'
              href={`ensembles/update/${ensemble.id}`}
            >
              Edit Ensemble
            </Link>
            <button
              onClick={() => handleManageSub()}
              className='m-1 p-2 text-start hover:bg-gray-50'>
              Manage Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
