import { DateTime } from "luxon";
import { PlayerCallNotification } from "."

export type NotificationPreviewProps = {
  playerCall: PlayerCallNotification
}

export default function NotificationPreview(props: NotificationPreviewProps) {
  const { playerCall } = props;
  return (
    <div data-testid={`${playerCall.id}-preview`}>
      {playerCall.accepted === null 
      && <p>Action Required</p>}
      <p>{playerCall.eventSection.event.ensemble.name}</p>
      <p>{DateTime.fromJSDate(playerCall.recievedDate).toFormat("HH:mm DD")}</p>
    </div>
  )
}