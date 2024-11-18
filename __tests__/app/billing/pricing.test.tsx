import '@testing-library/jest-dom';
import { screen, render, fireEvent, act } from '@testing-library/react';
import { paymentOptions } from '../../../app/billing/paymentOptions';
import PricingModel, { PricingModelProps } from '../../../app/billing/pricing';
import axios from 'axios';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: PricingModelProps = {
  priceModel: paymentOptions[Math.floor(Math.random() * paymentOptions.length)],
};

describe('<PricingModel />', () => {
  beforeEach(() => {
    render(<PricingModel {...mockProps} />);
  });
  it('<PricingModel /> is in the document', () => {
    const pricingModel = screen.getByTestId(
      `${mockProps.priceModel.id}-option`
    );
    expect(pricingModel).toBeInTheDocument();
  });
  it('option title is in the document', () => {
    const title = screen.getByText(`${mockProps.priceModel.title} Plan`);
    expect(title).toBeInTheDocument();
  });
  it('option blurb is in the document', () => {
    const pricingModel = screen.getByTestId(
      `${mockProps.priceModel.id}-option`
    );
    expect(pricingModel.textContent).toMatch(mockProps.priceModel.blurb);
  });
  it('all option features are in the document with blurb and title', () => {
    for (let i = 0; i < mockProps.priceModel.features.length; i++) {
      const feature = screen.getByTestId(
        `feature-${mockProps.priceModel.features[i].id}`
      );
      expect(feature.textContent).toMatch(
        mockProps.priceModel.features[i].text
      );
    }
  });
  it('billing type is in the document', () => {
    const billingType = screen.getByText(mockProps.priceModel.billingType);
    expect(billingType).toBeInTheDocument();
  });
  it('price and payment frequency are clearly stated', () => {
    const optionPrice = screen.getByTestId('option-price');
    expect(optionPrice).toHaveTextContent(
      `${mockProps.priceModel.price} /${mockProps.priceModel.paymentFrequency}`
    );
  });
  it("'get started' link is in the document with href='/signup' attr", () => {
    const getStartedLink = screen.getByText('Get Started');
    expect(getStartedLink).toBeInTheDocument();
    expect(getStartedLink).toHaveAttribute('href', '/signup');
  });
});
