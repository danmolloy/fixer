export type NotificationControlsProps = {
  handleResponse: (arg: boolean) => void;
};

export default function NotificationControls(props: NotificationControlsProps) {
  const { handleResponse } = props;

  return (
    <div
      data-testid='notification-controls'
      className='flex w-full flex-row items-center justify-center'
    >
      <button
        className='m-1 rounded border border-green-500 bg-white px-2 py-1 text-green-500 shadow hover:bg-green-100'
        onClick={() => handleResponse(true)}
      >
        Accept
      </button>
      <button
        className='m-1 rounded border border-red-500 bg-white px-2 py-1 text-red-500 shadow hover:bg-red-100'
        onClick={() => handleResponse(false)}
      >
        Decline
      </button>
    </div>
  );
}
