import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let prisma: PrismaClient | undefined;

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({
      log: ['info'],
    });
    console.log('Initializing PrismaClient');
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        log: ['info'],
      });
      console.log('Initializing PrismaClient');
    }

    prisma = global.prisma;
  }
}

export default prisma!;
