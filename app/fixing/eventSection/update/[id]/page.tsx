import prisma from "../../../../../client";
import { auth } from "../../../../auth";
import SignIn from "../../../../signin/page";
import UpdateEventSection from "../form";

export const getEventSection = async (eventSectionID: string) => {
  return await prisma.eventSection.findUnique({
    where: {
      id: Number(eventSectionID)
    },
    include: {
      contacts: {
        include: {
          contact: true,
          calls: true,
        },
      },
      event: {
        include: {
          calls: true
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
    const eventSectionID = params.id;

  const session = await auth();
  const data = eventSectionID && (await getEventSection(eventSectionID));

  return !session ? (
    <SignIn />
  ) : !data ? (
    <p>No data</p>
  ) :
    <div>
      <UpdateEventSection eventSection={data} />
    </div>
}