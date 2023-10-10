import Image from "next/image";
import FixerFeatures from "../../landingPage/fixerFeatures";
import FixerFeaturesLong from "./fixerFeaturesLong";
import MusicianFeaturesLong from "./musicianFeaturesLong";
import { useState } from "react";
import PricingIndex from "../pricing/pricingIndex";

export default function AboutIndex() {

  return (
    <div className="px-4 md:w-2/3">
      <FixerFeaturesLong />
      <PricingIndex />
    </div>
  )
}