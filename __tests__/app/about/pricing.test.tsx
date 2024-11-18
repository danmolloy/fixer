import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PricingIndex from '../../../app/about/pricing';
import { paymentOptions } from '../../../app/billing/paymentOptions';

describe('<PricingIndex />', () => {
  beforeEach(() => {
    render(<PricingIndex />);
  });
  it('<PricingIndex /> renders', () => {
    const pricingIndex = screen.getByTestId('pricing-index');
    expect(pricingIndex).toBeInTheDocument();
  });
  it("'Pricing' title is in the document", () => {
    const headings = screen.getAllByRole('heading');
    expect(headings[0].textContent).toMatch('Pricing');
  });
  it('pricing & contact blurb is in the document', () => {
    const blurb = screen.getByTestId('pricing-blurb');
    expect(blurb).toBeInTheDocument();
  });
  it('all pricing models are in the document', () => {
    for (let i = 0; i < paymentOptions.length; i++) {
      const option = screen.getByTestId(`${paymentOptions[i].id}-option`);
      expect(option).toBeInTheDocument();
    }
  });
});
