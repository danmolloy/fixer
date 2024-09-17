import React from 'react';
import { SiFastapi, SiGooglemessages } from 'react-icons/si';
import { BiSpreadsheet } from 'react-icons/bi';
import { FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export const featureList: {
  key: number;
  title: string;
  blurb: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 0,
    title: 'Automated fixing',
    blurb:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: <FaRobot />,
  },
  {
    key: 1,
    title: 'Gig interface',
    blurb:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: <BiSpreadsheet />,
  },
  {
    key: 2,
    title: "Update the orchestra's diary in seconds",
    blurb:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: <SiGooglemessages />,
  },
  {
    key: 3,
    title: 'Share information with the team',
    blurb:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: <SiFastapi />,
  },
];

export default function LandingFeatures() {
  return (
    <div
      className='m-4 flex flex-col rounded-lg border py-4'
      data-testid='fixer-features'
    >
      <div className='bg-white/80 backdrop-blur'>
        <div className='px-4 sm:px-6 sm:py-8'>
          <p className='text-xl text-blue-600'>Work faster</p>
          <h2 className='py-2 text-3xl'>
            Everything you need to manage an orchestra
          </h2>
          <p className='font-thin text-slate-600 md:w-2/3'>
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </div>
        <div className='flex flex-col flex-wrap px-6 md:flex-row'>
          {featureList.map((i) => (
            <div key={i.key} className='my-2 flex flex-row sm:my-4 md:w-1/2'>
              <div className='py-2 text-2xl text-blue-600 md:px-2'>
                {i.icon}
              </div>
              <div className='flex flex-col px-4'>
                <h3 className='py-2 text-lg'>{i.title}</h3>
                <p className='text-slate-600 md:w-2/3'>{i.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link
        href='/about'
        className='m-6 flex flex-row items-center self-end rounded border bg-blue-600 px-2 py-1 text-white hover:bg-blue-700'
      >
        <p className='mr-1'>Learn more</p>
        <FaArrowRight />
      </Link>
    </div>
  );
}
