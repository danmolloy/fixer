import React from "react"
import { AiOutlineLoading } from 'react-icons/ai';


interface ButtonPrimaryProps {
  isSubmitting?: boolean
  handleClick?: (e?: Event) => void
  id: string
  text: string
  className: string
  type?: "button" | "submit" | "reset" | undefined
}

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  const { handleClick, id, text, className, type, isSubmitting } = props

  return (
    <button disabled={isSubmitting === true ? true : false} type={type} className={`${className} border py-1 px-2 m-1 rounded shadow-sm flex items-center justify-center`} data-testid={id} onClick={handleClick ? () => handleClick(): null}>
      {isSubmitting === true
      ? <div className="p-1 animate-spin text-blue-600">
          {<AiOutlineLoading />}
        </div>
      : text}
    </button>
  )
}