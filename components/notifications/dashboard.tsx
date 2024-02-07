import { TbMailExclamation } from "react-icons/tb";
import { TbMailOpened } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";


export type NotificationsDashProps = {
  playerCallFilter: (filter: "action"|"past"|null) => void
  ensembleArray: {
    name: string
    id: string
  }[]
  setEnsembleFilter: (ensemble: string) => void
  ensembleFilter: string|null
}

export default function NotificationsDashboard(props: NotificationsDashProps) {
  const { playerCallFilter, ensembleArray, ensembleFilter, setEnsembleFilter } = props;

  return (
    <div data-testid="notifications-dashboard" className="shadow-sm md:shadow-none border-r flex flex-row md:flex-col md:items-start md:w-1/5 md:py-4">
      <button onClick={() => playerCallFilter("action")} className="flex flex-row justify-center items-center px-2 py-1">
        <TbMailExclamation />
        Action Required
      </button>
      <button onClick={() => playerCallFilter("past")} className="flex flex-row justify-center items-center px-2 py-1">
        <TbMailOpened />
        Past Offers
      </button>
      <div className="flex flex-row  md:flex-col justify-center items-center md:items-start ml-2 px-2 py-1">
        <p>Filter by ensemble</p>
        {ensembleArray.length > 0 && ensembleArray.map(i => (
          <button className={`${ensembleFilter === i.id && "bg-blue-500"} flex flex-row text-start md:px-2 py-1 text-sm`} key={i.id} onClick={() => setEnsembleFilter(i.id)}>
            {i.name}
          </button>
        ))}
      </div>
    </div>
  )
}