import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div data-testid="loading" className="w-full flex flex-col justify-center items-center mt-24">
      <p className="text-xl font-medium">Loading...</p>
      <div className="animate-spin text-xl text-indigo-500 m-4">
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  )
}