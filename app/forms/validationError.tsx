import { TiTimes } from "react-icons/ti";

export type ValidationErrorProps = {
  errors: string[];
}

export default function ValidationError(props: ValidationErrorProps) {
  const {errors} = props;

  if (errors.length == 0) {
    return null;
  }

  return (
    <div className='bg-red-50 text-red-700 p-4 rounded my-8 text-sm lg:w-1/2 self-center'>
      <div className='flex flex-row items-center'>
        <div className=' text-red-100 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center'>
          <TiTimes />
        </div>
        <p className='ml-2'>There are {errors.length} error(s) in this form</p>
      </div>
      <ul className='mx-4 my-2'>
        {errors.map((i, index) => (
          <li key={index}>• {i}</li>
        ))}
      </ul>
    </div>
  )
}