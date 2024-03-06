import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();
    let jobseekerId, companyId;

    if (!session) {
      throw new Error('Unauthorization');
    }

    if (session.user.role === 'JOBSEEKER') {
      jobseekerId = session.user.id;
    } else if (session.user.role === 'COMPANY') {
      companyId = session.user.id;
    }

    const newLink = await prisma.socialMedia.create({
      data: {
        ...data,
        jobseekerId,
        companyId,
      },
    });

    return NextResponse.json({
      status: 'success',
      message: 'Success create new link',
      data: newLink,
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
