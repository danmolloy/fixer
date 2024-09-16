import { AiOutlineTeam } from 'react-icons/ai';
import { fixerFeatureList } from './features';

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
      <div className='rounded-lg border p-8 shadow'>
        <div>
          <div className='flex flex-row items-center justify-between'>
            <p className='font-bold text-indigo-600'>Get all-access</p>
            <button className='rounded bg-black px-2 py-1 text-white shadow'>
              Get Started
            </button>
          </div>
          <div className='flex flex-row items-start py-4'>
            <p className='text-bold text-5xl'>£99</p>
            <div className='ml-1'>
              <p className='font-bold'>per week</p>
              <p className='-mt-1 text-slate-600'>plus taxes</p>
            </div>
          </div>
          <p className='text-slate-600'>
            Get week-long access to all of the application UI, marketing, and
            ecommerce components, as well as all of our site templates for a
            single one-time purchase.
          </p>
        </div>

        <div className='mt-8 border-t py-8'>
          {fixerFeatureList.map((i) => (
            <div key={i.key} className='my-2 flex flex-row'>
              <div className='py-2 text-2xl text-indigo-600 md:px-2'>
                {i.icon}
              </div>
              <div className='flex flex-col px-4'>
                <p className='text-slate-600'>
                  <span className='font-bold text-black'>{i.title}. </span>
                  {i.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='m-2 flex flex-row rounded border bg-slate-100 p-2 shadow-sm'>
          <div className='py-2 text-2xl text-slate-600 md:px-2'>
            <AiOutlineTeam />
          </div>
          <div className='flex flex-col justify-center px-4'>
            <p className='text-slate-600'>
              <span className='font-bold text-black'>
                We offer packages for admin teams.{' '}
              </span>
              Contact us for further information on our group solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
