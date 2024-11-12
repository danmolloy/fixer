import { Call, ContactMessage, EnsembleContact, Event, EventSection, User } from "@prisma/client";
import { eventReminderFixer, eventReminderMusician, remindUnresponsiveMusicianEmail, reportUnresponsiveMusicianEmail } from "../lib";
import axios from "axios";
import prisma from "../../../client";
import { DateTime } from "luxon";

const url = process.env.URL;


export const getUpcomingEvents = async () => {
  console.log("Hello from getUpcomingEvents")

  const upcomingCalls = await prisma.call.findMany({
    where: {
      startTime: {
        gte: DateTime.now().endOf('day').toJSDate(),
        lt: DateTime.now().plus({days: 2}).startOf('day').toJSDate(),
      }
    },
    include: {
      event: {
        include: {
          fixer: true,
          calls: true
        }
      }
    }
  })
  return upcomingCalls.map(i => i.event);
}

export const getUpcomingMusicians = async () => {
  const upcomingCalls = await prisma.call.findMany({
    where: {
      startTime: {
        gte: DateTime.now().endOf('day').toJSDate(),
        lt: DateTime.now().plus({days: 2}).startOf('day').toJSDate(),
      }
    },
    include: {
      contactMessages: {
        include: {
          calls: true,
          contact: true,
          eventSection: {
            include: {
              event: {
                include: {
                  fixer: true
                }
              }
            }
          }
        }
      }
    }
  })
  return upcomingCalls.map(i => i.contactMessages).flat();
}

export const remindMusicians = async () => {
  const data = (await getUpcomingMusicians());
  for (let i = 0; i < data.length; i ++) {
    const emailAlert = eventReminderMusician(data[i])
    try {
      console.log(emailAlert);

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
}


export const remindFixers = async () => {
      const data = await getUpcomingEvents();
  for (let i = 0; i < data.length; i ++) {
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
}

export const getUnresponsiveMusicians = async (recievedLTE: Date) => {
  const musicians = await prisma.contactMessage.findMany({
    where: {
      accepted: null,
      recieved: true,
      recievedDate: {
        lte: recievedLTE
      }
    },
    include: {
      calls: true,
      contact: true,
      eventSection: {
        include: {
          event: {
            include: {
              calls: true,
              fixer: true
            }
          }
        }
      }
    }
  })

  return musicians;
}

export const reportUnresponsiveMusicians = async () => {
  const data = await getUnresponsiveMusicians(DateTime.now().endOf('day').minus({days: 7}).toJSDate());
  for (let i = 0; i < data.length; i ++) {
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
}


export const remindUnresponsiveMusicians = async () => {
  const data = await getUnresponsiveMusicians(DateTime.now().endOf('day').minus({days: 5}).toJSDate());
  for (let i = 0; i < data.length; i ++) {
    const emailAlert = remindUnresponsiveMusicianEmail(data[i]);
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
}