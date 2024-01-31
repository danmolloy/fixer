import { Prisma } from "@prisma/client";
import NotificationsDashboard from "./dashboard";
import NotificationsList from "./notificationsList";

export type PlayerCallNotification = Prisma.PlayerCallGetPayload<{
  include: {
    eventSection: {
      include: {
        event: {
          include: {
            ensemble: true
          }
        }
      }
    }
  }
}>

export type NotificationsProps = {
  playerCalls: PlayerCallNotification[]
  mutate: () => void
}

export default function Notifications(props: NotificationsProps) {
  const { playerCalls, mutate } = props;

  if (!playerCalls) {
    return <p>Loading..</p>
  }

  return (
    <div data-testid="notifications-index">
      <NotificationsDashboard />
      <NotificationsList playerCalls={playerCalls} />
    </div>
  )
}