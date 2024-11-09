import AboutFeatures from './features';
import PricingIndex from './pricing';

export default function AboutIndex() {
  return (
    <div
      data-testid='about-index'
      className='flex flex-col self-center p-4 md:mx-32 lg:mx-48'
    >
      <div className='my-8'>
        <h1 className='text-4xl text-blue-600'>About GigFix</h1>
      </div>
      <AboutFeatures />
      <PricingIndex />
    </div>
  );
}
