export default function LoadingHeader() {
  return (
    <div data-testid="loading-header" className={"h-20 flex flex-row items-center justify-between"}>
      <h2  className={' p-2 text-2xl mx-2 md:mx-10  '}>
        Gig<span className="text-blue-600 font-semibold">Fix</span>
      </h2> 
    </div>
  )
}