import { AiOutlineTeam } from "react-icons/ai";
import { musicianFeatureList } from "../../landingPage/musicianFeatures";

export default function PackageOverview() {
  return (
    <div className="border shadow p-8 rounded-lg">
      <div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-indigo-600 font-bold">Get all-access</p>
          <button className="px-2 py-1 bg-black text-white rounded shadow">
            Get Started
          </button>
        </div>
        <div className="py-4 flex flex-row items-start">
        <p className="text-5xl text-bold">£99</p>
        <div className="ml-1">
          <p className="font-bold">per week</p>
          <p className="text-slate-600 -mt-1">plus taxes</p>
        </div>
        </div>
        <p className="text-slate-600">
        Get week-long access to all of the application UI, marketing, and ecommerce components, as well as all of our site templates for a single one-time purchase.
        </p>
      </div>

      <div className="border-t mt-8 py-8">
      {musicianFeatureList.map(i => (
        <div key={i.key} className="flex flex-row  my-2">
          <div className="text-indigo-600 text-2xl py-2 md:px-2">
            {i.icon}
          </div>
          <div className="flex flex-col px-4">
          <p className="text-slate-600"><span className="text-black font-bold">{i.title}. </span>{i.blurb}</p>
          </div>
        </div>
      ))}
      </div>
      <div className="flex flex-row  m-2 p-2 bg-slate-100 shadow-sm border rounded">
          <div className="text-slate-600 text-2xl py-2 md:px-2">
            <AiOutlineTeam />
          </div>
          <div className="flex flex-col px-4">
          <p className="text-slate-600"><span className="text-black font-bold">We offer packages for admin teams. </span>Contact us for further information on our group solutions.</p>
          </div>
        </div>
    </div>
  )
}