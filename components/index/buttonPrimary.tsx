import React from "react"

interface ButtonPrimaryProps {
  handleClick: () => void
  id: string
  text: string
  className: string
  type?: "button" | "submit" | "reset" | undefined
}

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  const { handleClick, id, text, className, type } = props

  return (
    <button type={type} className={`${className} border py-1 px-2 m-1 rounded shadow-sm`} data-testid={id} onClick={() => handleClick()}>
      {text}
    </button>
  )
}