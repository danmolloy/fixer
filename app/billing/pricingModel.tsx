'use client'
import axios from "axios"
import Link from "next/link"

export type PriceModel = {
  title: string
  blurb: string
  apiLink: string
  id: string
  price: string
  paymentFrequency: string
  features: {
    title: string
    icon: React.ReactNode
    blurb: string
    id: string
  }[]
}

export type PricingModelProps = {
  priceModel: PriceModel
}

export default function PricingModel(props: PricingModelProps) {
  const { priceModel } = props;

  const handleClick = () => {
    axios.post(priceModel.apiLink)
  }
  return (
    <div data-testid={`${priceModel.id}-option`}>
        <h2>{priceModel.title}</h2>
        <p>{priceModel.blurb}</p>
        <div >
          <p data-testid="option-price">{priceModel.price} <span>{priceModel.paymentFrequency}</span></p>
        </div>
        <div>
          {priceModel.features.map(i => (
            <div key={i.id} data-testid={`feature-${i.id}`}>
              <div>{i.icon}</div>
              <p>{i.title}</p>
              <p>{i.blurb}</p>
            </div>
          ))}
        </div>
      <button onClick={() => handleClick()}>
      Select
      </button>
    </div>
  )
}