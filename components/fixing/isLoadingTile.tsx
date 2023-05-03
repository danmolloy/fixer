import PulsingDiv from "../layout/pulsingDiv";

export default function IsLoadingInstrumentTile() {
  return (
    <div className="border flex flex-col w-full md:w-1/2 h-72 m-2 p-2 border-zinc-400 rounded-md">
      <PulsingDiv classNames="h-8 w-24 "/>
      <PulsingDiv classNames="h-4 w-24 mt-2 "/>
      <PulsingDiv classNames="h-6 w-1/2 self-center mt-4"/>

      <PulsingDiv classNames="h-6 w-full mt-4"/>
      <PulsingDiv classNames="h-6 w-full mt-1"/>
      <PulsingDiv classNames="h-6 w-full mt-1"/>
      <PulsingDiv classNames="h-6 w-24 self-end mt-4"/>


    </div>
  )
}