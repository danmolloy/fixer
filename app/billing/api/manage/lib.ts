import { Ensemble } from "@prisma/client";
import axios from "axios";

export const getBillingRoute = async (ensemble: Ensemble) => {
  return !ensemble.stripeSubscriptionId 
  ? await axios.post('/billing/api/subscribe', {ensembleID: ensemble.id})
  : await axios.post('/billing/api/manage', {subscriptionID: ensemble.stripeSubscriptionId});
}