import {
  Call,
  ContactMessage,
  EnsembleContact,
  Event,
  EventSection,
  User,
} from '@prisma/client';
import { DateTime } from 'luxon';
import { getDateRange } from '../fixing/contactMessage/api/create/functions';
import { createSentEmail, readOnlyTemplate, responseTemplate, SentEmailData } from './lib';

const url = process.env.URL;

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
  const subject = 
    data.bookingOrAvailability === "Booking" && data.accepted === true 
    ? `Booking Alert: ${getDateRange(data.calls)} ${data.eventSection.event.ensembleName}`
    : data.bookingOrAvailability === "Booking" && data.accepted === null 
    ? `Action Required: Offer from ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName})`
    : `Action Required: Availability check from ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName})`
  
  const templateID = 
    (data.bookingOrAvailability === "Booking" && data.accepted === true) 
    ? readOnlyTemplate : responseTemplate

  const responseLink = `${url}/fixing/response/${data.token}/`;
  const email = data.contact.email!;
  const bodyText = `Dear ${data.contact.firstName}, <br />
  ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName}) ${(data.bookingOrAvailability.toLocaleLowerCase() === 'booking' && data.accepted === true) ? 'has booked you for' : data.bookingOrAvailability.toLocaleLowerCase() === 'booking' ? 'offers' : 'checks your availability for'} the following: <br />
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
${data.accepted === true && data.bookingOrAvailability === "Booking" 
? `View up to date gig details at <a href="${responseLink}">this link</a>.<br /><br />`
:`Click the blue 'Respond' button below or follow <a href="${responseLink}">this link</a> to respond. <br /> <br />`}

  If you need further information, contact ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} at ${data.eventSection.event.fixer.email} or ${data.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`;

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

export const updateOfferEmail = async (
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
  const subject = data.accepted === null 
    ? `Action Required: Update from ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName})`
    : `Update: ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName})`;
  const templateID = responseTemplate;
  const responseLink = `${url}/fixing/response/${data.token}/`;
  const email = data.contact.email!;
  const bodyText = `Dear ${data.contact.firstName}, <br />
  <br />
  <br />
  ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} has updated your details regarding the below gig. Please respond promptly.
  <br />
  <br />
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
  ${ data.accepted === null
? `Click the blue 'Respond' button below or follow <a href="${responseLink}">this link</a> to respond.`
: `You can view up to date gig details at <a href="${responseLink}">this link</a>. It has been marked as ${data.accepted ? 'accepted' : 'declined'}.`
}<br /> <br />

  If you need further information, contact ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} at ${data.eventSection.event.fixer.email} or ${data.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`;

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

export const gigUpdateEmail = async (data: {
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
  ${data.fixerFullName} has updated ${data.ensemble} ${data.dateRange}, and sends the following message:
  <br />
  <br />
  ${data.message}
  <br />
  <br />
  End of Message.
  <br />
  <br />
  Please refer to the link sent in your original gig offer for full up-to-date gig details.
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
  <br />
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

export const responseConfEmail = async (data: {
  dateRange: string;
  firstName: string;
  email: string;
  ensemble: string;
  accepted: boolean;
  token: string;
  bookingOrAvailability: string;
}): Promise<SentEmailData> => {
  const subject = `Response Confirmation: ${data.dateRange} ${data.ensemble}`;
  const email = data.email;
  const templateID = readOnlyTemplate;
  const responseLink = `${url}/fixing/response/${data.token}/`;
  const bodyText = `Dear ${data.firstName},
  <br />
  <br />
  ${
    data.bookingOrAvailability.toLocaleLowerCase() === 'booking'
      ? `This email confirms you ${data.accepted ? 'accepted' : 'declined'} ${data.dateRange} (${data.ensemble}).`
      : `This email confirms you ${data.accepted ? 'indicated your availability for' : 'declined'} ${data.dateRange} (${data.ensemble}).`
  }
  <br />
  Please refer to your <a href="${responseLink}">response page</a> for up to date information and confirmation of your response.
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

export const eventReminderMusician = (
  data: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
    eventSection: EventSection & {
      event: Event & {
        fixer: User;
      };
    };
  }
): SentEmailData => {
  const subject = `Starting tomorrow: ${data.eventSection.event.ensembleName} ${getDateRange(data.calls)}`;
  const email = data.contact.email!;
  const templateID = readOnlyTemplate;
  const bodyText = `Dear ${data.contact.firstName},
  <br /><br />
  This is a reminder that ${data.eventSection.event.ensembleName} ${getDateRange(data.calls)} starts tomorrow. Below are the details.
  <br /><br />
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

If there are any issues, contact ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} at ${data.eventSection.event.fixer.email} or ${data.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`;
  return {
    subject,
    bodyText,
    email,
    templateID,
  };
};



export const remindUnresponsiveMusicianEmail = (
  data: ContactMessage & {
    calls: Call[];
    contact: EnsembleContact;
    eventSection: EventSection & {
      event: Event & {
        calls: Call[];
        fixer: User;
      };
    };
  }
): SentEmailData => {
  const subject = `Action Required: ${data.eventSection.event.fixer.firstName} ${data.eventSection.event.fixer.lastName} (${data.eventSection.event.ensembleName})`;
  const templateID = responseTemplate;
  const responseLink = `${url}/fixing/response/${data.token}/`;
  const email = data.contact.email!;
  const bodyText = `Dear ${data.contact.firstName}, <br />
  <br />
  We are yet to receive a response from you regarding the gig below. If we have not received a response with 48 hours, we will alert the fixer.
  <br /><br />
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
GigFix`;

  return {
    subject,
    responseLink,
    email,
    bodyText,
    templateID,
  };
};
