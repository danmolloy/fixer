import {
  eventReminderMusician,
  remindUnresponsiveMusicianEmail,
} from '../playerLib';
import axios from 'axios';
import prisma from '../../../client';
import { DateTime } from 'luxon';
import {
  eventReminderFixer,
  reportUnresponsiveMusicianEmail,
} from '../adminEmailLib';

const url = process.env.URL;

export const getUpcomingEvents = async () => {

  const upcomingCalls = await prisma.call.findMany({
    where: {
      startTime: {
        gte: DateTime.now().endOf('day').toJSDate(),
        lt: DateTime.now().plus({ days: 2 }).startOf('day').toJSDate(),
      },
    },
    include: {
      event: {
        include: {
          fixer: true,
          calls: true,
        },
      },
    },
  });
  return upcomingCalls.map((i) => i.event);
};

export const getUpcomingMusicians = async () => {
  const upcomingCalls = await prisma.call.findMany({
    where: {
      startTime: {
        gte: DateTime.now().endOf('day').toJSDate(),
        lt: DateTime.now().plus({ days: 2 }).startOf('day').toJSDate(),
      },
    },
    include: {
      contactEventCalls: {
        include: {
          contactMessage: {
            include: {
              eventCalls: {
                include: {
                  call: true,
                },
              },
              contact: true,
              eventSection: {
                include: {
                  event: {
                    include: {
                      fixer: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return upcomingCalls
    .map((i) => i.contactEventCalls.map((c) => c.contactMessage))
    .flat();
};

export const remindMusicians = async () => {
  const data = await getUpcomingMusicians();
  for (let i = 0; i < data.length; i++) {
    const emailAlert = eventReminderMusician({
      ...data[i],
      calls: data[i].eventCalls.map((c) => c.call),
    });
    try {

      await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: emailAlert,
          templateID: emailAlert.templateID,
          emailAddress: emailAlert.email,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  return;
};

export const remindFixers = async () => {
  const data = await getUpcomingEvents();
  for (let i = 0; i < data.length; i++) {
    const emailAlert = eventReminderFixer(data[i]);
    try {
      await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: emailAlert,
          templateID: emailAlert.templateID,
          emailAddress: emailAlert.email,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  return;
};

export const getUnresponsiveMusicians = async (receivedLTE: Date) => {
  const musicians = await prisma.contactMessage.findMany({
    where: {
      status: 'AWAITINGREPLY',
      receivedDate: {
        lte: receivedLTE,
      },
    },
    include: {
      eventCalls: {
        include: {
          call: true,
        },
      },
      contact: true,
      eventSection: {
        include: {
          event: {
            include: {
              calls: true,
              fixer: true,
            },
          },
        },
      },
    },
  });

  return musicians;
};

export const reportUnresponsiveMusicians = async () => {
  const data = await getUnresponsiveMusicians(
    DateTime.now().endOf('day').minus({ days: 7 }).toJSDate()
  );
  for (let i = 0; i < data.length; i++) {
    const emailAlert = reportUnresponsiveMusicianEmail(data[i]);
    try {
      await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: emailAlert,
          templateID: emailAlert.templateID,
          emailAddress: emailAlert.email,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  return;
};

export const remindUnresponsiveMusicians = async () => {
  const data = await getUnresponsiveMusicians(
    DateTime.now().endOf('day').minus({ days: 5 }).toJSDate()
  );
  for (let i = 0; i < data.length; i++) {
    const emailAlert = remindUnresponsiveMusicianEmail({
      ...data[i],
      calls: data[i].eventCalls.map((c) => c.call),
    });
    try {
      await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: emailAlert,
          templateID: emailAlert.templateID,
          emailAddress: emailAlert.email,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  return;
};
