import Link from "next/link"
import React from "react"

interface TableRowMenuProps {
  menuOptions?: {
    id: string
    text: string
  }[]
  removePlayer: () => void
  addMessage: () => void
  name: string
}

const menuOptions = [
  {
    text: "Add Message",
    id: "0"
  },
  {
    text: "Fix Player",
    id: "1"
  },
  {
    text: "View Profile",
    id: "2"
  },
  {
    text: "Remove Player",
    id: "3"
  },
]

export default function TableRowMenu(props: TableRowMenuProps) {
  const { menuOptions, removePlayer, addMessage, name } = props;

  return (
    <div data-testid="table-row-menu" className="border absolute mr-4 bg-white shadow-sm rounded">
      <button 
        onClick={(e) => {
          e.preventDefault();
          removePlayer();
          }}  className="p-2 hover:bg-zinc-50 w-full">
            Remove
        </button>
        <button 
        onClick={(e) => {
          e.preventDefault();
          addMessage()
          }}  className="p-2 hover:bg-zinc-50 w-full">
            Add Message
        </button>
        <div className="p-2 hover:bg-zinc-50 w-full text-center">
          <a target="_blank" href={`/user/${name}`} >
            View Profile
          </a>
        </div>
      </div>
  );
}