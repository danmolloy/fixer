import prisma from "../../../../../client"
import { auth } from "../../../../auth"
import SignIn from "../../../../signin/page"
import UpdateAdminForm from "../form"

const getAdmin = async(id: string) => {
  return await prisma.ensembleAdmin.findUnique({
    where: {
      id: id
    }
  })
}

export default async function UpdateAdmin({ params }: { params: { id: string } }) {
  const { id } = params
  const session = await auth()
  const data = session && await getAdmin(id)

  return (
    !session 
    ? <SignIn />
    : !data
    ? <p>No data</p>
    :  <UpdateAdminForm admin={data}  />
  )
}