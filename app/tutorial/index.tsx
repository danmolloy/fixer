'use client'
import { useState } from "react";
import { tutorialData } from "./lib";
import Image from "next/image";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";


export default function TutorialIndex() {
  const [indexNum, setIndexNum] = useState<number>(0);

  return (
    <div className="w-full min-h-[90vh] flex flex-col p-4 transition-all">
      <p className=" text-blue-600 text-lg">How it works</p>
          <h2 className=" font-medium text-3xl">{tutorialData[indexNum].header}</h2>
          <div className="flex flex-col w-full md:flex-row my-8 transition-all">
          <p className="md:w-1/2 self-center mb-4 transition-all">{tutorialData[indexNum].body}</p>
          <Image
              className="w-60 h-60 self-center md:w-1/2 transition-all"
              alt={`${tutorialData[indexNum].header} illustration`}
              src={tutorialData[indexNum].svg} />
              </div>
              <div className="flex flex-row items-center justify-center">
      <button className="disabled:opacity-30 p-2 m-2 text-lg hover:bg-gray-50 rounded" disabled={indexNum === 0} onClick={() => setIndexNum(indexNum - 1)}>
        <FaAngleLeft />
      </button>
      <button className="disabled:opacity-30 p-2 m-2 text-lg hover:bg-gray-50 rounded" disabled={indexNum === tutorialData.length - 1} onClick={() => setIndexNum(indexNum + 1)}>
        <FaAngleRight />
      </button>
      </div>
    </div>
  )
}