export default function MenuItem({children}) {
  return (
    <div className=" hover:bg-slate-100 h-12 font-light w-full flex flex-row items-center text-center">
      {children}
    </div>
  )
}