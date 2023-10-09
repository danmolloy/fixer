import PackageOverview from "./packageOverview";

export default function PricingIndex() {
  return (
    <div>
      <div className="py-6">
      <p className="text-indigo-600 text-xl">Pricing</p>
      <h2 className="text-3xl  py-2">No commitments</h2>
      <p className="text-slate-600 font-thin md:w-2/3">
        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. 
        Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
      </p>
      </div>
      <PackageOverview />
    </div>
  )
}