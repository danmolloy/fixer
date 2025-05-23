export type DetailHeaderProps = {
  eventTitle: string;
};

export default function EventHeader(props: DetailHeaderProps) {
  const { eventTitle } = props;
  return (
    <thead data-testid='detail-header' className='w-full'>
      <tr className='flex w-full flex-row items-center justify-between'>
        <th>
          <h1 className='p-2 font-medium'>{eventTitle}</h1>
        </th>
      </tr>
    </thead>
  );
}
