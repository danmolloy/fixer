import { auth } from "../auth"
import SignIn from "../signin/page"
import prisma from "../../client"
import Link from "next/link"

const getEnsembles = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      admins: {
        include: {
          ensemble: true
        }
      }
    }
  })
}



export default async function EnsemblesPage() {
  const session = await auth()
  const data = session && await getEnsembles(session.user.id)

  return (
    session 
    ? <div data-testid='ensembles-page' className="p-2">
      <h1>Your Ensembles</h1>
      <Link href="ensembles/create/" className="bg-indigo-600 text-white px-2 py-1 rounded m-1 hover:bg-indigo-500">
        Create Ensemble
      </Link>
      <Link href="ensembles/join/" className="bg-indigo-600 text-white px-2 py-1 rounded m-1 hover:bg-indigo-500">
        Join Ensemble
      </Link>
      {data ? data.admins.map(i => (
        <div key={i.ensemble.id} className="border rounded shadow-sm m-2 px-2 py-2">
          <div className="flex flex-col">
          <h2 className="">{i.ensemble.name}</h2>
          <Link href={`ensembles/${i.ensemble.id}/`} className="border border-indigo-600 text-indigo-600 px-2 py-1 rounded my-2 hover:bg-indigo-100 w-32">View Contacts</Link>
        </div>
        <Link href={`ensembles/update/${i.ensemble.id}`}>
          Edit
        </Link>
        </div>
      )): <p>No Ensembles</p>}
    </div>
    : <SignIn />
  )
}