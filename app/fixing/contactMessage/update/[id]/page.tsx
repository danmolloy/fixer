import prisma from "../../../../../client";
import { auth } from "../../../../auth";
import SignIn from "../../../../signin/page";
import UpdateContactMessage from "../form";

export const getContactMessage = async (contactMsgID: string) => {
  return await prisma.contactMessage.findUnique({
    where: {
      id: Number(contactMsgID)
    },
    include: {
      calls: true,
      contact: true,
      eventSection: {

        include: {
          ensembleSection: true,
          event: {
            include: {
              calls: true
            }
          }
        }
      }
    }
  })
}

export default async function UpdateContactMessagePage({
  params,
}: {
  params: { id: string };
}) {
    const contactMsgID = params.id;

  const session = await auth();
  const data = contactMsgID && (await getContactMessage(contactMsgID));

  return !session ? (
    <SignIn />
  ) : !data ? (
    <p>No data</p>
  ) :
    <div>
      <UpdateContactMessage 
        instrument={data.eventSection.ensembleSection.name}
        event={data.eventSection.event}  
        contact={data} />
    </div>
}