import React from "react"

interface TableRowMenuProps {
  menuOptions: {
    id: string
    text: string
  }[]
}

export default function TableRowMenu(props: TableRowMenuProps) {
  const { menuOptions } = props;

  return (
    <div data-testid="table-row-menu">
      {menuOptions.map(i => (
        <button onClick={(e) => e.preventDefault()} key={i.id} className="p-2 hover:bg-zinc-50 w-full">
          {i.text}
        </button>
      ))}
    </div>
  );
}