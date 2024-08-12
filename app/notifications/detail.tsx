import axios from "axios"
import { PlayerCallNotification } from "."
import EventInfo from "../event/[id]/eventInfo"
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
    <div data-testid={`${playerCall.id}-detail`} className="w-screen flex flex-col items-center">
      <div className="font-medium py-4">
        {playerCall.accepted === true 
        ? <p>You accepted this work.</p>
        : playerCall.accepted === false 
        ? <p>You declined this work.</p>
        :<NotificationControls handleResponse={(playerResponse) => handleResponse(playerResponse)} />}
      </div>
      <div className="py-4 font-medium">
        <p>{`${fixer} (${ensembleName}) ${offerOrAvailability}:`}</p>
          {playerCall.playerMessage 
        && <div data-testid="player-msg">
          <p>{playerCall.eventSection.event.fixerName} adds:</p>
          <p>{playerCall.playerMessage}</p>
        </div>}
      </div>
      <table className="border w-[95vw]">
        <EventInfo 
          ensemble={playerCall.eventSection.event.ensemble} 
          event={playerCall.eventSection.event} 
          calls={playerCall.calls} />
      </table>
    </div>
  )
}