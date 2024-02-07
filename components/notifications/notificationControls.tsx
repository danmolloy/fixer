export type NotificationControlsProps = {
  handleResponse: (arg: boolean) => void
}

export default function NotificationControls(props: NotificationControlsProps) {
  const { handleResponse } = props;

  return (
    <div data-testid="notification-controls">
      <button onClick={() => handleResponse(true)}>
        Accept
      </button>
      <button onClick={() => handleResponse(false)}>
        Decline
      </button>
    </div>
  )
}