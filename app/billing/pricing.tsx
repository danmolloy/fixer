'use client';
import Link from 'next/link';
import { TiTick } from 'react-icons/ti';

export type PriceModel = {
  tagline: string;
  title: string;
  blurb: string;
  apiLink: string;
  id: string;
  billingType: string;
  price: string;
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

  return (
    <div
      data-testid={`${priceModel.id}-option`}
      className='my-4 flex w-full flex-col rounded border p-2 sm:w-[80vw] md:flex-row md:justify-between'
    >
      <div className='p-4'>
        <h2 className='font-semibold'>{priceModel.title} Plan</h2>
        <p className='my-4 text-sm text-slate-500'>{priceModel.blurb}</p>
        <hr />

        <div className='py-2'>
          <p className='py-4 text-sm text-blue-600'>What's included</p>
          {priceModel.features.map((i) => (
            <div
              key={i.id}
              data-testid={`feature-${i.id}`}
              className='my-2 flex flex-row items-center text-sm'
            >
              <div className='text-2xl text-blue-600'>
                <TiTick />
              </div>
              <p>{i.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col items-center justify-center rounded bg-slate-50 p-4 md:w-1/2'>
        <div className='text-center'>
          <p className='text-sm font-semibold'>{priceModel.billingType}</p>
          <p data-testid='option-price' className='text-3xl font-semibold'>
            {priceModel.price}{' '}
            <span className='text-sm font-normal text-slate-600'>
              /{priceModel.paymentFrequency}
            </span>
          </p>
        </div>
        <Link
          className='mt-4 rounded border bg-blue-600 px-2 py-1 text-white hover:bg-blue-500'
          href='/signup'
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
