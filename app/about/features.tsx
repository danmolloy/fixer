import { BiSpreadsheet } from 'react-icons/bi';
import { FaRobot } from 'react-icons/fa';
import { SiFastapi, SiGooglemessages } from 'react-icons/si';
import { featureList } from '../landingPage/features';


export default function AboutFeatures() {
  return (
    <div data-testid='about-features' className=''>
      <div className='pb-6'>
        <h2 className='py-2 text-xl'>
        Streamline your orchestra management

        </h2>
        <p className='font-thin text-slate-600 md:w-2/3'>
        GigFix is a communications solution designed specifically for orchestra management. We strive to streamline communication between orchestras and their musicians, making event organisation seamless and stress-free.

        </p>
      </div>

      <p className='py-4'>
      We understand the complexities of managing an orchestra, from fixing players to managing changing schedules. Founded by freelance musicians, GigFix aims to tackle the unique communication challenges of orchestras. Our goal is to simplify and optimise orchestra management.

      </p>
      
      <p className='py-4'>
      {`Whether you're managing a small ensemble or a full-time symphony orchestra, our intuitive platform gives you full control over bookings, updates and any other communications. From booking musicians and handling availability checks to notifying players of last minute changes, GigFix ensures everyone is in the loop.`}
      </p>
      <div className='flex flex-col flex-wrap px-6 md:flex-row'>
        {featureList.map((i) => (
          <div key={i.key} className='my-1 flex flex-row sm:my-2 md:w-1/2'>
            <div className='py-2 text-2xl text-blue-600 md:px-2'>{i.icon}</div>
            <div className='flex flex-col px-4'>
              <h3 className='py-2 text-lg'>{i.title}</h3>
              <p className='text-slate-600 md:w-2/3'>{i.blurb}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
