export type NotificationControlsProps = {
  handleResponse: (arg: boolean) => void
}

export default function NotificationControls(props: NotificationControlsProps) {
  const { handleResponse } = props;

  return (
    <div data-testid="notification-controls" className=" w-full flex flex-row items-center justify-center">
      <button className="border border-green-500 px-2 py-1 m-1 text-green-500 bg-white rounded shadow hover:bg-green-100" onClick={() => handleResponse(true)}>
        Accept
      </button>
      <button className="border border-red-500 px-2 py-1 m-1 text-red-500 bg-white rounded shadow hover:bg-red-100" onClick={() => handleResponse(false)}>
        Decline
      </button>
    </div>
  )
}