import { PlayerCallNotification } from ".";
import NotificationPreview from "./notificationPreview";

export type NotificationsListProps = {
  playerCalls: PlayerCallNotification[]
}

export default function NotificationsList(props: NotificationsListProps) {
  const { playerCalls } = props;
  
  return (
    <div data-testid="notifications-list">
      {playerCalls.map(i => (
        <NotificationPreview key={i.id} playerCall={i} />
      ))}
    </div>
  )
}