import { PriceModel } from './pricingModel';
import { BiSpreadsheet } from 'react-icons/bi';

export const paymentOptions: PriceModel[] = [
  {
    title: 'Standard',
    tagline: 'Suitable for most ensembles',
    blurb: '',
    price: '£2',
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
  {
    title: 'Enterprise',
    tagline: 'Tailored for orchestras with extensive needs',
    blurb: 'Contact us for a quote',
    price: undefined,
    paymentFrequency: '',
    id: 'payg-1',
    features: [
      {
        text: 'Custom solutions, dedicated support',
        id: '0',
      },
    ],
    apiLink: 'contact',
  },
];
