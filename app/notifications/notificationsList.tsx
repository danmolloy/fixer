import { DateTime } from 'luxon';
import { PlayerCallNotification } from '.';
import NotificationPreview from './notificationPreview';

export type NotificationsListProps = {
  playerCalls: PlayerCallNotification[];
  playerCallFilter: 'action' | 'past' | null;
  ensembleFilter: string | null;
};

export default function NotificationsList(props: NotificationsListProps) {
  const { playerCalls, playerCallFilter, ensembleFilter } = props;

  const notificationsFilter = (playerCall: PlayerCallNotification) => {
    if (playerCallFilter === 'action') {
      return playerCall.accepted === null ? true : false;
    } else if (playerCallFilter === 'past') {
      const today = DateTime.now().startOf('day');
      const sortedCalls = playerCall.calls.sort(
        (a, b) =>
          Number(DateTime.fromJSDate(a.startTime)) -
          Number(DateTime.fromJSDate(b.startTime).toMillis)
      );
      const endDate = DateTime.fromJSDate(
        sortedCalls[sortedCalls.length - 1].endTime
      );
      return endDate >= today ? true : false;
    } else {
      return true;
    }
  };

  return (
    <div
      data-testid='notifications-list'
      className='flex w-[95vw] flex-col items-center justify-center p-4 md:w-3/5'
    >
      {playerCalls.length === 0 ? (
        <p>You have no notifications.</p>
      ) : ensembleFilter !== null ? (
        playerCalls
          .filter((i) => i.eventSection.event.ensembleId === ensembleFilter)
          .map((i) => <NotificationPreview key={i.id} playerCall={i} />)
      ) : (
        playerCalls
          .filter((i) => notificationsFilter(i))
          .map((i) => <NotificationPreview key={i.id} playerCall={i} />)
      )}
    </div>
  );
}
