import InstrumentDiv from "./instrumentDiv"
import { instrumentArr } from "../fixing/fixing"

export default function PlayerDirectory(props) {
  const {data } = props

  const directoryArr = instrumentArr.map(i => ({
    instrument: i,
    musicians: data.filter(j => j.instrument === i),
    key: i
  }))

  return (
    <div className="directory" id="player-directory" data-testid="player-directory">
        <div className="main-header">
        <h1 className="m-2 p-2">Directory</h1>

        </div>
        {/* {[... new Set(data.map(i => i.instrument))].sort()
          .filter(i => i !== null).map(i => (
          <InstrumentDiv instrument={i} musicians={data.filter(j => j.instrument === i)} key={i}>
            {i}
          </InstrumentDiv>))} */}
          {directoryArr.map(i => (
            <InstrumentDiv instrument={i.instrument} musicians={i.musicians} key={i.key}/>
          ))}
      </div>
  )
}