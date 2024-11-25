
export type SubmitButtonProps = {
  disabled: boolean
}

export default function SubmitButton(props: SubmitButtonProps) {
  const {disabled} = props;
  return (
    <button 
              disabled={disabled}
              type='submit' 
              className='text-sm w-16 disabled:opacity-40 bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 m-2 rounded shadow-sm'>Submit</button>

  )
}