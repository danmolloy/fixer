import { PriceModel } from './pricing';
import { BiSpreadsheet } from 'react-icons/bi';

export const paymentOptions: PriceModel[] = [
  {
    title: 'Standard',
    tagline: 'Suitable for most ensembles',
    blurb:
      'An affordable plan suitable for most ensembles which includes an array of free features.',
    price: '£2',
    billingType: 'Usage-based billing',
    paymentFrequency: 'booked musician',
    id: 'sub-1',
    features: [
      {
        text: 'Unlimited events',
        id: '0',
      },
      {
        text: 'Up to 500 address book contacts',
        id: '1',
      },
      {
        text: 'Up to 12 ensemble administrators',
        id: '2',
      },
      {
        text: 'Billed monthly',
        id: '3',
      },
    ],
    apiLink: '/billing/api/subscribe/',
  },
];
