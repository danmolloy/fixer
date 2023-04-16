import Layout from "../../components/layout/layout";
import { useState } from "react";
import PlayerDirectory from "../../components/directory/playerDirectory";


export default function Directory({ users }) {
  const [selectedDiv, setSelectedDiv] = useState(null)


  if (!users) return <p>Loading..</p>

  return (
    <Layout pageTitle="Directory">
      <PlayerDirectory data={users} />
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.URL}/api/user/findAll`)
  const users = await res.json()

  return {
    props: {
      users,
    },
  }
}
