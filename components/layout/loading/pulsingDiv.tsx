import React from "react";

type PulsingDivProps = {
  classNames?: string
}

export default function PulsingDiv(props: PulsingDivProps) {
  const { classNames } = props;
  
  return (
    <div className={`bg-slate-200 animate-pulse rounded ${classNames}`} />
  )
}