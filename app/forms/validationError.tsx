import { TiTimes } from 'react-icons/ti';

export const extractErrors = (errors: any): string[] => {
  if (!errors) return [];
  if (typeof errors === 'string') return [errors];
  if (Array.isArray(errors)) return errors.flatMap(extractErrors);
  if (typeof errors === 'object')
    return Object.values(errors).flatMap(extractErrors);
  return [];
};

export type ValidationErrorProps = {
  errors: string[];
};

export default function ValidationError(props: ValidationErrorProps) {
  const { errors } = props;

  if (errors.length == 0) {
    return null;
  }

  return (
    <div
      data-testid='validation-error'
      className='my-8 self-center rounded bg-red-50 p-4 text-sm text-red-700 lg:w-1/2'
    >
      <div className='flex flex-row items-center'>
        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-red-100'>
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
  );
}
