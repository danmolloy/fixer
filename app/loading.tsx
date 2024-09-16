import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div
      data-testid='loading'
      className='mt-24 flex w-full flex-col items-center justify-center'
    >
      <p className='text-xl font-medium'>Loading...</p>
      <div className='m-4 animate-spin text-xl text-indigo-500'>
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  );
}
