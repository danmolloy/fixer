import LandingFeatures from "./features";
import Hero from "./hero";

export default function LandingPage() {
  return (
    <div data-testid="landing-page">
      <Hero />
      <LandingFeatures />
    </div>
  )
}