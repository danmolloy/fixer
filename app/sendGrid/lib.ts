import prisma from '../../client';

const url = process.env.URL;
export const responseTemplate = 'd-f23e2cc89b50474b95ed0839995510c1';
export const readOnlyTemplate = 'd-2b2e84b23956415ba770e7c36264bef9';

export type SentEmailData = {
  subject: string;
  bodyText: string;
  responseLink?: string;
  email: string | string[];
  templateID: string;
  contactMessageID?: number;
};

export const createSentEmail = async (
  data: SentEmailData & { eventId: number }
) => {
  return await prisma.sentEmail.create({
    data: {
      subject: data.subject,
      bodyText: data.bodyText,
      email: data.email.toString(),
      timestamp: new Date(Date.now()),
      event: {
        connect: {
          id: Number(data.eventId),
        },
      },
    },
  });
};
