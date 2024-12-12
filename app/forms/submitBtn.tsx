import { AiOutlineLoading } from "react-icons/ai";
import { FaThumbsUp } from "react-icons/fa";

export type SubmitButtonProps = {
  disabled: boolean;
  status?: "SUBMITTING"|"SUCCESS"
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { disabled, status } = props;
  return (
    <button
      disabled={disabled}
      type='submit'
      className='m-2 w-16 rounded bg-blue-600 px-2 py-1 text-sm text-white shadow-sm hover:bg-blue-500 disabled:opacity-40 flex items-center justify-center'
    >
      {status === "SUBMITTING" ? <AiOutlineLoading className="animate-spin" />
      : status === "SUCCESS" ? <FaThumbsUp />
      : <p>Submit</p>}
    </button>
  );
}
