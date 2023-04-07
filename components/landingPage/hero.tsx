import React from "react"

export default function Hero() {
  return (
    <div className=" flex flex-col items-center text-center px-1 md:px-10 py-24 md:py-32" data-testid="hero-div">
      <h1 className="text-4xl md:text-6xl py-4">Communication{" "}
        <span className="text-blue-600">
          made simple
        </span>{" "}
        for fixers and musicians.
      </h1>
      <p className="p-4 text-slate-700">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. 
      </p>
      <div className="flex flex-row flex-wrap w-full justify-center">
        <button className="m-2 bg-black hover:bg-slate-700 text-white rounded-full py-2 px-4 text-sm ">
          Get 6 months free
        </button>
        <button className="m-2 border hover:border-slate-300 text-black rounded-full py-2 px-4 text-sm ">
          Watch video
        </button>
      </div>
    </div>
  )
}