import Layout from "../../components/layout/layout";
import PlayerDirectory from "../../components/directory/playerDirectory";
import prisma from "../../client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function Directory() {
  const { data, error, /* isLoading */ } = useSWR('/api/user/findAll', fetcher)
  const [pageTitle, setPageTitle] = useState<string>("Directory")

  if (error) return <div>failed to load</div>
  //if (isLoading) return <div>loading...</div>



  return (
    <Layout pageTitle={pageTitle}>
      <PlayerDirectory data={data} setPageTitle={(instrument) => setPageTitle(instrument)}/>
      {/* <PlayerDirectory data={users} /> */}
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

/* export async function getServerSideProps() {
  const users = await prisma.user.findMany({})

  return {
    props: {
      users,
    },
  }
} */
