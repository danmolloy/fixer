import { readOnlyTemplate, SentEmailData } from './lib';
import {
  Call,
  ContactMessage,
  EnsembleContact,
  Event,
  EventSection,
  User,
} from '@prisma/client';
import { getDateRange } from '../fixing/contactMessage/api/create/functions';
import { DateTime } from 'luxon';

const url = process.env.URL;

export const eventReminderFixer = (
  event: Event & {
    calls: Call[];
    fixer: User;
  }
): SentEmailData => {
  const subject = `Starting tomorrow: ${event.ensembleName} ${getDateRange(event.calls)}`;
  const email = event.fixer.email!;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${event.fixer.firstName},
  <br /><br />
  This is a reminder that ${event.ensembleName} ${getDateRange(event.calls)} starts tomorrow, of which you are the fixer. Below are the details.
  <br /><br />
  ${event.calls
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
  Gig Status: ${event.confirmedOrOnHold}<br />
  Fee: ${event.fee ? event.fee : 'Not specified'}<br />
  Dress: ${event.dressCode ? event.dressCode : 'Not specified'}<br />
  Additional Information: ${event.additionalInfo ? event.additionalInfo : 'Not specified'}<br />
<br />
<br />
You can update any of the gig details via the event page. Your booked musicians have also received a reminder.
<br />
<br />
Best wishes,<br />
GigFix
  `;
  return {
    subject,
    bodyText,
    email,
    templateID,
  };
};

export const reportUnresponsiveMusicianEmail = (
  data: ContactMessage & {
    contact: EnsembleContact;
    eventSection: EventSection & {
      event: Event & {
        calls: Call[];
        fixer: User;
      };
    };
  }
): SentEmailData => {
  const subject = `Unresponsive Musician Alert`;
  const email = data.eventSection.event.fixer.email!;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${data.eventSection.event.fixer},
  <br />
  <br />
  We are yet to receive a response from ${data.contact.firstName} ${data.contact.lastName} regarding ${data.eventSection.event.ensembleName} ${getDateRange(data.eventSection.event.calls)}.
  <br /><br />
  We made initial contact with them on ${DateTime.fromJSDate(new Date(data.receivedDate!)).toFormat('dd LLL')} via email, with further contact made with text message.
  <br /><br />
  You can send an additional prompt to them via the event page or retract the offer.
  <br /><br />
  Alternatively, you can disregard this message.
    <br /><br />
  Best wishes,<br />
  GigFix
  `;

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
To accept this invitation, simply make an account (it's free) with <a href="https://gigfix.co.uk/"">GigFix</a> and quote the invitation code (see below) to link to the shared ${data.ensembleName} account.
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
  We are contacting the last of your ${data.instrument.toLocaleLowerCase()} players for ${data.dateRange} (${data.ensemble}).
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

export const bookingCompleteEmail = (data: {
  dateRange: string;
  fixerFirstName: string;
  email: string;
  ensemble: string;
}): SentEmailData => {
  const subject = `Gig Fixed: ${data.dateRange} ${data.ensemble}`;
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
