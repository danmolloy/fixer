import axios from 'axios';
import prisma from '../../../../../../client';
import { createEmailData } from '../../create/functions';

const url = `${process.env.URL}`


export const updateContactEventCalls = async (data: {
  calls: {
    connect: { id: number }[];
    disconnect: { id: number }[];
  };
  contactMessageId: number;
}) => {
  try {
    const contactMsg = await prisma.contactMessage.update({
      where: {
        id: data.contactMessageId,
      },
      data: {
        calls: data.calls,
      },
      include: {
        contact: true,
        calls: true,
        eventSection: {
          include: {
            event: true,
            ensembleSection: true
          }
        }
      }
    });


    //const emailData = createEmailData(contactMsg)
    
    //await axios.post(`${url}/response/api`, {body: emailData});

  } catch(e) {
    throw Error(e)
  }
};
