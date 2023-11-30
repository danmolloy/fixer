import React from "react";
import NotificationTile, { PlayerCallWithEventWithEnsemble } from "./notificationTile";
import LoadingNotificationsTile from "./LoadingNotificationsTile";
import { PlayerCall } from "@prisma/client";

export type NotificationsIndexProps = {
  playerCalls: PlayerCallWithEventWithEnsemble[]
  mutate: () => void
}

export default function NotificationsIndex(props: NotificationsIndexProps) {
  const { playerCalls, mutate } = props;

  const activeNotifications = playerCalls.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))).filter(i => i.accepted === null)
  const inactiveNotifications = playerCalls.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))).filter(i => i.accepted !== null)
  
  if (!playerCalls) {
    return <LoadingNotificationsTile />
  }
  
  return (
    <div data-testid="notifications-index" className="flex flex-col items-center mt-4">
      <div data-testid="active-notifications">
      <h1>Notifications</h1>
      {activeNotifications.length === 0 
      ? <div>
          <p className="text-sm">No active notifications</p>
        </div>
      : activeNotifications.map(i => (
          <NotificationTile key={i.id} notification={i} mutate={() => mutate()} />
      ))}
      </div>
      <div data-testid="past-notifications" className="mt-12 flex flex-col items-center">
        <h2 className="text-slate-500">Past Notifications</h2>
      {inactiveNotifications.length === 0 
      ?  <div>
          <p className="text-sm">No past notifications</p>
        </div>
      : inactiveNotifications.map(i => (
          <NotificationTile key={i.id} notification={i} mutate={() => mutate()} />
      ))}
      </div>
    </div>
  )
}