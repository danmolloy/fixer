import AboutFeatures from "./features";
import PricingIndex from "./pricing";

export default function AboutIndex() {

  return (
    <div data-testid="about-index" className="px-4 md:w-2/3">
      <AboutFeatures />
      <PricingIndex />
    </div>
  )
}