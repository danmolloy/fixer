import axios from 'axios';
import prisma from '../../../../../client';
import { adminInviteEmail } from '../../../../sendGrid/lib';

const url = `${process.env.URL}`


export const createAdminInvite = async (data: {
  firstName: string;
  lastName: string;
  senderName: string;
  email: string;
  ensembleId: string;
  positionTitle: string;
  accessType: string;
}) => {
  if (!data) {
    throw new Error('Failed to create invite: invite data is undefined.');
  }
  try {
    const adminInvite = await prisma.adminInvite.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        senderName: data.senderName,
        email: data.email,
        positionTitle: data.positionTitle,
        accessType: data.accessType,
        ensemble: {
          connect: {
            id: data.ensembleId,
          },
        },
      },
      include: {
        ensemble: true
      }
    });

    const emailData = adminInviteEmail({
      firstName: data.firstName,
      senderName: data.senderName,
      email: data.email,
      inviteID: adminInvite.id,
      ensembleName: adminInvite.ensemble.name
    });

    return await axios.post(`${url}/sendGrid`, {body: {
      emailData: emailData,
      templateID: emailData.templateID,
      emailAddress: emailData.email
    }});


  } catch (error) {
    console.error('Error creating admin invite:', error);
    throw new Error(`Failed to create invite: ${error.message}`);
  }
};
