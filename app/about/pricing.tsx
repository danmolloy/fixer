import { AiOutlineTeam } from 'react-icons/ai';
import { fixerFeatureList } from './features';
import { paymentOptions } from '../billing/paymentOptions';
import PricingModel from '../billing/pricingModel';

export default function PricingIndex() {
  return (
    <div data-testid='pricing-index'>
      <div className='py-6'>
        <p className='text-xl text-indigo-600'>Pricing</p>
        <h2 className='py-2 text-3xl'>No commitments</h2>
        <p className='font-thin text-slate-600 md:w-2/3'>
          Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
          Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
          In mi viverra elit nunc.
        </p>
      </div>

      <div className='flex w-full flex-col items-center'>
        {paymentOptions.map((i) => (
          <PricingModel priceModel={i} key={i.id} />
        ))}
      </div>
    </div>
  );
}
