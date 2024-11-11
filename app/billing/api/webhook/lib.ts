import { Ensemble } from "@prisma/client";
import prisma from "../../../../client";

export async function updateSubscription(data: {
  subscriptionId: string;
  subscriptionStatus: string;
}): Promise<Ensemble> {
  return await prisma.ensemble.update({
    where: {
      stripeSubscriptionId: data.subscriptionId
    },
    data: {
      stripeSubscriptionId: data.subscriptionId,
      subscriptionStatus: data.subscriptionStatus
    }
  });
  }

  export async function createSubscription(data: {
    ensembleID: string;
    subscriptionId: string;
    subscriptionStatus: string;
  }): Promise<Ensemble> {
    return await prisma.ensemble.update({
      where: {
        id: data.ensembleID
      },
      data: {
        stripeSubscriptionId: data.subscriptionId,
        subscriptionStatus: data.subscriptionStatus
      }
    });
    }