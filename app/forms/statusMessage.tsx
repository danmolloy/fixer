import { TiWarning, TiTick } from "react-icons/ti";

export type StatusMessageProps = {
  status?: string
}

export default function StatusMessage(props: StatusMessageProps) {
  const { status } = props;

  if (!status) {
    return null;
  }

  if (status.toLocaleLowerCase() === "success") {
    return (
      <div className='bg-blue-100 text-blue-800 p-4 rounded my-8 text-sm lg:w-1/2 self-center'>
      <div className='flex flex-row items-center'>
        <div className=' text-blue-100 bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center'>
          <TiTick />
        </div>
        
        <p className='ml-2'>Form successfully submitted</p>
      </div>
    </div>
    )
  }

  return (
    <div className='bg-amber-100 text-amber-800 p-4 rounded my-8 text-sm lg:w-1/2 self-center'>
      <div className='flex flex-row items-center'>
        <div className=' text-amber-100 bg-amber-500 w-5 h-5 rounded-full flex items-center justify-center'>
          <TiWarning />
        </div>
        
        <p className='ml-2'>{status}</p>
      </div>
    </div>
  )
}