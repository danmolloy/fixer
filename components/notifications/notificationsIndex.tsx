import React from "react";
import NotificationTile from "./notificationTile";

export default function NotificationsIndex(props) {
  const { data, mutate } = props;
  return (
    <div>
      {data.playerCalls.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))).map(i => (
        <div key={i.id}>
          <NotificationTile notification={i} mutate={() => mutate()} />
        </div>
      ))}
    </div>
  )
}