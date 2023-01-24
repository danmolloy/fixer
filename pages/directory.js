import Link from "next/link";
import Layout from "../components/layout";
import useSwr from 'swr'
import InstrumentDiv from "../components/directory/instrumentDiv";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Directory() {
  const { data, error } = useSwr('/api/user', fetcher)
  const [selectedDiv, setSelectedDiv] = useState(null)

  if (error) return <p>Error</p>

  if (!data) return <p>Loading..</p>

  return (
    <Layout>
      <div className="directory" id="player-directory">
        <h1 className="m-2 p-2">Directory</h1>
        {[... new Set(data.map(i => i.instrument))].sort()
          .filter(i => i !== null).map(i => (
          <InstrumentDiv instrument={i} musicians={data.filter(j => j.instrument === i)} key={i}>
            {i}
          </InstrumentDiv>))}
      </div>
    </Layout>
  )
}