'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { TiTick } from 'react-icons/ti';

export type PriceModel = {
  tagline: string;
  title: string;
  blurb: string;
  apiLink: string;
  id: string;
  price?: string;
  paymentFrequency: string;
  features: {
    text: string;
    id: string;
  }[];
};

export type PricingModelProps = {
  priceModel: PriceModel;
};

export default function PricingModel(props: PricingModelProps) {
  const { priceModel } = props;
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      // Make a POST request to the API to create a checkout session
      const response = await axios.post(priceModel.apiLink);

      // Redirect to the Stripe checkout page if the URL is returned
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Checkout URL not returned');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      data-testid={`${priceModel.id}-option`}
      className='my-4 flex w-full flex-col rounded border p-4 sm:w-[80vw] md:w-[60vw]'
    >
      <p className='text-blue-600'>{priceModel.tagline}</p>
      <h2 className='font-semibold'>{priceModel.title} Plan</h2>
      <p className='my-2 text-gray-600'>{priceModel.blurb}</p>
      <hr />
      <div className='py-4'>
        {priceModel.price !== undefined 
        && <p data-testid='option-price' className='text-3xl font-semibold'>
          {priceModel.price}{' '}
          <span className='text-base font-normal'>
            /{priceModel.paymentFrequency}
          </span>
        </p>}
      </div>
      <div>
        {priceModel.features.map((i) => (
          <div
            key={i.id}
            data-testid={`feature-${i.id}`}
            className='m-1 flex flex-row items-center'
          >
            <div className='text-2xl text-blue-600'>
              <TiTick />
            </div>
            <p>{i.text}</p>
          </div>
        ))}
      </div>
      {priceModel.apiLink === "contact" 
      ? <Link 
      className='my-4 w-24 self-center rounded bg-blue-500 p-2 text-white hover:bg-blue-600 text-center'
        href={"/contact"}>Contact us</Link>
      : <button
        onClick={() => handleClick()}
        className='my-4 w-24 self-center rounded bg-blue-500 p-2 text-white hover:bg-blue-600'
      >
        Get Plan
      </button>}
    </div>
  );
}
