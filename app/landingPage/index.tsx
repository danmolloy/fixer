import TutorialIndex from './tutorial';
import CTASection from './ctaSection';
import LandingFeatures from './features';
import Hero from './hero';
import CommunicationsIndex from './communications';
import InterfaceIndex from './interface';
import WorkflowIndex from './workflow';

export default function LandingPage() {
  return (
    <div data-testid='landing-page'>
      <Hero />{/* 
      <CommunicationsIndex />
      <InterfaceIndex /> 
      <WorkflowIndex />
      <PricingComponent /> // Not developed
      */}
      
    </div>
  );
}
