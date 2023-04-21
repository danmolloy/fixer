import Image from "next/image";
import PulsingDiv from "../layout/pulsingDiv";

export default function IsLoadingProfile() {
  return (
    <div className="flex flex-col w-full ">
      <div className=" rounded-md flex flex-col sm:flex-row sm:items-center lg:w-2/3 border shadow-sm" >
      <div className="flex flex-row w-full">
      <div className="bg-slate-200 animate-pulse rounded-full shadow  m-4 h-26 w-24" />
      <div className="flex flex-col w-full m-4 p-1 ">
        <PulsingDiv classNames=" h-8 w-44" />
        <PulsingDiv classNames=" mt-1 h-7 w-24" />
      </div>
      </div>
      <div className="flex flex-col">
        <PulsingDiv classNames=" m-2 sm:m-1 sm:mr-4 p-2 sm:px-4 rounded-md h-10 sm:w-28" />
          <PulsingDiv classNames=" m-2 sm:m-1 sm:mr-4 p-2 sm:px-4 rounded-md h-10 sm:w-28"  />
        </div>
    </div>
    <div className="p-2 m-2" data-testid="profile-body">
      <div className="py-1">
          <PulsingDiv classNames=" py-1  h-10 w-48" />
          <div>
            <PulsingDiv classNames="my-1 h-6 w-56" />
            <PulsingDiv classNames="my-1 h-6 w-60" />

          </div>
        </div>
        <div className="py-2">
        <PulsingDiv classNames=" py-1  h-10 w-48" />
          <div>
            <PulsingDiv classNames="my-1 h-6 w-52" />
            <PulsingDiv classNames="my-1 h-6 w-60" />
            <PulsingDiv classNames="my-1 h-6 w-56" />
            <PulsingDiv classNames="my-1 h-6 w-52" />
            <PulsingDiv classNames="my-1 h-6 w-60" />
            <PulsingDiv classNames="my-1 h-6 w-56" />
            <PulsingDiv classNames="my-1 h-6 w-52" />
            <PulsingDiv classNames="my-1 h-6 w-60" />
            <PulsingDiv classNames="my-1 h-6 w-60" />
            <PulsingDiv classNames="my-1 h-6 w-56" />
            <PulsingDiv classNames="my-1 h-6 w-52" />
            <PulsingDiv classNames="my-1 h-6 w-56" />
            <PulsingDiv classNames="my-1 h-6 w-60" />
            <PulsingDiv classNames="my-1 h-6 w-52" />
            <PulsingDiv classNames="my-1 h-6 w-60" />
          </div>
          </div>
          <div className="py-1">
          <PulsingDiv classNames=" py-1  h-10 w-48" />
        <div>
          <PulsingDiv classNames="my-1 h-6 w-52" />
          <PulsingDiv classNames="my-1 h-6 w-60" />
        </div>
        </div>
        <div className="py-1">
        <PulsingDiv classNames=" py-1  h-10 w-48" />
        <div>
        <PulsingDiv classNames="my-1 h-6 w-52" />
        <PulsingDiv classNames="my-1 h-6 w-60" />
        <PulsingDiv classNames="my-1 h-6 w-52" />
        <PulsingDiv classNames="my-1 h-6 w-60" />

        </div>
        </div>
        
      </div>
    </div>
  )
}