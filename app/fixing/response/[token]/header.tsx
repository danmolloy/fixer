export type ResponseHeaderProps = {
  type: 'AVAILABILITY' | 'BOOKING' | 'AUTOBOOK';
  contactFirstName: string;
  fixerName: string;
};

export default function ResponseHeader(props: ResponseHeaderProps) {
  const { type, contactFirstName, fixerName } = props;
  return (
    <div className='flex w-[95vw] flex-col border bg-white p-2 pb-12 text-center shadow md:w-2/3'>
      <h1 className='my-2 text-2xl font-semibold'>
        {type !== 'AVAILABILITY' ? 'Gig Offer' : 'Availability Check'}
      </h1>

      <p className='my-2 text-sm'>
        Dear {contactFirstName}, {fixerName} would like you to indicate your
        decision below regarding the following gig.
      </p>
    </div>
  );
}
