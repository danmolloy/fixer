import { EnsembleContact } from "@prisma/client"

export type DiaryContactProps = {
  contact: EnsembleContact
  setSelectContact: () => void
  disabled: boolean
}

export default function DiaryContact(props: DiaryContactProps) {
  const { disabled, contact, setSelectContact } = props
  return (
    <div data-testid={`${contact.id}-contact-tile`} className={`${disabled && "opacity-30"} flex flex-row border-y items-center justify-between w-full p-1 text-sm`}>
        <div className="flex flex-col">
          <p>{contact.firstName} {contact.lastName}</p>
        </div>
      <div className="flex flex-col">
        <p>{contact.category}</p>
        <p className="">{contact.role}</p>
      </div>
        <div>
          <button
            data-testid={`${contact.id}-select-btn`}
            disabled={disabled} 
            className=" rounded px-2 py-1 m-1 text-sm border hover:bg-gray-50" 
            onClick={(e) => {e.preventDefault(); setSelectContact()}}>
              Select
          </button>
        </div>
    </div>
  )
}