import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="w-screen h-screen outline flex flex-col justify-center items-center">
      <div className="text-3xl animate-spin text-blue-600 rounded-t-full">
        <AiOutlineLoading />
      </div>
      <h1 className="text-lg mt-2">Loading...</h1>
    </div>
  )
}