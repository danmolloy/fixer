import { SlOptions } from 'react-icons/sl'

export type DetailHeaderProps = {
  showMenu: boolean
  setShowMenu: (arg: boolean) => void
  eventTitle: string
}

export default function DetailHeader(props: DetailHeaderProps) {
  const { showMenu, setShowMenu, eventTitle } = props
  return (
    <thead data-testid="detail-header">
      <tr>
        <th>
        <h1 >{eventTitle}</h1>
        </th>
        <th>
        <button data-testid="options-btn" onClick={() => setShowMenu(!showMenu)}>
          <SlOptions />
        </button>
        </th>
      </tr>
    </thead>
  )
}