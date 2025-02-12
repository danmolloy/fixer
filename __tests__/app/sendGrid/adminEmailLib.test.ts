import { DateTime } from 'luxon';
import { mockCall } from '../../../__mocks__/models/call';
import { mockEvent } from '../../../__mocks__/models/event';
import { mockUser } from '../../../__mocks__/models/user';
import { getDateRange } from '../../../app/fixing/contactMessage/api/create/functions';
import {
  adminInviteEmail,
  bookingCompleteEmail,
  eventReminderFixer,
  listExhaustedEmail,
  reportUnresponsiveMusicianEmail,
} from '../../../app/sendGrid/adminEmailLib';
import { mockContactMessage } from '../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../__mocks__/models/ensembleContact';
import { mockEventSection } from '../../../__mocks__/models/eventSection';
import { readOnlyTemplate } from '../../../app/sendGrid/lib';


describe('eventReminderFixer()', () => {
  const mockArg = {
    ...mockEvent,
    calls: [mockCall],
    fixer: mockUser,
  };
  it('returns expected subject', () => {
    expect(eventReminderFixer(mockArg).subject).toBe(
      `Starting tomorrow: ${mockArg.ensembleName} ${getDateRange(mockArg.calls)}`
    );
  });
  it('returns expected email address', () => {
    expect(eventReminderFixer(mockArg).email).toBe(mockArg.fixer.email);
  });
  it('returns expected templateID', () => {
    expect(eventReminderFixer(mockArg).templateID).toBe('d-2b2e84b23956415ba770e7c36264bef9');
  });
  it('returns expected email body text', () => {
    expect(eventReminderFixer(mockArg).bodyText).toBe(
      `Dear ${mockArg.fixer.firstName},
  <br /><br />
  This is a reminder that ${mockArg.ensembleName} ${getDateRange(mockArg.calls)} starts tomorrow, of which you are the fixer. Below are the details.
  <br /><br />
  ${mockArg.calls
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
  Gig Status: ${mockArg.status}<br />
  Fee: ${mockArg.fee ? mockArg.fee : 'Not specified'}<br />
  Dress: ${mockArg.dressCode ? mockArg.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.additionalInfo ? mockArg.additionalInfo : 'Not specified'}<br />
<br />
<br />
You can update any of the gig details via the event page. Your booked musicians have also received a reminder.
<br />
<br />
Best wishes,<br />
GigFix
  `
    );
  });
});

describe('reportUnresponsiveMusicianEmail()', () => {
  const mockArg = {
    ...mockContactMessage,
    contact: mockEnsembleContact,
    eventSection: {
      ...mockEventSection,
      event: {
        ...mockEvent,
        calls: [mockCall],
        fixer: mockUser,
      },
    },
  };
  it('returns expected subject', () => {
    expect(reportUnresponsiveMusicianEmail(mockArg).subject).toBe(
      'Unresponsive Musician Alert'
    );
  });
  it('returns expected email address', () => {
    expect(reportUnresponsiveMusicianEmail(mockArg).email).toBe(
      mockArg.eventSection.event.fixer.email
    );
  });
  it('returns expected templateID', () => {
    expect(reportUnresponsiveMusicianEmail(mockArg).templateID).toBe(
      readOnlyTemplate
    );
  });
  it('returns expected email body text', () => {
    expect(reportUnresponsiveMusicianEmail(mockArg).bodyText).toBe(
      `Dear ${mockArg.eventSection.event.fixer},
  <br />
  <br />
  We are yet to receive a response from ${mockArg.contact.firstName} ${mockArg.contact.lastName} regarding ${mockArg.eventSection.event.ensembleName} ${getDateRange(mockArg.eventSection.event.calls)}.
  <br /><br />
  We made initial contact with them on ${DateTime.fromJSDate(new Date(mockArg.receivedDate!)).toFormat('dd LLL')} via email, with further contact made with text message.
  <br /><br />
  You can send an additional prompt to them via the event page or retract the offer.
  <br /><br />
  Alternatively, you can disregard this message.
    <br /><br />
  Best wishes,<br />
  GigFix
  `
    );
  });
});

describe('adminInviteEmail()', () => {
  const mockArg = {
    firstName: 'Greg',
    ensembleName: 'GC Trombone-Viola Duo',
    senderName: 'Elliot Gannon',
    inviteID: '123abc',
    email: 'greg@ievers.com.au',
  };
  it('returns expected subject', () => {
    expect(adminInviteEmail(mockArg).subject).toBe(
      `Invitation from ${mockArg.senderName} (${mockArg.ensembleName})`
    );
  });
  it('returns expected email address', () => {
    expect(adminInviteEmail(mockArg).email).toBe(mockArg.email);
  });
  it('returns expected templateID', () => {
    expect(adminInviteEmail(mockArg).templateID).toBe(readOnlyTemplate);
  });
  it('returns expected email body text', () => {
    expect(adminInviteEmail(mockArg).bodyText).toBe(
      `Dear ${mockArg.firstName},
  <br />
  <br />
${mockArg.senderName} (${mockArg.ensembleName}) invites you to join the admin team at GigFix. 
<br />
<br />
To accept this invitation, simply make an account (it's free) with <a href="https://gigfix.co.uk/"">GigFix</a> and quote the invitation code (see below) to link to the shared ${mockArg.ensembleName} account.
<br />
<br />
If you already have an account, you can join it to this ensemble.
<br />
<br />
Invitation code:  ${mockArg.inviteID} 
<br />
<br />
Kind regards,
<br />
GigFix`
    );
  });
});

describe('listExhaustedEmail()', () => {
  const mockArg = {
    dateRange: '12-14 Oct',
    fixerFirstName: 'Hank',
    email: 'hankthetank@hank.com.au',
    ensemble: 'GC Youth Orchestra',
    instrument: 'Harp',
  };
  it('returns expected subject', () => {
    expect(listExhaustedEmail(mockArg).subject).toBe(
      `Action Required: ${mockArg.instrument} list exhausted`
    );
  });
  it('returns expected email address', () => {
    expect(listExhaustedEmail(mockArg).email).toBe(mockArg.email);
  });
  it('returns expected templateID', () => {
    expect(listExhaustedEmail(mockArg).templateID).toBe(readOnlyTemplate);
  });
  it('returns expected email body text', () => {
    expect(listExhaustedEmail(mockArg).bodyText).toBe(
      `Dear ${mockArg.fixerFirstName},
  <br />
  <br/>
  We are contacting the last of your ${mockArg.instrument.toLocaleLowerCase()} players for ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  <br />
  To continue with our fixing attempts, you need to add more ${mockArg.instrument.toLocaleLowerCase()} players to the list.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
    );
  });
});

describe('bookingCompleteEmail()', () => {
  const mockArg = {
    dateRange: '12-14 Oct',
    fixerFirstName: 'Steve',
    email: 'steve@adler.com.au',
    ensemble: 'Sydney Bass Quartet',
  };
  it('returns expected subject', () => {
    expect(bookingCompleteEmail(mockArg).subject).toBe(
      `Gig Fixed: ${mockArg.dateRange} ${mockArg.ensemble}`
    );
  });
  it('returns expected email address', () => {
    expect(bookingCompleteEmail(mockArg).email).toBe(mockArg.email);
  });
  it('returns expected templateID', () => {
    expect(bookingCompleteEmail(mockArg).templateID).toBe(readOnlyTemplate);
  });
  it('returns expected email body text', () => {
    expect(bookingCompleteEmail(mockArg).bodyText).toBe(
      `Dear ${mockArg.fixerFirstName},
  <br />
  <br/>
  We are pleased to inform you that your requested booking is complete for ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
    );
  });
});

/* //describe("sectionFixedAlert()", () => {
it("returns expected subject", () => {});
  it("returns expected email address", () => {});
  it("returns expected templateID", () => {});
  it("returns expected email body text", () => {});
})
 */
/* //describe("gigStatusReport()", () => {
it("returns expected subject", () => {});
  it("returns expected email address", () => {});
  it("returns expected templateID", () => {});
  it("returns expected email body text", () => {});
}) */
