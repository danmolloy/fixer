import axios from "axios";

export default async function EnsembleUsage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const subData = await axios.post(`${process.env.URL}/billing/api/subscription`, { subscriptionID: id });

  if (!subData) {
    <div>No data</div>
  }

  return (
    <div className="p-4">
      <h1>Invoices</h1>
      <table>
        <thead>
          <tr className="font-semibold text-sm border-b">
            <th className="p-1">Amount</th>
            <th className="p-1">Invoice Number</th>
            <th className="p-1">Due</th>
            <th className="p-1">Created</th>
          </tr>
        </thead>
        <tbody>
        {subData.data.invoices.data.map(i => (
        <tr key={i.id} className="text-sm border-b">
          <td className="p-1 px-2 flex flex-row"><p>{i.amount_due}</p><p>{String(i.currency).toUpperCase()}</p>{i.paid ? <p>PAID</p> : <p>NOT PAID</p>}</td>
          <td className="p-1 px-2">{i.number}</td>
          <td className="p-1 px-2">{i.due_date === null ? "-" : i.due_date}</td>
          <td className="p-1 px-2">{i.created}</td>

        </tr>
      ))}
        </tbody>
      </table>
      
    </div>
  )
}