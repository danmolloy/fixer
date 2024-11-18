import LandingPage from '../../../app/landingPage';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('<LandingPage />', () => {
  beforeEach(() => {
    render(<LandingPage />);
  });
  it('<LandingPage /> is in the document', () => {
    const landingPage = screen.getByTestId('landing-page');
    expect(landingPage).toBeInTheDocument();
  });
  it('<Hero /> is in the document', () => {
    const hero = screen.getByTestId('hero-div');
    expect(hero).toBeInTheDocument();
  });
  it('<LandingFeatures /> is in the document', () => {
    const landingFeatures = screen.getByTestId('fixer-features');
    expect(landingFeatures).toBeInTheDocument();
  });
  it("<TutorialIndex /> is in the document", () => {
    const tutorialIndex = screen.getByTestId("tutorial-index");
    expect(tutorialIndex).toBeInTheDocument();
  })
  it("<CTASection /> is in the document", () => {
    const ctaSection = screen.getByTestId("cta-section");
    expect(ctaSection).toBeInTheDocument();
  })
});
