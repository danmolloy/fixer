import prisma from '../../../../../client';
import { auth } from '../../../../auth';
import AuthWall from '../../../../signin/auth';
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

  return (
    <AuthWall session={session}>
    {!data ? (
    <p>No data</p>
  ) : 
    <div className='my-4 flex w-full flex-col items-center rounded p-1 sm:my-8 sm:p-2 md:w-3/4'>
      <UpdateContactMessage
        instrument={data.eventSection.ensembleSection.name}
        event={data.eventSection.event}
        contact={data}
      />
    </div>}
    </AuthWall>
  );
}
