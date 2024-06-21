import { TbMailExclamation } from "react-icons/tb";
import { TbMailOpened } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";


export type NotificationsDashProps = {
  setPlayerCallFilter: (filter: "action"|"past"|null) => void
  ensembleArray: {
    name: string
    id: string
  }[]
  setEnsembleFilter: (ensemble: string) => void
  ensembleFilter: string|null
  playerCallFilter: string|null
}

export default function NotificationsDashboard(props: NotificationsDashProps) {
  const { playerCallFilter, setPlayerCallFilter, ensembleArray, ensembleFilter, setEnsembleFilter } = props;

  return (
    <div data-testid="notifications-dashboard" className="shadow-sm md:shadow-none border-r flex flex-row md:flex-col md:items-start md:w-1/5 md:py-4 overflow-scroll">
      <button onClick={() => setPlayerCallFilter("action")} className={`${playerCallFilter === "action" && "text-indigo-600"} hover:text-indigo-600 flex flex-row justify-center items-center px-2 py-1`}>
        <TbMailExclamation />
        Action Required
      </button>
      <button onClick={() => setPlayerCallFilter("past")} className={`${playerCallFilter === "past" && "text-indigo-600"} hover:text-indigo-600 flex flex-row justify-center items-center px-2 py-1`}>
        <TbMailOpened />
        Past Offers
      </button>
      <div className="">
       <div className="hidden md:flex flex-row justify-start items-center px-2 py-1 ">
        <BsThreeDotsVertical />
        Filter by ensemble
      </div>
      <div className="flex flex-row  md:flex-col justify-center items-center md:items-start ml-2 px-2 py-1">
        {ensembleArray.length > 0 && ensembleArray.map(i => (
          <button className={`${ensembleFilter === i.id && "text-indigo-600"} hover:text-indigo-600 flex flex-row text-start px-2 md:px-2 py-1 text-xs`} key={i.id} onClick={() => setEnsembleFilter(i.id)}>
            {i.name}
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}