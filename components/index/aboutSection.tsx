import React from "react";

type AboutSectionProps = {
  title: string
  blurb: string
  children: React.ReactNode
}

export default function AboutSection(props: AboutSectionProps) {
  const { title, children, blurb } = props;
  return (
    <div className="border bg-white text-black min-h-[75vh] mx-2 my-8 py-4 rounded-lg flex flex-col items-center">
      <div className=" w-full flex flex-col px-6">
        <h2 className="text-3xl  py-2 ">{title}</h2>
      </div>
      <div className="p-4 text-zinc-600">
        <p>{blurb}</p>
      </div>
      <div className=" m-2  p-2 flex flex-col items-center w-[95%] sm:w-[75%] lg:w-1/2">
        {children}
      </div>
    </div>
  )
}