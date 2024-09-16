import { PriceModel } from './pricingModel';
import { BiSpreadsheet } from 'react-icons/bi';

export const paymentOptions: PriceModel[] = [
  {
    title: 'Subscription',
    blurb: '',
    price: '£500',
    paymentFrequency: 'per month',
    id: 'sub-1',
    features: [
      {
        icon: <BiSpreadsheet />,
        title: 'Create up to 6 events per month',
        blurb:
          'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        id: '0',
      },
    ],
    apiLink: '/billing/api/subscribe/',
  },
  {
    title: 'Pay As You Go',
    blurb: '',
    price: '£500',
    paymentFrequency: 'per event',
    id: 'payg-1',
    features: [
      {
        icon: <BiSpreadsheet />,
        title: 'Billed monthly for events you create',
        blurb:
          'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        id: '0',
      },
    ],
    apiLink: '/billing/api/subscribe/',
  },
];
