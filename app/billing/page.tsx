import { paymentOptions } from './paymentOptions';
import PricingModel from './pricingModel';

export default function BillingIndex() {
  return (
    <div data-testid='billing-index'>
      <div>
        <h1>Choose Plan</h1>
      </div>
      <div>
        {paymentOptions.map((i) => (
          <PricingModel priceModel={i} key={i.id} />
        ))}
      </div>
      <form
        data-testid='manage-acc-form'
        action='/billing/api/manage/'
        method='POST'
      >
        <button data-testid='manage-btn' type='submit' role='link'>
          Manage Account
        </button>
      </form>
    </div>
  );
}
