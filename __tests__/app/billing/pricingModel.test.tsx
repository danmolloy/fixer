import '@testing-library/jest-dom';
import { screen, render, fireEvent, act } from '@testing-library/react';
import { paymentOptions } from '../../../app/billing/paymentOptions';
import PricingModel, {
  PricingModelProps,
} from '../../../app/billing/pricing';
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
    const title = screen.getByText(mockProps.priceModel.title);
    expect(title).toBeInTheDocument();
  });
  it('option blurb is in the document', () => {
    const pricingModel = screen.getByTestId(
      `${mockProps.priceModel.id}-option`
    );
    expect(pricingModel.textContent).toMatch(mockProps.priceModel.blurb);
  });
  it('option price and payment frequency are in the document', () => {
    const price = screen.getByTestId('option-price');
    expect(price.textContent).toMatch(
      `${mockProps.priceModel.price} ${mockProps.priceModel.paymentFrequency}`
    );
    expect(price).toBeInTheDocument();
  });
  it('all option features are in the document with blurb and title', () => {
    for (let i = 0; i < mockProps.priceModel.features.length; i++) {
      const feature = screen.getByTestId(
        `feature-${mockProps.priceModel.features[i].id}`
      );
      expect(feature.textContent).toMatch(
        mockProps.priceModel.features[i].title
      );
      expect(feature.textContent).toMatch(
        mockProps.priceModel.features[i].blurb
      );
    }
  });
  it('select button is in the document, and calls axios.post(option-apiLink) on click', () => {
    const selectBtn = screen.getByText('Select');
    expect(selectBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(selectBtn);
    });
    expect(axios.post).toHaveBeenCalledWith(mockProps.priceModel.apiLink);
  });
});
