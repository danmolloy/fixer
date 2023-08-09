import React from "react"
import { SiGooglemessages } from "react-icons/si"
import { RiCalendar2Line } from 'react-icons/ri'
import { BsFillPersonCheckFill } from "react-icons/bs"
import { FiUserPlus } from 'react-icons/fi'


const musicianFeatureList: {key: number, title: string, blurb: string, icon: React.ReactNode}[] = [
  {
    key: 0,
    title: "An intuitive calendar interface",
    blurb: "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: <RiCalendar2Line />
  },
  {
    key: 1, 
    title: "Never miss any information",
    blurb: "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: <BsFillPersonCheckFill />
  },
  {
    key: 2,
    title: "Seamless communication with the fixer",
    blurb: "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: <SiGooglemessages />
  },
  {
    key: 3,
    title: "Get discovered in the directory",
    blurb: "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: <FiUserPlus />
  }
]

export default function MusicianFeatures() {
  return (
    <div data-testid="musician-features" className="border mx-2 my-8 py-4 rounded-lg">
      <div className="sm:py-8 px-4 sm:px-6 ">
      <p className="text-blue-600  text-xl">A modern diary</p>
      <h2 className="text-3xl  py-2">An efficient diary for the modern musician</h2>
{/*       <p className="text-slate-600 font-thin md:w-2/3">
        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. 
        Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
      </p> */}
      </div>
      <div className="flex flex-col px-6 md:flex-row flex-wrap">
      {musicianFeatureList.map(i => (
        <div key={i.key} className="flex flex-row my-2 sm:my-4 md:w-1/2">
          <div className="text-blue-600 text-2xl py-2 md:px-2">
            {i.icon}
          </div>
          <div className="flex flex-col px-4">
            <h3 className="text-lg  py-2">{i.title}</h3>
{/*             <p className="text-slate-600 md:w-2/3">{i.blurb}</p>
 */}          </div>
        </div>
      ))}
      </div>
    </div>
  )
}