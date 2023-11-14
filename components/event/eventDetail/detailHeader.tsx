import { SlOptions } from 'react-icons/sl'

export type DetailHeaderProps = {
  showMenu: boolean
  setShowMenu: (arg: boolean) => void
  eventTitle: string
}

export default function DetailHeader(props: DetailHeaderProps) {
  const { showMenu, setShowMenu, eventTitle } = props
  return (
    <div data-testid="detail-header">
      <h1 >{eventTitle}</h1>
      <button data-testid="options-btn" onClick={() => setShowMenu(!showMenu)}>
        <SlOptions />
      </button>
    </div>
  )
}