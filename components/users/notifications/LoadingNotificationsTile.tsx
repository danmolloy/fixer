import ButtonPrimary from "../../index/buttonPrimary";
import PulsingDiv from "../../layout/pulsingDiv";

export default function LoadingNotificationsTile() {
  return (
    <div className="border rounded shadow-sm m-1 ">
      <div className="p-4">
      <PulsingDiv classNames=" w-1/2 h-5"/>
      <PulsingDiv classNames="w-2/3 mt-1 h-5" />
      <PulsingDiv classNames="w-4/5 mt-1 h-5" />
        
        <div className="flex flex-row justify-evenly my-4">
        <PulsingDiv classNames="w-24 h-9 self-center" />
        <PulsingDiv classNames="w-24 h-9 self-center" />
        </div>
        <div className="flex flex-col items-center h-6">
        <PulsingDiv classNames=" w-1/2 h-5"/>

        </div>
        </div>
        
      </div>
  )
}