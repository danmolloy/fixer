import axios from 'axios';
import { getDateRange } from '../../../fixing/contactMessage/api/create/functions';
import { DateTime } from 'luxon';

export default async function EnsembleUsage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const subData = await axios.post(
    `${process.env.URL}/billing/api/subscription`,
    { subscriptionID: id }
  );


  if (!subData) {
    return (<div>No data</div>);
  }

  return (
    <div className='p-4'>
      <h1>Meter Overview</h1>
      <p>{`${new Date(subData.data.invoices.data[0].period_start * 1000)} - ${new Date(subData.data.invoices.data[0].period_end * 1000)}`}</p>
      <table className='w-[90vw] overflow-scroll'>
        <thead>
        <tr>
          <th>
            Event
          </th>
          <th>
            Musician
          </th>
          <th>
            Price
          </th>
        </tr>
        </thead>
        <tbody>
          {subData.data.meterEvents.map(i => (
            <tr key={i.id}>
              <td>{`${i.contactMessage.eventSection.event.eventTitle} ${DateTime.fromJSDate(new Date(i.contactMessage.eventSection.event.calls.sort((a, b) => a.startTime - b.startTime)[0].startTime)).toFormat("dd/LL/yyyy")} -  ${DateTime.fromJSDate(new Date(i.contactMessage.eventSection.event.calls.sort((a, b) => a.startTime - b.startTime)[i.contactMessage.eventSection.event.calls.length - 1].startTime)).toFormat("dd/LL/yyyy")}`}</td>
              <td>{`${i.contactMessage.contact.firstName} ${i.contactMessage.contact.lastName} (${i.contactMessage.eventSection.ensembleSection.name})`}</td>
              <td>£{Number(i.value).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
