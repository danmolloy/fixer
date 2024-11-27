import { TiWarning, TiTick } from 'react-icons/ti';

export type StatusMessageProps = {
  status?: string;
};

export default function StatusMessage(props: StatusMessageProps) {
  const { status } = props;

  if (!status) {
    return null;
  }

  if (status.toLocaleLowerCase() === 'success') {
    return (
      <div className='my-8 self-center rounded bg-blue-100 p-4 text-sm text-blue-800 lg:w-1/2'>
        <div className='flex flex-row items-center'>
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-blue-100'>
            <TiTick />
          </div>

          <p className='ml-2'>Form successfully submitted</p>
        </div>
      </div>
    );
  }

  return (
    <div className='my-8 self-center rounded bg-amber-100 p-4 text-sm text-amber-800 lg:w-1/2'>
      <div className='flex flex-row items-center'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-amber-100'>
          <TiWarning />
        </div>

        <p className='ml-2'>{status}</p>
      </div>
    </div>
  );
}
