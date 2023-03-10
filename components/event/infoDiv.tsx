import React from "react"

interface InfoDivProps {
  id: string
  className: string
  title: string
  value: string
}

export default function InfoDiv(props: InfoDivProps) {
  const { id, className, title, value } = props
  return (
    <div className={`${className} flex flex-col lg:flex-row p-4 w-full lg:items-center lg:justify-evenly `} data-testid={id}>
      <p className="text-slate-600 text-sm lg:w-1/2">{title}</p>
      <p className="lg:w-1/2">{value.length < 1 ? "N/A" : value}</p>
    </div>
  )
}