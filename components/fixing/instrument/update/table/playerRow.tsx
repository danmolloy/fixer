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

  const inactivePlayer = playerCall.accepted === false || playerCall.recieved === null

  return (
    <tr data-testid={`${playerCall.id}-row`} className={` border-b w-full`}>
      <td className={`${inactivePlayer && "opacity-20 "} flex flex-row items-center justify-start`}>
      <div className="rounded-full overflow-hidden shadow m-2 w-12 h-12 flex items-center" data-testid={`${playerCall.musician.firstName}-${playerCall.musician.lastName}-img`}>
        <Image src={"http://placebeard.it/100/100"} width={48} height={48} alt={`${playerCall.musician.firstName} ${playerCall.musician.lastName} profile image`} title={`${playerCall.musician.firstName} ${playerCall.musician.lastName} profile image`} />
      </div>
      <p>
        {`${playerCall.musician.firstName} ${playerCall.musician.lastName}`}
      </p>
      </td>
      {allEventCalls.map(i => (
        <td className="" key={i.id} data-testid={`${i.id}-cell`}>
          {playerCall.status === "DEP OUT" && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div className=" flex items-center justify-center text-2xl text-amber-600" data-testid={`${i.id}-dep-out`}><BiExit /></div>
          : playerCall.accepted === true && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div className=" flex items-center justify-center text-2xl text-green-600" data-testid={`${i.id}-tick`}><BsCheck /></div>
          : playerCall.accepted === false && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div className=" flex items-center justify-center text-2xl text-slate-400" data-testid={`${i.id}-cross`}><BsX /></div>
          : playerCall.recieved === true && playerCall.accepted === null && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div className=" flex items-center justify-center text-2xl text-amber-600" data-testid={`${i.id}-pending`}><BsQuestion /></div>
          : playerCall.recieved === false && playerCall.accepted === null && playerCall.calls.filter(j => j.id === i.id).length > 0
          ? <div data-testid={`${i.id}-to-be-offered`} className="flex items-center justify-center text-2xl text-gray-300">•</div>
          : <div data-testid={`${i.id}-not-asked`} className="flex items-center justify-center text-2xl text-gray-300"><BsX /></div>}
        </td>
      ))}
      <td className="">
        <div className=" flex items-center justify-center">
          <button className="m-2 text-xl flex items-center justify-center" data-testid="player-row-menu-btn" onClick={() => setShowMenu(!showMenu)}>
            <BsThreeDotsVertical />
          </button>
        {showMenu && <PlayerRowMenu setShowMenu={(arg) => setShowMenu(arg)} playerCall={playerCall} />}
        </div>
      </td>
    </tr>
  )
}