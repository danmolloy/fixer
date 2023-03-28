import React from "react"

interface TableRowMenuProps {
  menuOptions?: {
    id: string
    text: string
  }[]
  removePlayer: () => void
  addMessage: () => void
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
  const { menuOptions, removePlayer, addMessage } = props;

  return (
    <div data-testid="table-row-menu">
      {menuOptions 
      ? menuOptions.map(i => (
        <button onClick={(e) => e.preventDefault()} key={i.id} className="p-2 hover:bg-zinc-50 w-full">
          {i.text}
        </button>
      ))
      : <div>
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
      </div>

      
    }
    </div>
  );
}