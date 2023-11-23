import { SlOptions } from 'react-icons/sl'

export type DetailHeaderProps = {
  showMenu: boolean
  setShowMenu: (arg: boolean) => void
  eventTitle: string
}

export default function DetailHeader(props: DetailHeaderProps) {
  const { showMenu, setShowMenu, eventTitle } = props
  return (
    <thead data-testid="detail-header"  className='w-full  '>
      <tr className='w-full flex flex-row justify-between items-center'>
        <th>
        <h1 className='font-medium'>{eventTitle}</h1>
        </th>
        <th className='w-12 self-end'>
        <button data-testid="options-btn" onClick={() => setShowMenu(!showMenu)}>
          <SlOptions />
        </button>
        </th>
      </tr>
    </thead>
  )
}