import "@testing-library/jest-dom"
import {POST} from '../../../../../app/billing/api/subscribe/route';
import { Request } from 'node-fetch';
let stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

jest.mock('stripe', () => {
  return jest.fn(() => ({
    checkout: {
      sessions: {
        retrieve: jest.fn(),
      },
    },
    billingPortal: {
      sessions: {
        create: jest.fn(),
      },
    },
  }));
});


describe("POST()", () => {
  beforeEach(() => {});

  it("handles successfull post request", async () => {})
  it('should handle errors from Stripe API', async () => {})
  
})