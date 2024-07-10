import Link from "next/link"
import React from "react"
import StartBtn from "./startBtn"

export default function Hero() {
  return (
    <div className=" h-[60vh] flex flex-col items-center text-center bg-gradient-to-b from-white via-blue-500 to-white  " data-testid="hero-div">
      <div className="backdrop-blur-xl bg-white/80 h-full ">
      <h1  className="text-4xl md:text-6xl py-4 px-12">Communication{" "}
        <span className="text-blue-600">
          made simple
        </span>{" "}
        for fixers and musicians.
      </h1>
      <p className="p-4 text-slate-700">
        Seamless communication and effortless fixing for orchestras and musicians. 
      </p>
      <div className="flex flex-row flex-wrap w-full justify-center">
     <StartBtn />

        <Link href="/about" className="m-2 border hover:border-slate-300 text-black rounded-full py-2 px-4 text-sm ">
          Learn more
        </Link>
      </div>
      </div>
    </div>
  )
}