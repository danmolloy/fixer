
const interfaces = [
  {
    id: 0,
    title: "Calendar Overview",
    //imgSrc: 
  },
  {
    id: 1, 
    title: "Gig Detail",
    //imgSrc: 
  },
  {
    id: 2,
    title: "Fixing Dashboard",
    //imgSrc: 
  },
  {
    id: 3,
    title: "Full Run Overview",
    //imgSrc: 
  },
  {
    id: 4,
    title: "Ensemble Detail",
    //imgSrc: 
  }
]


export default function InterfaceIndex() {
  return (
    <div>
      <p>
        Behind the scenes, our powerful tools help you stay on top of every detail.
  From managing your calendar to tracking ensemble activity, everything you need is in one place.

      </p>
      <div>
        {interfaces.map(i => (
          <div key={i.id}>
            <div className="outline aspect-square h-[300px]" /> {/* Placeholder for screenshot */}
            <h3>{i.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}