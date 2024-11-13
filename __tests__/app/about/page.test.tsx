import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AboutIndex from '../../../app/about/page';

describe('<AboutIndex />', () => {
  beforeEach(() => {
    render(<AboutIndex />);
  });
  it('<AboutIndex /> is in the document', () => {
    const aboutIndex = screen.getByTestId('about-index');
    expect(aboutIndex).toBeInTheDocument();
  });
  it('<AboutFeatures /> is in the document', () => {
    const aboutFeatures = screen.getByTestId('about-features');
    expect(aboutFeatures).toBeInTheDocument();
  });
  it('<PricingIndex /> is in the document', () => {
    const pricingIndex = screen.getByTestId('pricing-index');
    expect(pricingIndex).toBeInTheDocument();
  });
  it("matches snapshot", () => {
    const aboutIndex = screen.getByTestId('about-index');
    expect(aboutIndex).toMatchSnapshot();
  })
});
