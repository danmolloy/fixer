import { AiOutlineClose } from "react-icons/ai";

type MenuShellProps = {
  title?: string
  children: React.ReactNode
  setShowMenu: (arg: boolean) => void
  testId?: string
  classNames?: string
}

export default function MenuShell(props: MenuShellProps) {
  const { testId, setShowMenu, children, title, classNames} = props;

  return (
    <div data-testid={testId} className={`bg-white absolute z-20 flex flex-col w-full sm:w-1/2 self-center rounded-2xl border shadow overflow-hidden ${classNames}`}>
      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="ml-4 text-lg text-zinc-400">{title}</h2>
        <button onClick={() => setShowMenu(false)} className="hover:bg-slate-100 m-1 p-2 rounded-full" data-testid={"close-btn"}>
          <AiOutlineClose />
        </button>
      </div>
      <div className=" flex flex-col items-center">
      {children}
      </div>
    </div>
  )
}