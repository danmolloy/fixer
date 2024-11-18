import prisma from '../../../../../client';
import { auth } from '../../../../auth';
import SignIn from '../../../../signin/page';
import UpdateContactMessage from '../form';

async function getContactMessage(contactMsgID: string) {
  return await prisma.contactMessage.findUnique({
    where: {
      id: Number(contactMsgID),
    },
    include: {
      calls: true,
      contact: true,
      eventSection: {
        include: {
          ensembleSection: true,
          event: {
            include: {
              calls: true,
            },
          },
        },
      },
    },
  });
}

export default async function UpdateContactMessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const contactMsgID = (await params).id;

  const session = await auth();
  const data = contactMsgID && (await getContactMessage(contactMsgID));

  return !session ? (
    <SignIn />
  ) : !data ? (
    <p>No data</p>
  ) : (
    <div>
      <UpdateContactMessage
        instrument={data.eventSection.ensembleSection.name}
        event={data.eventSection.event}
        contact={data}
      />
    </div>
  );
}
