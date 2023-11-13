import { User } from "@prisma/client";
import InfoDiv from "../event/infoDiv";
import MenuShell from "../index/menuShell";
import { PlayerTileProps } from "./playerTile";

interface ContactInfoProps extends PlayerTileProps {
  setShowContactInfo: () => void
  player: User
}

export default function ContactInfo(props: ContactInfoProps) {
  const { setShowContactInfo, player } = props;
  
  return (
    <MenuShell title={`${player.firstName} ${player.lastName}`} setShowMenu={setShowContactInfo} testId="contact-info">
      <InfoDiv id="email-info" className="" title={"email"} value={player.email} />
      <InfoDiv id="phone-info" className="" title={"phone"} value={player.mobileNumber} />
      <InfoDiv id="preferred-info" className="" title={"preferred method"} value={player.preferredMethod} />
    </MenuShell>
  )
}