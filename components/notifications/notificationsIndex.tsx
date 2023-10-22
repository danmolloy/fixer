import React from "react";
import NotificationTile from "./notificationTile";
import LoadingNotificationsTile from "./LoadingNotificationsTile";
import { PlayerCall } from "@prisma/client";

export type NotificationsProps = {
  playerCalls: PlayerCall[]
  mutate: () => void
}

export default function NotificationsIndex(props: NotificationsProps) {
  const { playerCalls, mutate } = props;

  const activeNotifications = playerCalls.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))).filter(i => i.accepted === null)
  const inactiveNotifications = playerCalls.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))).filter(i => i.accepted !== null)
  
  if (!playerCalls) {
    return <LoadingNotificationsTile />
  }
  
  return (
    <div>
      {activeNotifications.map(i => (
          <NotificationTile key={i.id} notification={i} mutate={() => mutate()} />
      ))}
      <div className="mt-12">
        <h2 className="text-slate-500">Past Notifications</h2>
      {inactiveNotifications.map(i => (
          <NotificationTile key={i.id} notification={i} mutate={() => mutate()} />
      ))}
      </div>
    </div>
  )
}