import { Call, PlayerCall,   User } from "@prisma/client";
import Image from "next/image";
import PlayerRowMenu from "./playerRowMenu";
import { useState } from "react";
import { BsCheck, BsQuestion, BsThreeDotsVertical, BsX } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { PlayerCallsForTable } from ".";

export type PlayerRowProps = {
  playerCall: PlayerCallsForTable,
  allEventCalls: Call[],
}

export default function PlayerRow(props: PlayerRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { playerCall, allEventCalls } = props;
  return (
    <tr data-testid={`${playerCall.id}-row`}>
      <td>
      <div data-testid={`${playerCall.musician.name}-img`}>
        <Image src={"http://placebeard.it/25/25"} width={25} height={25} alt={`${playerCall.musician.name} profile image`} title={`${playerCall.musician.name} profile image`} />
      </div>
      <p>
        {playerCall.musician.name}
      </p>
      </td>
      {allEventCalls.map(i => (
        <td key={i.id} data-testid={`${i.id}-cell`}>
          {playerCall.status === "DEP OUT" && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div data-testid={`${i.id}-dep-out`}><BiExit /></div>
          : playerCall.accepted === true && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div data-testid={`${i.id}-tick`}><BsCheck /></div>
          : playerCall.accepted === false && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div data-testid={`${i.id}-cross`}><BsX /></div>
          : playerCall.recieved === true && playerCall.accepted === null && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div data-testid={`${i.id}-pending`}><BsQuestion /></div>
          : <div data-testid={`${i.id}-not-asked`}></div>}
        </td>
      ))}
      <td>
      <button data-testid="player-row-menu-btn" onClick={() => setShowMenu(!showMenu)}>
        <BsThreeDotsVertical />
      </button>
      {showMenu && <PlayerRowMenu setShowMenu={(arg) => setShowMenu(arg)} playerCall={playerCall} />}
      </td>
    </tr>
  )
}