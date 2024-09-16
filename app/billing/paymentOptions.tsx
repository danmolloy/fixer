import { PriceModel } from './pricingModel';
import { BiSpreadsheet } from 'react-icons/bi';

export const paymentOptions: PriceModel[] = [
  {
    title: 'Freelance',
    blurb: 'Suitable for irregular schedules',
    price: '£150',
    paymentFrequency: 'event',
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
        text: 'Up to 20 ensemble administrators',
        id: '2',
      },
    ],
    apiLink: '/billing/api/subscribe/',
  },
  {
    title: 'Chamber',
    blurb: 'For smaller ensembles with a regular schedule',
    price: '£500',
    paymentFrequency: 'month',
    id: 'payg-1',
    features: [
      {
        text: 'Create up to 6 events per month',
        id: '0',
      },
      {
        text: 'Up to 250 address book contacts',
        id: '1',
      },
      {
        text: 'Up to 10 ensemble administrators',
        id: '2',
      },
    ],
    apiLink: '/billing/api/subscribe/',
  },
  {
    title: 'Piccolo',
    blurb: 'For large ensembles with a regular schedule',
    price: '£200',
    paymentFrequency: 'month',
    id: 'payg-1',
    features: [
      {
        text: 'Create up to 12 events per month',
        id: '0',
      },
      {
        text: 'Up to 600 address book contacts',
        id: '1',
      },
      {
        text: 'Up to 20 ensemble administrators',
        id: '2',
      },
    ],
    apiLink: '/billing/api/subscribe/',
  },
];
