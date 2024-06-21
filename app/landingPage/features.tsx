import React from "react"
import { SiFastapi, SiGooglemessages } from "react-icons/si"
import { BiSpreadsheet } from "react-icons/bi"
import { FaRobot } from "react-icons/fa"

export const featureList: {key: number, title: string, blurb: string, icon: React.ReactNode}[] = [
  {
    key: 0,
    title: "Automated fixing",
    blurb: "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: <FaRobot />
  },
  {
    key: 1, 
    title: "Gig interface",
    blurb: "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: <BiSpreadsheet />
  },
  {
    key: 2,
    title: "Update the orchestra's diary in seconds",
    blurb: "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: <SiGooglemessages />
  },
  {
    key: 3,
    title: "Find new players in the directory",
    blurb: "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: <SiFastapi />
  }
]

export default function LandingFeatures() {
  return (
    <div className="border mx-2 my-4 py-4 rounded-lg" data-testid="fixer-features">
      <div className="bg-white/80  backdrop-blur ">
      <div className="sm:py-8 px-4 sm:px-6 ">
      <p className="text-blue-600 text-xl">Fix faster</p>
      <h2 className="text-3xl  py-2">Everything you need to book an orchestra</h2>
      {/* <p className="text-slate-600 font-thin md:w-2/3">
        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. 
        Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
      </p> */}
      </div>
      <div className="flex flex-col px-6 md:flex-row flex-wrap">
      {featureList.map(i => (
        <div key={i.key} className="flex flex-row  my-2 sm:my-4  md:w-1/2">
          <div className="text-blue-600 text-2xl py-2 md:px-2">
            {i.icon}
          </div>
          <div className="flex flex-col px-4">
            <h3 className="text-lg py-2">{i.title}</h3>
{/*             <p className="text-slate-600 md:w-2/3">{i.blurb}</p>
 */}          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  )
}