import AboutFeatures from './features';
import PricingIndex from './pricing';

export default function AboutIndex() {
  return (
    <div
      data-testid='about-index'
      className='flex flex-col self-center p-4 md:mx-32 lg:mx-48'
    >
      <AboutFeatures />
      <PricingIndex />
    </div>
  );
}
