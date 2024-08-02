import { EnsembleContact } from "@prisma/client"

export type DiaryContactProps = {
  contact: EnsembleContact
  setSelectContact: () => void
  disabled: boolean
}

export default function DiaryContact(props: DiaryContactProps) {
  const { disabled, contact, setSelectContact } = props
  return (
    <div data-testid={`${contact.id}-contact-tile`} className={`${disabled && "opacity-30"} flex flex-row border-b items-center justify-between w-full p-1`}>
      <p>{contact.category}</p>
        <div className="flex flex-col">
          <p>{contact.firstName} {contact.lastName}</p>
          <p>{contact.role}</p>
        </div>
        <div>
          <button
            data-testid={`${contact.id}-select-btn`}
            disabled={disabled} 
            className="text-indigo-600 border border-indigo-600 rounded px-2 py-1 m-1 shadow hover:bg-indigo-50" 
            onClick={(e) => {e.preventDefault(); setSelectContact()}}>
              Select
          </button>
        </div>
    </div>
  )
}