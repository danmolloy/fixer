import { User } from "@prisma/client";
import InfoDiv from "../event/eventDetail/infoDiv";
import { PlayerTileProps } from "./playerTile";

interface ContactInfoProps extends PlayerTileProps {
  setShowContactInfo: () => void
  player: User
}

export default function ContactInfo(props: ContactInfoProps) {
  const { setShowContactInfo, player } = props;
  
  return (
    <div title={`${player.firstName} ${player.lastName}`}  data-testid="contact-info">
      <div>
        <p>{player.firstName} ${player.lastName}</p>
        <button data-testid="close-btn" onClick={() => setShowContactInfo()}>Close</button>
      </div>
      <table>

        <tbody>
      <InfoDiv id="email-info" className="" title={"email"} value={player.email} />
      <InfoDiv id="phone-info" className="" title={"phone"} value={player.mobileNumber} />
      <InfoDiv id="preferred-info" className="" title={"preferred method"} value={player.preferredMethod} />
      </tbody>
      </table>
    </div>
  )
}