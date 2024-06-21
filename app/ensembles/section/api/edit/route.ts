import prisma from "../../../../../client"

export type UpdateSectionProps = {
  id: string 
  name: string
  instrument: string
}

const updateSection = async (data: UpdateSectionProps) => {
  return await prisma.ensembleSection.update({
    where: {
      id: data.id
    },
    data: data
  })
}

export async function POST(req: Request) {
  const data = await req.json()
  return Response.json(await updateSection(data))
}