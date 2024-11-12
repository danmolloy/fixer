import AboutFeatures from './features';
import PricingIndex from './pricing';

export default function AboutIndex() {
  return (
    <div
      data-testid='about-index'
      className='flex flex-col self-center mx-8 md:mx-32 lg:mx-48'
    >
      <div className='my-8'>
        <h1 className='text-4xl '>About GigFix</h1>
      </div>
      <AboutFeatures />
      <PricingIndex />
    </div>
  );
}
