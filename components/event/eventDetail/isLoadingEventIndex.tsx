import InfoDiv from "./infoDiv";
import IsLoadingInfoDiv from "./isLoadingInfoDiv";

export default function IsLoadingEventIndex() {
  return (
    <div data-testid="is-loading-event-index" className=" w-full lg:w-2/3 flex flex-col items-center">
      <div data-testid="event-info-div" className={"w-full border shadow rounded-lg py-4"}>
      <div className="w-full flex flex-col h-8" />
      <IsLoadingInfoDiv className=""/>
      <IsLoadingInfoDiv className="bg-slate-50" />
      <IsLoadingInfoDiv className=""/>
      <IsLoadingInfoDiv className="bg-slate-50" />
      <IsLoadingInfoDiv className=""/>
      <IsLoadingInfoDiv className="bg-slate-50" />
      <IsLoadingInfoDiv className=""/>
      <IsLoadingInfoDiv className="bg-slate-50" />
      <IsLoadingInfoDiv className=""/>
    </div>
    </div>
  )
}