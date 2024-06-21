export const viewOptions = ["Day", "Month", "Year"]

export type ViewSelectProps = {
  selectedView: string
  setSelectedView: (arg: string) => void
}

export default function ViewSelect(props: ViewSelectProps) {
  const { selectedView, setSelectedView } = props;


  return (
    <select value={selectedView} onChange={(e) => setSelectedView(e.target.value)} className="p-1 shadow-sm rounded">
      {viewOptions.map((i: "Day"|"Month"|"Year") => (
          <option value={i} key={i} data-testid={`${i}-option`}>
              {i}
          </option>
        ))}
    </select>
  )
  }