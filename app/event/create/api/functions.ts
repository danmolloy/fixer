import prisma from '../../../../client';

export const sectionsArr = [
  'Flute',
  'Oboe',
  'Clarinet',
  'Bassoon',
  'Horn',
  'Trumpet',
  'Trombone',
  'Tuba',
  'Timpani',
  'Percussion',
  'Harp',
  'Violin 1',
  'Violin 2',
  'Viola',
  'Cello',
  'Double Bass',
];

export const formattedCalls = (calls, fixerId) => {
  return [...calls].map((i) => ({
    startTime: new Date(i.startTime),
    endTime: new Date(i.endTime),
    venue: i.venue,
    fixer: { connect: { id: fixerId } },
  }));
};

export const eventObj = (obj) => {
  return {
    ensembleId: obj.ensembleId,
    ensembleName: obj.ensembleName,
    eventTitle: obj.eventTitle,
    concertProgram: obj.concertProgram,
    confirmedOrOnHold: obj.confirmedOrOnHold,
    formattedCalls: formattedCalls(obj.calls, obj.fixerId),
    dressCode: obj.dressCode,
    fee: obj.fee,
    additionalInfo: obj.additionalInfo,
    fixerName: obj.fixerName,
    fixerId: obj.fixerId,
  };
};

export const createEvent = async (eventObj) => {
  return await prisma.event.create({
    data: {
      ensemble: {
        connect: {
          id: eventObj.ensembleId,
        },
      },
      eventTitle: eventObj.eventTitle,
      ensembleName: eventObj.ensembleName,
      concertProgram: eventObj.concertProgram,
      confirmedOrOnHold: eventObj.confirmedOrOnHold,
      calls: {
        create: eventObj.formattedCalls,
      },
      dressCode: eventObj.dressCode,
      fee: eventObj.fee,
      additionalInfo: eventObj.additionalInfo,
      fixer: { connect: { id: eventObj.fixerId } },
      fixerName: eventObj.fixerName,
    },
  });
};
