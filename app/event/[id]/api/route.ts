import { NextResponse } from 'next/server';
import prisma from '../../../../client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  

  try {
    const data = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          fixer: true,
          calls: true,
          sections: {
            include: {
              orchestration: true,
              contacts: {
                include: {
                  eventCalls: {
                    include: {
                      call: true,
                    },
                  },
                  emailEvents: true,
                  contact: true,
                  //calls: true,
                },
                orderBy: {
                  indexNumber: 'asc',
                },
              },
              ensembleSection: {
                include: {
                  contacts: true,
                },
              },
            },
          },
          ensemble: {
            include: {
              sections: true,
              admin: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    return NextResponse.json({ ...data, success: true, refreshed: new Date() }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
