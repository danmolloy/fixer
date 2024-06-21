import { DateTime } from "luxon";
import { PlayerCallNotification } from "."
import { TbAlertSquareRounded } from "react-icons/tb";
import { RiCalendar2Line } from "react-icons/ri";
import { TiThumbsDown } from "react-icons/ti";
import { TiThumbsUp } from "react-icons/ti";
import Link from "next/link";


export type NotificationPreviewProps = {
  playerCall: PlayerCallNotification
}

export default function NotificationPreview(props: NotificationPreviewProps) {
  const { playerCall } = props;

  const fixerName = `${playerCall.eventSection.event.fixer.firstName} ${playerCall.eventSection.event.fixer.lastName}`

  const sortedCalls = playerCall.calls.sort((a, b) => Number(DateTime.fromJSDate(a.startTime)) - Number(DateTime.fromJSDate(b.startTime).toMillis))
  const startDate = DateTime.fromJSDate(new Date(sortedCalls[0].startTime))
  const endDate = DateTime.fromJSDate(new Date(sortedCalls[sortedCalls.length - 1].endTime))

  return (
    <Link href={`/notifications/${playerCall.id}`} data-testid={`${playerCall.id}-preview`} className={`${playerCall.accepted === false || endDate < DateTime.now().startOf("day") && "opacity-30"} shadow w-full p-2 my-1 rounded hover:bg-indigo-100`}>
      {playerCall.accepted === null 
      ? <div className="flex flex-row items-center text-red-500">
          <TbAlertSquareRounded/>
          <p>Action Required</p>
        </div> 
        : playerCall.accepted === true 
        ? <div className="flex flex-row items-center text-green-500">
          <TiThumbsUp/>
          <p>You accepted this work</p>
      </div> : <div className="flex flex-row items-center">
      <TiThumbsDown/>
      <p>You declined this work</p>
    </div>  }
        <div className="flex flex-row text-gray-600 text-sm">
          <p>from {fixerName}</p>
          <p className="ml-2 ">recieved {DateTime.fromJSDate(new Date(playerCall.recievedDate!)).toFormat("HH:mm DD")}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p>{playerCall.eventSection.event.ensemble.name }</p>
        <div className="flex flex-row items-center">
          <RiCalendar2Line />
          <p>{startDate.hasSame(endDate, "day")
          ? startDate.toFormat("dd LLL yyyy")
          : `${startDate.toFormat("dd LLL yyyy")} - ${endDate.toFormat("dd LLL yyyy")}`}</p>
        </div>
        </div>
      </Link>
  )
}