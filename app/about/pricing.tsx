import { AiOutlineTeam } from 'react-icons/ai';
import { paymentOptions } from '../billing/paymentOptions';
import PricingModel from '../billing/pricing';

export default function PricingIndex() {
  return (
    <div data-testid='pricing-index' className='mt-12'>
      <div className='py-6'>
        <h2 className='py-2 text-3xl'>Pricing</h2>
        <p className='font-thin text-slate-600 '>
          We offer an attractive payment plan to cater for a variety of
          ensembles. For more information, please contact us.
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
