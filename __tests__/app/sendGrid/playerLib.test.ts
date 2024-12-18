import { DateTime } from "luxon";
import { mockCall } from "../../../__mocks__/models/call";
import { mockContactMessage } from "../../../__mocks__/models/contactMessage";
import { mockEnsembleContact } from "../../../__mocks__/models/ensembleContact";
import { mockEvent } from "../../../__mocks__/models/event";
import { mockEventSection } from "../../../__mocks__/models/eventSection";
import { mockSentEmail } from "../../../__mocks__/models/sentEmail";
import { mockUser } from "../../../__mocks__/models/user";
import { prismaMock } from "../../../__mocks__/singleton";
import { createOfferEmail, eventReminderMusician, gigUpdateEmail, messageToAllEmail, releaseDepperEmail, remindUnresponsiveMusicianEmail, responseConfEmail, ResponseConfEmailProps, updateOfferEmail } from "../../../app/sendGrid/playerLib";
import { getDateRange } from "../../../app/fixing/contactMessage/api/create/functions";
import { createSentEmail, readOnlyTemplate, responseTemplate } from "../../../app/sendGrid/lib";

jest.mock("../../../app/sendGrid/lib", () => ({
  createSentEmail: jest.fn()
}))

describe("createOfferEmail()", () => {
  const mockArg = {
    ...mockContactMessage,
    contact: mockEnsembleContact,
    calls: [mockCall],
    eventSection: {
      ...mockEventSection,
      event: {
        ...mockEvent,
        fixer: mockUser
      }
    }
  }
  it("returns expected subject if availability check", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail({
      ...mockArg,
      type: "AVAILABILITY",
      accepted: null
    })).subject)
      .toBe(`Action Required: Availability check from ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName})`);
  });
  it("returns expected subject if booking", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail({
      ...mockArg,
      type: "BOOKING",
      accepted: null
    })).subject)
      .toBe(`Action Required: Offer from ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName})`);
    
    });
  it("returns expected subject if booked on behalf of", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
      expect((await createOfferEmail({
        ...mockArg,
        accepted: true,
        type: "AUTOBOOK"
      })).subject)
        .toBe(`Booking Alert: ${getDateRange(mockArg.calls)} ${mockArg.eventSection.event.ensembleName}`);
  });
  it("returns expected email address", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail(mockArg)).email)
    .toBe(mockArg.contact.email);
  });
  it("returns expected templateID if response not required", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail({
      ...mockArg,
      accepted: true,
      type: "BOOKING"
    })).templateID)
      .toBe(readOnlyTemplate);
      expect((await createOfferEmail({
        ...mockArg,
        accepted: true,
        type: "AUTOBOOK"
      })).templateID)
        .toBe(readOnlyTemplate);
        expect((await createOfferEmail({
          ...mockArg,
          accepted: null,
          type: "AUTOBOOK"
        })).templateID)
          .toBe(readOnlyTemplate);
  });
  it("returns expected templateID if response required", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail({
      ...mockArg,
      accepted: null,
      type: "BOOKING"
    })).templateID)
      .toBe(responseTemplate);
    
    expect((await createOfferEmail({
      ...mockArg,
      accepted: null,
      type: "AVAILABILITY"
    })).templateID)
      .toBe(responseTemplate);
  });
  it("returns expected email body text if booking", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail({
      ...mockArg,
      accepted: null,
      type: "BOOKING"
    })).bodyText)
      .toBe(
        `Dear ${mockArg.contact.firstName}, <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName}) offers the following: <br />
  <br />
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />
Click the blue 'Respond' button below or follow <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">this link</a> to respond. <br /> <br />

  If you need further information, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`
      );
  })
      it("returns expected email body text if availability check", async () => {
        prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail({
      ...mockArg,
      type: "AVAILABILITY"
    })).bodyText)
      .toBe(
        `Dear ${mockArg.contact.firstName}, <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName}) checks your availability for the following: <br />
  <br />
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />
Click the blue 'Respond' button below or follow <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">this link</a> to respond. <br /> <br />

  If you need further information, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`
      );
  })
  it("returns expected email body text if booked on behalf of", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await createOfferEmail({
      ...mockArg,
      type: "AUTOBOOK",
      accepted: true
    })).bodyText)
      .toBe(
        `Dear ${mockArg.contact.firstName}, <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName}) has booked you for the following: <br />
  <br />
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />
View up to date gig details at <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">this link</a>.<br /><br />

  If you need further information, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`
      );
  })
  it("calls createSentEmail with expected args", () => {}) 
});

describe("updateOfferEmail()", () => {
  const mockArg = {
    ...mockContactMessage,
    calls: [mockCall],
    contact: mockEnsembleContact,
    eventSection: {
      ...mockEventSection,
      event: {
        ...mockEvent,
        fixer: mockUser
      }
    }
  }
  it("returns expected subject if response not required", async () => {
    expect(( await updateOfferEmail({...mockArg, accepted: true})).subject)
      .toBe(`Update: ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName})`);
  });
  it("returns expected subject if response required", async () => {
    expect(( await updateOfferEmail({...mockArg, accepted: null})).subject)
      .toBe(`Action Required: Update from ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName})`);
  });
  it("returns expected email address", async () => {
    expect(( await updateOfferEmail(mockArg)).email)
      .toBe(mockArg.contact.email);
  });
  it("returns expected templateID if response required", async () => {
    expect(( await updateOfferEmail({...mockArg, accepted: null})).templateID)
      .toBe(responseTemplate);
  });
  it("returns expected templateID if response not required", async () => {
    expect(( await updateOfferEmail({...mockArg, accepted: true})).templateID)
      .toBe(readOnlyTemplate);
      expect(( await updateOfferEmail({...mockArg, accepted: false})).templateID)
      .toBe(responseTemplate);
  });
  it("returns expected email body text if response not required", async () => {
    expect(( await updateOfferEmail({
      ...mockArg,
      accepted: true
    })).bodyText)
      .toBe(
`Dear ${mockArg.contact.firstName}, <br />
  <br />
  <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} has updated your details regarding the below gig. Please respond promptly.
  <br />
  <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName}) ${mockArg.type !== "AVAILABILITY" ? 'offers' : 'checks your availability for'} the following: <br />
  <br />
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />
  You can view up to date gig details at <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">this link</a>. It has been marked as ${mockArg.accepted ? 'accepted' : 'declined'}.<br /> <br />

  If you need further information, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`
      );
  })
  it("returns expected email body text if response required to availability check", async () => {
    expect(( await updateOfferEmail({
      ...mockArg,
      type: "AVAILABILITY",
      accepted: null
    })).bodyText)
      .toBe(
        `Dear ${mockArg.contact.firstName}, <br />
  <br />
  <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} has updated your details regarding the below gig. Please respond promptly.
  <br />
  <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName}) checks your availability for the following: <br />
  <br />
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />
  Click the blue 'Respond' button below or follow <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">this link</a> to respond.<br /> <br />

  If you need further information, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`);
  })
  it("returns expected email body text if response required to offer update", async () => {
    expect(( await updateOfferEmail({
      ...mockArg,
      type: "BOOKING",
      accepted: null
    })).bodyText)
      .toBe(
        `Dear ${mockArg.contact.firstName}, <br />
  <br />
  <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} has updated your details regarding the below gig. Please respond promptly.
  <br />
  <br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName}) offers the following: <br />
  <br />
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />
  Click the blue 'Respond' button below or follow <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">this link</a> to respond.<br /> <br />

  If you need further information, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`);
  })
  it("calls createSentEmail with expected args", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    const updateOfferEmailFunc = await updateOfferEmail(mockArg);
    expect(createSentEmail).toHaveBeenCalledWith({
      ...updateOfferEmailFunc,
      eventId: mockArg.eventSection.eventId
    })
  })
});

describe("gigUpdateEmail", () => {
  const mockArg = {
    dateRange: "23 Dec",
    fixerFullName: "Sherril Butterworth",
    email: ["Ian", "Lisa", "Sean", "Carla", "Julia"],
    message: "Birthday at Midshipman Court!",
    ensemble: "Molloy Family Band",
    eventId: 47,
  }
  it("returns expected subject", async () => {
    expect((await gigUpdateEmail(mockArg)).subject)
      .toBe(`Message from ${mockArg.fixerFullName} ${mockArg.ensemble}`);
  });
  it("returns expected email address", async () => {
    expect((await gigUpdateEmail(mockArg)).email)
      .toBe(mockArg.email);
  });
  it("returns expected templateID", async () => {
    expect((await gigUpdateEmail(mockArg)).templateID)
      .toBe(readOnlyTemplate);
  });
  it("returns expected email body text", async () => {
    expect((await gigUpdateEmail(mockArg)).bodyText)
      .toBe(
        `Dear musician,
  <br />
  <br />
  ${mockArg.fixerFullName} has updated ${mockArg.ensemble} ${mockArg.dateRange}, and sends the following message:
  <br />
  <br />
  ${mockArg.message}
  <br />
  <br />
  End of Message.
  <br />
  <br />
  Please refer to the link sent in your original gig offer for full up-to-date gig details.
  <br />
  Kind regards,
  <br />
  GigFix`)
  })
  it("calls createSentEmail with expected args", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    const gigUpdateFunc = await gigUpdateEmail(mockArg);
    expect(createSentEmail).toHaveBeenCalledWith({
      ...gigUpdateFunc,
      eventId: mockArg.eventId
    })
  })
});

describe("messageToAllEmail", () => {
  const mockArg = {
    dateRange: "31 Dec 1999",
    fixerFullName: "Gerry Kelly",
    email: ["eoghan", "steve"],
    message: "The Millenium Gig is going ahead as planned.",
    ensemble: "Cork Pops Orchestra",
    eventId: 1999
  }
  it("returns expected subject", async () => {
    expect((await messageToAllEmail(mockArg)).subject)
      .toBe(`Message from ${mockArg.fixerFullName} ${mockArg.ensemble}`);
  });
  it("returns expected email address", async () => {
    expect((await messageToAllEmail(mockArg)).email)
      .toBe(mockArg.email);
  });
  it("returns expected templateID", async () => {
    expect((await messageToAllEmail(mockArg)).templateID)
      .toBe(readOnlyTemplate);
  });
  it("returns expected email body text", async () => {
    expect((await messageToAllEmail(mockArg)).bodyText)
      .toBe(
        `Dear musician,
  <br />
  <br />
  ${mockArg.fixerFullName} sends the following message regrading ${mockArg.ensemble} ${mockArg.dateRange}:
  <br />
  <br />
  ${mockArg.message}
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      );
  })
  it("calls createSentEmail with expected args", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    const messageToAllFunc = await messageToAllEmail(mockArg);
    expect(createSentEmail).toHaveBeenCalledWith({
      ...messageToAllFunc,
      eventId: mockArg.eventId
    })
  })
});

describe("releaseDepperEmail", () => {
  const mockArg = {
    dateRange: "26 Jan 1788",
    firstName: "Arthur",
    email: "arthur@firstfleet.com.au",
    ensemble: "New South Wales Philharmonic",
    eventId: 1788
  }
  it("returns expected subject", async () => {
        prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await releaseDepperEmail(mockArg)).subject)
      .toBe(`Update: ${mockArg.dateRange} ${mockArg.ensemble}`);
  });
  it("returns expected email address", async () => {
        prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await releaseDepperEmail(mockArg)).email)
      .toBe(mockArg.email);
  });
  it("returns expected templateID", async () => {
        prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    expect((await releaseDepperEmail(mockArg)).templateID)
      .toBe(readOnlyTemplate);
  });
  it("returns expected email body text", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);

    expect((await releaseDepperEmail(mockArg)).bodyText)
      .toBe(
        `Dear ${mockArg.firstName},
  <br />
  <br />
  We are pleased to inform you that you have been released from ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      )
  })
  it("calls createSentEmail with expected args", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    const releaseDepFunc = await releaseDepperEmail(mockArg);
    expect(createSentEmail).toHaveBeenCalledWith({
      ...releaseDepFunc,
      eventId: mockArg.eventId
    })
  })
});

describe("responseConfEmail", () => {
  const mockArg: ResponseConfEmailProps = {
    token: "luckyToken",
    dateRange: "24 July",
    firstName: "Greg",
    email: "greg@ievers.com.au",
    ensemble: "WA Police String Orchestra",
    accepted: false,
    type: "BOOKING",
    status: "AWAITINGREPLY"
  }
  it("returns expected subject", async () => {
    expect((await responseConfEmail(mockArg)).subject)
      .toBe(`Response Confirmation: ${mockArg.dateRange} ${mockArg.ensemble}`);
  });
  it("returns expected email address", async () => {
    expect((await responseConfEmail(mockArg)).email)
      .toBe(mockArg.email);
  });
  it("returns expected templateID", async () => {
    expect((await responseConfEmail(mockArg)).templateID)
      .toBe(readOnlyTemplate);
  });
  it("returns expected email body text to accepted availability check", async () => {
    expect((await responseConfEmail({
      ...mockArg, 
      status: "AVAILABLE",})
    ).bodyText)
      .toBe(
        `Dear ${mockArg.firstName},
  <br />
  <br />
  This email confirms you indicated your availability for ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  Please refer to your <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">response page</a> for up to date information and confirmation of your response.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      );
  })
  it("returns expected email body text to mixed availability check", async () => {
    expect((await responseConfEmail({
      ...mockArg, 
      status: "MIXED",})
    ).bodyText)
      .toBe(
        `Dear ${mockArg.firstName},
  <br />
  <br />
  This email confirms you indicated your availability for ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  Please refer to your <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">response page</a> for up to date information and confirmation of your response.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      );
  })
  it("returns expected email body text to declined availability check", async () => {
    expect((await responseConfEmail(mockArg)).bodyText)
      .toBe(
        `Dear ${mockArg.firstName},
  <br />
  <br />
  This email confirms you declined ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  Please refer to your <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">response page</a> for up to date information and confirmation of your response.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      );
  })
  it("returns expected email body text with accepted offer", async () => {
    expect((await responseConfEmail({
      ...mockArg,
      accepted: true,
      status: "ACCEPTED",
      type: "BOOKING",
    })).bodyText)
      .toBe(
        `Dear ${mockArg.firstName},
  <br />
  <br />
  This email confirms you accepted ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  Please refer to your <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">response page</a> for up to date information and confirmation of your response.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      );
      expect((await responseConfEmail({
      ...mockArg,
      accepted: true,
      status: "ACCEPTED",
      type: "BOOKING",
    })).bodyText)
      .toBe(
        `Dear ${mockArg.firstName},
  <br />
  <br />
  This email confirms you accepted ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  Please refer to your <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">response page</a> for up to date information and confirmation of your response.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      );
  })
  it("returns expected email body text to declined offer", async () => {
    expect((await responseConfEmail(mockArg)).bodyText)
      .toBe(
        `Dear ${mockArg.firstName},
  <br />
  <br />
  This email confirms you declined ${mockArg.dateRange} (${mockArg.ensemble}).
  <br />
  Please refer to your <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">response page</a> for up to date information and confirmation of your response.
  <br />
  <br />
  Kind regards,
  <br />
  GigFix`
      );
  })
});

describe("eventReminderMusician", () => {
  const mockArg = {
    ...mockContactMessage,
    contact: mockEnsembleContact,
    calls: [mockCall],
    eventSection: {
      ...mockEventSection,
      event: {
        ...mockEvent,
        fixer: mockUser
      }
    }
  }
  it("returns expected subject", () => {
    expect(eventReminderMusician(mockArg).subject)
      .toBe(`Starting tomorrow: ${mockArg.eventSection.event.ensembleName} ${getDateRange(mockArg.calls)}`);
  });
  it("returns expected email address", () => {
    expect(eventReminderMusician(mockArg).email)
      .toBe(mockArg.contact.email);
  });
  it("returns expected templateID", () => {
    expect(eventReminderMusician(mockArg).templateID)
      .toBe(readOnlyTemplate);
  });
  it("returns expected email body text", () => {
    expect(eventReminderMusician(mockArg).bodyText)
      .toBe(
        `Dear ${mockArg.contact.firstName},
  <br /><br />
  This is a reminder that ${mockArg.eventSection.event.ensembleName} ${getDateRange(mockArg.calls)} starts tomorrow. Below are the details.
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />

If there are any issues, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`
      )
    })
});

describe("remindUnresponsiveMusicianEmail", () => {
  const mockArg = {
    ...mockContactMessage,
    calls: [mockCall],
    contact: mockEnsembleContact,
    eventSection: {
      ...mockEventSection,
      event: {
        ...mockEvent,
        calls: [{...mockCall, id: 1}, {...mockCall, id: 2}],
        fixer: mockUser
      }
    }
  }
  it("returns expected subject", () => {
    expect(remindUnresponsiveMusicianEmail(mockArg).subject)
      .toBe(`Action Required: ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName})`);
  });
  it("returns expected email address", () => {
    expect(remindUnresponsiveMusicianEmail(mockArg).email)
      .toBe(mockArg.contact.email);
  });
  it("returns expected templateID", () => {
    expect(remindUnresponsiveMusicianEmail(mockArg).templateID)
      .toBe(responseTemplate);
  });
  it("returns expected email body text", () => {
    expect(remindUnresponsiveMusicianEmail(mockArg).bodyText)
      .toBe(
        `Dear ${mockArg.contact.firstName}, <br />
  <br />
  We are yet to receive a response from you regarding the gig below. If we have not received a response with 48 hours, we will alert the fixer.
  <br /><br />
  ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} (${mockArg.eventSection.event.ensembleName}) ${mockArg.type === "BOOKING" ? 'offers' : mockArg.type === "AUTOBOOK" ? 'has auto-booked you for'  : 'checks your availability for'} the following: <br />
  <br />
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
  Gig Status: ${mockArg.eventSection.event.confirmedOrOnHold}<br />
  Position: ${mockArg.position}<br />
  Fee: ${mockArg.eventSection.event.fee ? mockArg.eventSection.event.fee : 'Not specified'}<br />
  Dress: ${mockArg.eventSection.event.dressCode ? mockArg.eventSection.event.dressCode : 'Not specified'}<br />
  Additional Information: ${mockArg.eventSection.event.additionalInfo ? mockArg.eventSection.event.additionalInfo : 'Not specified'}<br />
  ${mockArg.playerMessage !== null ? mockArg.eventSection.event.fixer.firstName + ' sends the following message to you: <br />' + mockArg.playerMessage : ''}
<br />
<br />
  Click the blue 'Respond' button below or follow <a href="${`${process.env.URL}/fixing/response/${mockArg.token}/`}">this link</a> to respond. <br /> <br />

  If you need further information, contact ${mockArg.eventSection.event.fixer.firstName} ${mockArg.eventSection.event.fixer.lastName} at ${mockArg.eventSection.event.fixer.email} or ${mockArg.eventSection.event.fixer.mobileNumber}. <br /> <br />

Best wishes,<br />
GigFix`
      );
  });
});
