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
      'We send the gig info to the players and let you know what they decide. Whether it’s a gig offer, availability check or just one rehearsal, we’ll handle it.',
    icon: <FaRobot />,
  },
  {
    key: 1,
    title: 'Real-Time Updates',
    blurb:
      'Keep track of the fixing with our gig interface. See exactly who has confirmed, declined, or still needs to respond - right when it happens.',
    icon: <BiSpreadsheet />,
  },
  {
    key: 2,
    title: 'Centralised Gig Info',
    blurb:
      'When you create an event, the details are the same details read by the admin team and the whole orchestra. No more communication errors.',
    icon: <BiSpreadsheet />,
  },
  {
    key: 3,
    title: "Update the orchestra's diary in seconds",
    blurb:
      'Whether your changing rehearsal schedule or confirming the gig, we alert all the players immediately.',
    icon: <SiGooglemessages />,
  },
  {
    key: 4,
    title: 'Share information with the team',
    blurb:
      'The orchestra diary can be shared with the entire admin team, and selected freelance fixers can have access to certain events.',
    icon: <SiFastapi />,
  },
];

export default function LandingFeatures() {
  return (
    <div
      className='m-4 flex flex-col rounded-lg border py-4 mb-8'
      data-testid='fixer-features'
    >
      <div className='bg-white/80 backdrop-blur'>
        <div className='px-4 sm:px-6 sm:py-8'>
          <p className='text-xl text-blue-600'>Work faster</p>
          <h2 className='py-2 text-3xl'>
            Streamline your orchestra management
          </h2>
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
