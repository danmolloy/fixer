import {
  Call,
  ContactMessage,
  EnsembleContact,
  Event,
  EventSection,
  User,
} from '@prisma/client';
import { DateTime } from 'luxon';
import prisma from '../../client';

export type ShortEmailData = {
  message: string;
  ensembleName: string;
  fixerName: string;
  dateRange: string;
};

export type EmailData = {
  updateMessage?: string;
  accepted: boolean | null;
  dateRange: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  booking: boolean;
  ensembleName: string;
  personalMessage?: string;
  sectionMessage?: string;
  position: string;
  sectionName: string;
  fixerName: string;
  fixerEmail: string;
  fixerMobile: string;
  responseURL: string;
  concertProgram: string;
  confirmed: boolean;
  dressCode: string;
  fee: string;
  additionalInfo?: string;
  calls: {
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
  }[];
};

const url = process.env.URL;
const responseTemplate = 'd-f23e2cc89b50474b95ed0839995510c1';
const readOnlyTemplate = 'd-2b2e84b23956415ba770e7c36264bef9';

export type SentEmailData = {
  subject: string;
  bodyText: string;
  responseLink?: string;
  email: string | string[];
  templateID: string;
};

export const createSentEmail = async (
  data: SentEmailData & { eventId: number }
) => {
  console.log(`createSentEmail called`);
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

export const createOfferEmail = async (
  data: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
    eventSection: EventSection & {
      event: Event & {
        fixer: User;
      };
    };
  }
): Promise<SentEmailData> => {
  console.log(`createOfferEmail called`);

  const subject = `${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName})`;
  const templateID = responseTemplate;
  const responseLink = `${url}/fixing/response${data.token}/`;
  const email = data.contact.email!;
  const bodyText = `Dear ${data.contact.firstName}, <br />
  ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName}) ${data.bookingOrAvailability.toLocaleLowerCase() === 'booking' ? 'offers' : 'checks your availability for'} the following: <br />
  <br />
  ${data.calls
    .map(
      (i) =>
        DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm DD') +
        ' to<br />' +
        DateTime.fromJSDate(new Date(i.endTime)).toFormat('HH:mm DD') +
        '<br />' +
        i.venue +
        '<br /><br />'
    )
    .join(',')}
  <br />
  Gig Status: ${data.eventSection.event.confirmedOrOnHold}<br />
  Position: ${data.position}<br />
  Fee: ${data.eventSection.event.fee ? data.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${data.eventSection.event.dressCode ? data.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${data.eventSection.event.additionalInfo ? data.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${data.playerMessage !== null ? data.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + data.playerMessage : ''}
<br />
<br />
  Click the blue 'Respond' button below or follow <a href="${responseLink}">this link</a> to respond. <br /> <br />

  If you need further information, contact ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} at ${data.eventSection.event.fixer.email} or ${data.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix
  `;

  const emailData = {
    subject,
    responseLink,
    email,
    bodyText,
    templateID,
  };

  await createSentEmail({
    ...emailData,
    eventId: data.eventSection.eventId,
  });

  return emailData;
};

export const messageToAllEmail = async (data: {
  dateRange: string;
  fixerFullName: string;
  email: string[];
  message: string;
  ensemble: string;
  eventId: number;
}): Promise<SentEmailData> => {
  const subject = `Message from ${data.fixerFullName} ${data.ensemble}`;
  const email = data.email;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear musician,
  <br />
  <br />
  ${data.fixerFullName} sends the following message regrading ${data.ensemble} ${data.dateRange}:
  <br />
  <br />
  ${data.message}
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`;

  const emailData = {
    subject,
    bodyText,
    email,
    templateID,
  };

  await createSentEmail({
    ...emailData,
    eventId: data.eventId,
  });
  return emailData;
};

export const bookingCompleteEmail = (data: {
  dateRange: string;
  fixerFirstName: string;
  email: string;
  ensemble: string;
}): SentEmailData => {
  const subject = `Booking Complete: ${data.dateRange} ${data.ensemble}`;
  const email = data.email;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${data.fixerFirstName},
  <br />
  <br/>
  We are pleased to inform you that your requested booking is complete for ${data.dateRange} (${data.ensemble}).
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`;

  return {
    subject,
    bodyText,
    email,
    templateID,
  };
};

export const listExhaustedEmail = (data: {
  dateRange: string;
  fixerFirstName: string;
  email: string;
  ensemble: string;
  instrument: string;
}): SentEmailData => {
  const subject = `Action Required: ${data.instrument} list exhausted`;
  const email = data.email;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${data.fixerFirstName},
  <br />
  <br/>
  We are running out of ${data.instrument.toLocaleLowerCase()} players for ${data.dateRange} (${data.ensemble}).
  <br />
  <br />
  To continue with our fixing attempts, you need to add more ${data.instrument.toLocaleLowerCase()} players to the list.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`;

  return {
    subject,
    bodyText,
    email,
    templateID,
  };
};

export const adminInviteEmail = (data: {
  firstName: string;
  ensembleName: string;
  senderName: string;
  inviteID: string;
  email: string;
}): SentEmailData => {
  const subject = `Invitation from ${data.senderName} (${data.ensembleName})`;
  const email = data.email;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${data.firstName},
  <br />
  <br />
${data.senderName} (${data.ensembleName}) invites you to join the admin team at GigFix. 
<br />
<br />
To accept this (it's free), simply make an account with <a href="https://gigfix.co.uk/"">GigFix</a> and quote the invitation code (see below) to link to the shared ${data.ensembleName} account.
<br />
<br />
If you already have an account, you can join it to this ensemble.
<br />
<br />
Invitation code:  ${data.inviteID} 
<br />
<br />
Kind regards,
<br />
GigFix`;

  return {
    subject,
    bodyText,
    email,
    templateID,
  };
};

export const releaseDepperEmail = async (data: {
  dateRange: string;
  firstName: string;
  email: string;
  ensemble: string;
  eventId: number;
}): Promise<SentEmailData> => {
  const subject = `Update: ${data.dateRange} ${data.ensemble}`;
  const email = data.email;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${data.firstName},
  <br />
  <br/>
  We are pleased to inform you that you have been released from ${data.dateRange} (${data.ensemble}).
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`;

  const emailData = {
    subject,
    bodyText,
    email,
    templateID,
  };
  await createSentEmail({
    ...emailData,
    eventId: data.eventId,
  });
  return emailData;
};

export const responseConfEmail = (data: {
  dateRange: string;
  firstName: string;
  email: string;
  ensemble: string;
  accepted: boolean;
  bookingOrAvailability: string;
}): SentEmailData => {
  const subject = `Response Confirmation: ${data.dateRange} ${data.ensemble}`;
  const email = data.email;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${data.firstName},
  <br />
  <br/>
  ${
    data.bookingOrAvailability.toLocaleLowerCase() === 'booking'
      ? `This email confirms you ${data.accepted ? 'accepted' : 'declined'} ${data.dateRange} (${data.ensemble}).`
      : `This email confirms you indicated your availability for ${data.dateRange} (${data.ensemble}).`
  }
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`;

  return {
    subject,
    bodyText,
    email,
    templateID,
  };
};
