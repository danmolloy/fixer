import React from "react"
import PulsingDiv from "../../layout/loading/pulsingDiv"

type IsLoadingInfoProps = {
  className: string
  
}

export default function IsLoadingInfoDiv(props: IsLoadingInfoProps) {
  const { className } = props
  return (
    <div className={`${className} animate-pulse flex flex-col lg:flex-row p-4 w-full lg:items-center lg:justify-evenly `}>
      <div className="w-1/2">
        <PulsingDiv classNames="h-5 w-24" />
      </div>
      <div className="w-1/2 lg:p-0 pt-1">
        <PulsingDiv classNames=" h-5 w-32" />
      </div>
    </div>
  )
}