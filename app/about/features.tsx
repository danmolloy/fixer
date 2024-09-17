import { BiSpreadsheet } from 'react-icons/bi';
import { FaRobot } from 'react-icons/fa';
import { SiFastapi, SiGooglemessages } from 'react-icons/si';

export const fixerFeatureList: {
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
    title: 'Find new players in the directory',
    blurb:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: <SiFastapi />,
  },
];

export default function AboutFeatures() {
  return (
    <div data-testid='about-features' className=''>
      <div className='pb-6'>
        <p className='text-xl text-indigo-600'>Fix faster</p>
        <h2 className='py-2 text-3xl'>
          Everything you need to book an orchestra
        </h2>
        <p className='font-thin text-slate-600 md:w-2/3'>
          Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
          Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
          In mi viverra elit nunc.
        </p>
      </div>

      <p className='py-8'>
        Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
        arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
        feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
        Eleifend egestas fringilla sapien.
      </p>
      <div className='border-l border-l-indigo-600 px-8'>
        <p className='pb-4 font-bold'>
          “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus
          purus. Lectus nibh ullamcorper ac dictum justo in euismod. Risus
          aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
          tristique.”
        </p>
        <div className='flex flex-row items-center'>
          <div className='ml-4'>
            <p className='font-bold'>Roy Dereks</p>
            <p className='text-gray-400'>Fixer</p>
          </div>
        </div>
      </div>
      <p className='py-8'>
        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
        Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent
        donec est. Odio penatibus risus viverra tellus varius sit neque erat
        velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
        risus enim. Mattis mauris semper sed amet vitae sed turpis id.
      </p>
      <div className='flex flex-col flex-wrap px-6 md:flex-row'>
        {fixerFeatureList.map((i) => (
          <div key={i.key} className='my-1 flex flex-row sm:my-2 md:w-1/2'>
            <div className='py-2 text-2xl text-blue-600 md:px-2'>{i.icon}</div>
            <div className='flex flex-col px-4'>
              <h3 className='py-2 text-lg'>{i.title}</h3>
              <p className='text-slate-600 md:w-2/3'>{i.blurb}</p>
            </div>
          </div>
        ))}
      </div>
      <p className='py-8'>
        Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id
        et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt
        ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing
        egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
      </p>
    </div>
  );
}
