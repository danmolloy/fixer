import { Prisma } from "@prisma/client";
import NotificationsDashboard from "./dashboard";
import NotificationsList from "./notificationsList";
import { useState } from "react";

export type PlayerCallNotification = Prisma.PlayerCallGetPayload<{
  include: {
    calls: true,
    eventSection: {
      include: {
        event: {
          include: {
            ensemble: true,
            fixer: true
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
  const [playerCallFilter, setPlayerCallFilter] = useState<"action"|"past"|null>(null)
  const [ensembleFilter, setEnsembleFilter] = useState<string|null>(null)

/*   if (!playerCalls) {
    return <p>No player calls</p>
  } */

  const ensembleSet = new Set(playerCalls.map(i => i.eventSection.event.ensemble))

  return (
    <div data-testid="notifications-index" className="w-full flex flex-col md:flex-row">
      <NotificationsDashboard 
        setEnsembleFilter={(ensemble) => {ensemble === ensembleFilter ? setEnsembleFilter(null) : setEnsembleFilter(ensemble)}} 
        ensembleFilter={ensembleFilter}
        playerCallFilter={(filter) => {filter === playerCallFilter ? setPlayerCallFilter(null) : setPlayerCallFilter(filter)}}
        ensembleArray={Array.from(ensembleSet)} />
       <NotificationsList ensembleFilter={ensembleFilter} playerCallFilter={playerCallFilter} playerCalls={playerCalls} />
    </div>
  )
}