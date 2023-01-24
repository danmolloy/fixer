import Link from "next/link"

export const fakeLists = [
  {
    listId: 1,
    listName: "Permanent Cellists",
    instrument: ["Cello"],
    listInfo: "A-Team",
    listMembers: [{name:"Eoghan Kelly", instrument: "Trombone"}, {name:"Fiona Kelly", instrument: "Flute"}, {name:"Ed Parr", instrument: "Trombone"}, {name:"James Jamerson", instrument: "Bass Guitar"}, {name:"Johann Bach", instrument: "Clavichord"}],
    visibleTo: ["@dan"]
  },
  {
    listId: 1,
    listName: "Freelance Cellists",
    instrument: ["Cello"],
    listInfo: "Try permanents first",
    listMembers: [{name:"Eoghan Kelly", instrument: "Trombone"}, {name:"Fiona Kelly", instrumennt: "Flute"}, {name:"Ed Parr", instrument: "Trombone"}, {name:"James Jamerson", instrument: "Bass Guitar"}, {name:"Johann Bach", instrument: "Clavichord"}],
    visibleTo: ["@dan"]
  }
]

export default function PlayerList({ callList, addPlayer }) {
  return (
    <div className="list-arr-div">
        {fakeLists.map(i => (
          <div key={i.listId} className="single-list-div">
            <h2>{i.listName}</h2>
            <p>Instrument(s): {i.instrument}</p>
            <p className="">{i.listInfo}</p>
            <ul>
              {i.listMembers.map(i => (
                callList 
                ? <button onClick={() => addPlayer(i)} className="flex flex-col">
                    <p>{i.name}</p>
                  </button>
                : <Link href="/" key={i.name}>
                    <p>{i.name}</p>
                  </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
  )
}