import axios from 'axios';
import prisma from '../../../client';
import {
  Call,
  ContactMessage,
  EnsembleContact,
  Event,
  EventSection,
  User,
} from '@prisma/client';
import { getDateRange } from '../../fixing/contactMessage/api/create/functions';
import { DateTime } from 'luxon';

const url = `${process.env.URL}`;

export const deleteEvent = async (eventId: number) => {
  return await prisma.event.delete({
    where: {
      id: eventId,
    },
    include: {
      fixer: true,
      calls: true,
      sections: {
        include: {
          contacts: {
            where: {
              accepted: !false,
              received: true,
            },
            include: {
              contact: true,
            },
          },
        },
      },
    },
  });
};
