import Layout from "../../components/layout/layout";
import PlayerDirectory from "../../components/directory/playerDirectory";
import prisma from "../../client";


export default function Directory({ users }) {

  if (!users) return <p>Loading..</p>

  return (
    <Layout pageTitle="Directory">
      <PlayerDirectory data={users} />
    </Layout>
  )
}

/* export async function getStaticProps() {
  const res = await fetch(`${process.env.URL}/api/user/findAll`)
  const users = await res.json()

  return {
    props: {
      users,
    },
  }
}
 */

export async function getServerSideProps() {
  const users = await prisma.user.findMany({})

  return {
    props: {
      users,
    },
  }
}
