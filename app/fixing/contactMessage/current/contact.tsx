import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import CurrentContactsOptions from './options';

export type CurrentContactRowProps = {
  eventCalls: Call[];
  contact: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  };
  index: number;
  numContacts: number;
};

export default function CurrentContactRow(props: CurrentContactRowProps) {
  const { eventCalls, contact, index, numContacts } = props;
  return (
    <tr>
      <td>{contact.indexNumber}</td>
      <td>
        <p>{`${contact.contact.firstName} ${contact.contact.lastName}`}</p>
        <p>{contact.position}</p>
      </td>
      {eventCalls.map((i) => (
        <td key={i.id}>
          {contact.calls.map((j) => j.id).includes(i.id) ? 'Y' : 'N'}
        </td>
      ))}
      <td>
        <p>
          {contact.accepted === true
            ? 'Accepted'
            : contact.accepted === false
              ? 'Declined'
              : contact.recieved
                ? 'Recieved'
                : 'Not recieved'}
        </p>
      </td>
      <td>{contact.playerMessage ? contact.playerMessage : 'No message'}</td>
      <td>
        <CurrentContactsOptions
          eventCalls={eventCalls}
          index={index}
          numContacts={numContacts}
          contact={contact}
        />
      </td>
    </tr>
  );
}
