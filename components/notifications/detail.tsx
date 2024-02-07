import axios from "axios"
import { PlayerCallNotification } from "."
import EventInfo from "../event/eventDetail/eventInfo"
import NotificationControls from "./notificationControls"

export type NotificationDetailProps = {
  playerCall: PlayerCallNotification
}

export default function NotificationDetail(props: NotificationDetailProps) {
  const { playerCall } = props

  const handleResponse = (playerResponse: boolean) => {
    axios.post("/api/playerCall/update", {
      data: {
        accepted: playerResponse
      },
      playerCallId: playerCall.id
    })
  }

  const fixer = playerCall.eventSection.event.fixerName
  const ensembleName = playerCall.eventSection.event.ensemble.name
  const offerOrAvailability = playerCall.bookingOrAvailability === "Booking" ? "offers" : "checks availability for"

  
  return (
    <div data-testid={`${playerCall.id}-detail`}>
      {playerCall.accepted === true 
      ? <p>You accepted this work.</p>
      : playerCall.accepted === false 
      ? <p>You declined this work.</p>
      :<NotificationControls handleResponse={(playerResponse) => handleResponse(playerResponse)} />}
      {playerCall.playerMessage 
      && <div data-testid="player-msg">
        <p>{playerCall.eventSection.event.fixerName} adds:</p>
        <p>{playerCall.playerMessage}</p>
      </div>}
      <p>{`${fixer} (${ensembleName}) ${offerOrAvailability}:`}</p>
      <table>
        <EventInfo 
          ensemble={playerCall.eventSection.event.ensemble} 
          userId={playerCall.musicianId} 
          event={playerCall.eventSection.event} 
          calls={playerCall.calls} />
      </table>
    </div>
  )
}