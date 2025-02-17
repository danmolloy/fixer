import { AiOutlineLoading } from 'react-icons/ai';
import { TiThumbsUp } from 'react-icons/ti';

export type SubmitButtonProps = {
  disabled: boolean;
  status?: 'SUBMITTING' | 'SUCCESS';
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { disabled, status } = props;
  return (
    <button
      data-testid='submit-btn'
      disabled={disabled}
      type='submit'
      className='m-2 flex w-16 items-center justify-center rounded bg-blue-600 px-2 py-1 text-sm text-white shadow-sm hover:bg-blue-500 disabled:opacity-40'
    >
      {status === 'SUBMITTING' ? (
        <AiOutlineLoading className='animate-spin' />
      ) : status === 'SUCCESS' ? (
        <TiThumbsUp />
      ) : (
        <p>Submit</p>
      )}
    </button>
  );
}
