import { Call, PlayerCall,   User } from "@prisma/client";
import Image from "next/image";
import PlayerRowMenu from "./playerRowMenu";
import { useState } from "react";
import { BsCheck, BsQuestion, BsThreeDotsVertical, BsX } from "react-icons/bs";
import { BiExit } from "react-icons/bi";



export type PlayerRowProps = {
  playerCall: PlayerCall,
  eventCallsForPlayer: Call[],
  allEventCalls: Call[],
  user: User
}

export default function PlayerRow(props: PlayerRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { playerCall, eventCallsForPlayer, allEventCalls, user} = props;
  return (
    <div data-testid="player-row">
      <div data-testid={`${user.name}-img`}>
        <Image src={"http://placebeard.it/25/25"} width={25} height={25} alt={`${user.name} profile image`} title={`${user.name} profile image`} />
      </div>
      <p>
        {user.name}
      </p>
      {allEventCalls.map(i => (
        <div key={i.id} data-testid={`${i.id}-cell`}>
          {playerCall.status === "DEP OUT"
          ? <div data-testid={`${i.id}-dep-out`}><BiExit /></div>
          : playerCall.accepted === true
          ? <div data-testid={`${i.id}-tick`}><BsCheck /></div>
          : playerCall.accepted === false
          ? <div data-testid={`${i.id}-cross`}><BsX /></div>
          : playerCall.recieved === true && playerCall.accepted === null
          ? <div data-testid={`${i.id}-pending`}><BsQuestion /></div>
          : <div data-testid={`${i.id}-not-asked`}></div>}
        </div>
      ))}
      <button data-testid="player-row-menu-btn" onClick={() => setShowMenu(!showMenu)}>
        <BsThreeDotsVertical />
      </button>
      {showMenu && <PlayerRowMenu setShowMenu={(arg) => setShowMenu(arg)} playerCall={playerCall} />}
    </div>
  )
}