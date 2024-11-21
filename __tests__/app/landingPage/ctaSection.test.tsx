import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CTASection from '../../../app/landingPage/ctaSection';

describe('<CTASection />', () => {
  beforeEach(() => {
    render(<CTASection />);
  });
  const ctaSection = screen.getByTestId('cta-section');
  it('<CTASection /> renders', () => {
    expect(ctaSection).toBeInTheDocument();
    expect(ctaSection.textContent).toMatch('Ready to tune?');
    expect(ctaSection.textContent).toMatch('Sign up for free.');
  });
  it('sign up link is in the document with expected href attr', () => {
    const signUpLink = screen.getByText('Start');
    expect(signUpLink).toHaveAttribute('href', '/signup');
  });
});
