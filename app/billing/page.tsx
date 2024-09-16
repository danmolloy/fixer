import Link from 'next/link';
import { paymentOptions } from './paymentOptions';
import { FaArrowRight } from 'react-icons/fa';
import PricingModel from './pricingModel';

export default function BillingIndex() {
  return (
    <div data-testid='billing-index' className='p-4'>
      <div className='flex flex-col py-4'>
        <p className='font-semibold text-blue-500'>Pricing</p>
        <h1 className='py-2'>Choose the right plan for your ensemble</h1>
        <p className='font-normal text-gray-500'>
          We offer a variety of payment formats to suit a variety of ensemble
          sizes and schedules.
        </p>
        <Link
          href='/'
          className='flex flex-row items-center self-end rounded bg-black p-1 text-sm text-white hover:bg-gray-600'
        >
          <p className='mr-1'>Buy Later</p>
          <FaArrowRight />
        </Link>
      </div>
      <div className='flex w-full flex-col items-center'>
        {paymentOptions.map((i) => (
          <PricingModel priceModel={i} key={i.id} />
        ))}
      </div>
      <form
        data-testid='manage-acc-form'
        action='/billing/api/manage/'
        method='POST'
      >
        {/* <button data-testid='manage-btn' type='submit' role='link'>
          Manage Account
        </button> */}
      </form>
    </div>
  );
}
