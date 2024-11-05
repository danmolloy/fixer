import prisma from '../../../../../client';
import { emailBookingMusicians, emailDeppingMusician } from '../create/functions';

export const updateContactMessage = async (contactMessageObj: {
  id: number;
  data: any;
}) => {
  try {
    const updatedData = await prisma.contactMessage.update({
      where: {
        id: contactMessageObj.id,
      },
      data: contactMessageObj.data,
    });
    console.log(`contactMessageObj.data.accepted: ${contactMessageObj.data.accepted}`)

    if (updatedData.bookingOrAvailability.toLocaleLowerCase() === "booking" 
    && contactMessageObj.data.accepted === true ) {
      
      await releaseDeppers(updatedData.eventSectionId);
    }
    await emailBookingMusicians(updatedData.eventSectionId);
    return updatedData
  } catch (e) {
    throw new Error(e);
  }
};

export const releaseDeppers = async (eventSectionId: number) => {
  console.log("Releasing Deppers!")
  const deppingContacts = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      status: "DEP OUT"
    },
    orderBy: [
      {
        indexNumber: "asc",
      }
    ]
  });
  if (deppingContacts.length > 0) {
    try {
      const releaseMusician =  await prisma.contactMessage.update({
        where: {
          id: deppingContacts[0].id
        },
        data: {
          status: "RELEASED",
          accepted: false
        },
        include: {
          contact: true
        }
      })
      return await emailDeppingMusician(releaseMusician);

    } catch(e) {
      throw new Error(e);
    }
  }

}


export const updateContactIndex = async (data: {
  eventSectionId: number;
  movingUp: boolean;
  contactMessageId: number;
}) => {
  const currentContacts = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: data.eventSectionId,
    },
    orderBy: {
      indexNumber: 'asc',
    },
  });
  const contactToReplaceIndexNum = data.movingUp
    ? currentContacts.map((i) => i.id).indexOf(data.contactMessageId - 1)
    : currentContacts.map((i) => i.id).indexOf(data.contactMessageId - 1);
  await prisma.contactMessage.update({
    where: {
      id: data.contactMessageId,
    },
    data: {
      indexNumber: currentContacts[contactToReplaceIndexNum].indexNumber,
    },
  });
  await prisma.contactMessage.update({
    where: {
      id: currentContacts[contactToReplaceIndexNum].id,
    },
    data: {
      indexNumber: data.movingUp
        ? currentContacts[contactToReplaceIndexNum + 1].indexNumber
        : currentContacts[contactToReplaceIndexNum - 1].indexNumber,
    },
  });
};
