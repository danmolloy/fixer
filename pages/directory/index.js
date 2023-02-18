import Link from "next/link";
import Layout from "../../components/layout/layout";
import useSwr from 'swr'
import InstrumentDiv from "../../components/directory/instrumentDiv";
import { useState } from "react";
import PlayerDirectory from "../../components/directory/playerDirectory";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Directory() {
  const { data, error } = useSwr('/api/user/findAll', fetcher)
  const [selectedDiv, setSelectedDiv] = useState(null)

  if (error) return <p>Error</p>

  if (!data) return <p>Loading..</p>

  return (
    <Layout pageTitle="Directory">
      <PlayerDirectory data={data} />
      {/* <div className="directory" id="player-directory">
        <h1 className="m-2 p-2">Directory</h1>
        {[... new Set(data.map(i => i.instrument))].sort()
          .filter(i => i !== null).map(i => (
          <InstrumentDiv instrument={i} musicians={data.filter(j => j.instrument === i)} key={i}>
            {i}
          </InstrumentDiv>))}
      </div> */}
    </Layout>
  )
}