export type SubmitButtonProps = {
  disabled: boolean;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { disabled } = props;
  return (
    <button
      disabled={disabled}
      type='submit'
      className='m-2 w-16 rounded bg-blue-600 px-2 py-1 text-sm text-white shadow-sm hover:bg-blue-500 disabled:opacity-40'
    >
      Submit
    </button>
  );
}
