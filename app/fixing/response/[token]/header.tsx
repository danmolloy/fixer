
export type ResponseHeaderProps = {
  bookingOrAvailability: string
  contactFirstName: string
  fixerName: string
}

export default function ResponseHeader(props: ResponseHeaderProps) {
  const { bookingOrAvailability, contactFirstName, fixerName } = props;
  return (
    <div className='p-2 flex flex-col w-[95vw] md:w-2/3 pb-12 border shadow bg-white text-center'>
       <h1 className='text-2xl font-semibold my-2'>
          {bookingOrAvailability.toLocaleLowerCase() === 'booking'
            ? 'Gig Offer'
            : 'Availability Check'}
        </h1>
        
          <p className='my-2 text-sm '>
            Dear {contactFirstName}, {fixerName} would like you to indicate your decision below regarding the following gig.
          </p>
        
      </div>
  )
}