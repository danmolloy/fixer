import axios from "../../../../../../__mocks__/axios"
import { mockContactMessage } from "../../../../../../__mocks__/models/contactMessage"
import { mockEnsembleContact } from "../../../../../../__mocks__/models/ensembleContact"
import { mockEvent } from "../../../../../../__mocks__/models/event"
import { mockEventSection } from "../../../../../../__mocks__/models/eventSection"
import { mockUser } from "../../../../../../__mocks__/models/user"
import { prismaMock } from "../../../../../../__mocks__/singleton"
import { emailAvailabilityChecks, emailBookingMusicians } from "../../../../../../app/fixing/contactMessage/api/create/emailFunctions"
import { bookingCompleteEmail,createOfferEmail, listExhaustedEmail, releaseDepperEmail, SentEmailData } from "../../../../../../app/sendGrid/lib"
import { getDateRange, getNumToContact, gigIsFixed } from "../../../../../../app/fixing/contactMessage/api/create/functions"
import { mockCall } from "../../../../../../__mocks__/models/call"
import { mockSection } from "../../../../../../__mocks__/models/ensembleSection"

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockEmail: SentEmailData = {
  templateID: "fake-template",
  email: mockEnsembleContact.email!,
  bodyText: "Email body",
  subject: "mock subject"
}

jest.mock("../../../../../../app/sendGrid/lib", () => ({
  bookingCompleteEmail: jest.fn(() => ({...mockEmail})), 
  createOfferEmail: jest.fn(() => ({...mockEmail})), 
  listExhaustedEmail: jest.fn(() => ({...mockEmail})), 
  releaseDepperEmail: jest.fn(),
}))

jest.mock('../../../../../../app/fixing/contactMessage/api/create/functions', () => ({
  gigIsFixed: jest.fn().mockReturnValue(false),
  getDateRange: jest.fn().mockReturnValue("date range"),
  getNumToContact: jest.fn().mockReturnValue(1)
}))

describe("emailBookingMusicians", () => {
  it("calls prisma.contactMessage.findMany() with expected args", async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([]);
    await emailBookingMusicians(42);
    const prismaArgs = {
      where: {
        eventSectionId: 42,
        bookingOrAvailability: 'Booking',
      },
      include: {
        eventSection: {
          include: {
            event: {
              include: {
                fixer: true,
                calls: true,
              },
            },
            ensembleSection: true,
          },
        },
        contact: true,
        calls: true,
      },
      orderBy: [
        {
          indexNumber: 'asc',
        },
      ],
    }
    
    expect(prismaMock.contactMessage.findMany).toHaveBeenCalledWith(prismaArgs);
  })
  it("calls gigIsFixed with expected arg", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: true,
      eventSection: {
        ...mockEventSection,
        numToBook: 1,
        ensembleSection: mockSection,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    await emailBookingMusicians(42);
    expect(gigIsFixed).toHaveBeenCalled();
  })
 /*  it("if gigIsFixed, bookingCompleteEmail and sendGrid are called with expected args", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: true,
      eventSection: {
        ...mockEventSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    await emailBookingMusicians(42);
    expect(bookingCompleteEmail).toHaveBeenCalledWith({
      dateRange: getDateRange(mockReturn[0].eventSection.event.calls),
        fixerFirstName: mockReturn[0].eventSection.event.fixer.firstName,
        email: mockReturn[0].eventSection.event.fixer.email!,
        ensemble: mockReturn[0].eventSection.event.ensembleName,
    })
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/sendGrid",
      {
        body: {
          emailAddress: mockEmail.email,
          emailData: mockEmail, 
          templateID: mockEmail.templateID,
        }
      }
    );
  }) */
  /* it("if !fixed, getNumToContact is calld with expected args", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: false,
      eventSection: {
        ...mockEventSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    await emailBookingMusicians(42);
    expect(getNumToContact).toHaveBeenCalled();
  }) */
  /* it("if numToContact === 0, return []", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: true,
      eventSection: {
        ...mockEventSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    expect(await emailBookingMusicians(42)).toEqual([]);
  }) */
 /*  it("if numToContact > notContacted.length, listExhaustedEmail & axios.post are called with expected args", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: false,
      eventSection: {
        ...mockEventSection,
        ensembleSection: mockSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    await emailBookingMusicians(42);
    expect(listExhaustedEmail).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/sendGrid",
      {body: {
        emailData: mockEmail,
        templateID: mockEmail.templateID,
        emailAddress: mockEmail.email
      }}
    );
  }) */
  it("calls createOfferEmail & axios.post with expected arg", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: null,
      received: false,
      eventSection: {
        ...mockEventSection,
        ensembleSection: mockSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    await emailBookingMusicians(42);
    expect(createOfferEmail).toHaveBeenCalledWith(mockReturn[0]);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/sendGrid",
      {body: {
        emailData: mockEmail,
        templateID: mockEmail.templateID,
        emailAddress: mockEmail.email
      }}
    );
  });
  it("updates contact message status to received", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: null,
      received: false,
      eventSection: {
        ...mockEventSection,
        ensembleSection: mockSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    await emailBookingMusicians(42);
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: mockReturn[0].id
      },
      data: {
        received: true,
      }
    })
  })
  it("if urgent, calls axios.post with expected args", async () => {
    const mockReturn = [{
      ...mockContactMessage,
      contact: mockUser,
      accepted: null,
      received: false,
      eventSection: {
        ...mockEventSection,
        ensembleSection: mockSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        }
      }
    }]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockReturn);
    await emailBookingMusicians(42);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/twilio', 
      {
        body: {
          phoneNumber: mockReturn[0].contact.mobileNumber,
          message: `Hi ${mockReturn[0].contact.firstName}, we have just sent you an urgent email on behalf of ${mockReturn[0].eventSection.event.fixer.firstName} ${mockReturn[0].eventSection.event.fixer.lastName} (${mockReturn[0].eventSection.event.ensembleName}). GigFix`,
        }
      });
  })
})

describe("emailAvailabilityChecks", () => {
  it("calls prisma.contactMessage.findMany with expected args", async () => {
    prismaMock.contactMessage.findMany.mockResolvedValue([]);
    await emailAvailabilityChecks(1);
    expect(await prismaMock.contactMessage.findMany).toHaveBeenCalledWith({
      where: {
        eventSectionId: 1,
        bookingOrAvailability: 'Availability',
        received: false,
      },
      include: {
        eventSection: {
          include: {
            event: {
              include: {
                fixer: true,
              },
            },
            ensembleSection: true,
          },
        },
        contact: true,
        calls: true,
      },
      orderBy: [
        {
          indexNumber: 'asc',
        },
      ],
    });

  })
  it("returns [] if there are no unsent availability checks", async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([]);
    expect(await emailAvailabilityChecks(1)).toEqual([]);
  })
  it("for each unsent availability check, createOfferEmail(args) is called", async () => {
    const mockData = [
      {...mockContactMessage,
        id: 1,
      contact: mockEnsembleContact},
      {...mockContactMessage,
        id: 2,
        contact: mockEnsembleContact},
        {...mockContactMessage,
          id: 3,
          contact: mockEnsembleContact},
    ]
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValue(mockContactMessage);
    await emailAvailabilityChecks(1)
    expect(createOfferEmail).toHaveBeenCalledTimes(3);
    expect(createOfferEmail).toHaveBeenCalledWith(mockData[0]);
    expect(createOfferEmail).toHaveBeenCalledWith(mockData[1]);
    expect(createOfferEmail).toHaveBeenCalledWith(mockData[2]);
  })
  it("for each unsent availability check, axios.post(args) is called", async () => {
    const mockData = [
      {...mockContactMessage,
        id: 1,
      contact: mockEnsembleContact},
    ];
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValue(mockContactMessage);
    await emailAvailabilityChecks(1);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/sendGrid', 
      {
        body: {
          emailData: mockEmail,
          templateID: mockEmail.templateID,
          emailAddress: mockEmail.email
        }
      });
  })
  it("calls prisma.contactMessage.update with expected args", async () => {
    const mockData = [
      {...mockContactMessage,
        id: 1,
      contact: mockEnsembleContact},
    ];
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValue(mockContactMessage);
    await emailAvailabilityChecks(1);
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: mockData[0].id,
      },
      data: {
        received: true,
      },
    })

  })
  it("calls axios.post(twilio) for all urgent availability checks", async () => {
    const mockData = [
      {...mockContactMessage,
        urgent: true,
        id: 1,
        eventSection: {
          ...mockEventSection,
          event: {
            ...mockEvent,
            fixer: mockUser
          }
        },
      contact: mockEnsembleContact},
    ];
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValue(mockContactMessage);
    await emailAvailabilityChecks(1);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/twilio', 
      {
        body: {
          phoneNumber: mockData[0].contact.phoneNumber,
          message: `Hi ${mockData[0].contact.firstName}, we have just sent you an urgent email on behalf of ${mockData[0].eventSection.event.fixer.firstName} ${mockData[0].eventSection.event.fixer.lastName} (${mockData[0].eventSection.event.ensembleName}). GigFix`,
        }
      });
    
  })
})
