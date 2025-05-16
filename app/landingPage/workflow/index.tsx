
const workflowTiles: {
  id: number;
  title: string;
  //imgSrc: string
}[] = [
  {
    id: 0,
    title: "Create an account"
  },
  {
    id: 1,
    title: "Make an ensemble"
  },
  {
    id: 2,
    title: "Import your contacts"
  },
  {
    id: 3,
    title: "Create an event"
  },
  {
    id: 4,
    title: "Activate the fixing"
  }
]

export default function WorkflowIndex() {
  return (
    <div>
      <div>
        <p>Whether you're setting up your first ensemble or importing a list of seasoned players,
    the workflow is simple and built for speed.</p>
     </div>
      {workflowTiles.map(i => (
        <div key={i.id}>
          <p>{i.title}</p>
          <div className="outline aspect-square h-[300px]" /> {/* Placeholder for screenshot */}
        </div>
      ))}
    </div>
  )
}