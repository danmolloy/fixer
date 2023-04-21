import InfoDiv from "../event/infoDiv";
import MenuShell from "../index/menuShell";
import { PlayerTileProps } from "./playerTile";

interface ContactInfoProps extends PlayerTileProps {
  setShowContactInfo: () => void
}

export default function ContactInfo(props: ContactInfoProps) {
  const { setShowContactInfo, player } = props;
  
  return (
    <MenuShell title={player.name} setShowMenu={setShowContactInfo}>
      <InfoDiv id="" className="" title={"email"} value={"violin@viola.com"} />
      <InfoDiv id="" className="" title={"phone"} value={"07479 016 386"} />
      <InfoDiv id="" className="" title={"preferred method"} value={"WhatsApp"} />
    </MenuShell>
  )
}