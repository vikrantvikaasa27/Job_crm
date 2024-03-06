import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();

    if (!session) {
      throw new Error('Unauthorization');
    }

    const companyId = session.user.id;
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
      },
    });

    if (!company?.isCompleted) {
      throw new Error(
        'Please complete the company profile first before posting a job'
      );
    }

    const companyJob = await prisma.job.create({
      data: {
        companyId,
        ...data,
      },
    });

    return NextResponse.json({
      status: 'success',
      message: 'Successfully post a job',
      data: companyJob,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 'error',
        message: error.message,
        data: null,
      });
    }
  }
}
