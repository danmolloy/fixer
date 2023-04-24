import React from "react"

interface DetailsDivProps {
  id: string
  className: string
  title: string
  value: string
}

export default function DetailsDiv(props: DetailsDivProps) {
  const { id, className, title, value } = props
  return (
    <div className={`${className} flex flex-col  p-4 w-full lg:justify-evenly `} data-testid={id}>
      <div className="text-slate-600 text-sm lg:w-full flex flex-row justify-between">
      <p>{title}</p>
      <button className="hover:underline">
        Edit
      </button>
      </div>
      <p className="">{value === undefined || value.length < 1 ? "Not specified" : value}</p>
    </div>
  )
}