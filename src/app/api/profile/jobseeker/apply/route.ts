import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { resume, coverLetter, jobId } = await request.json();

    if (!session) {
      throw new Error('Unauthorization');
    }

    const jobseekerId = session.user.id;

    const isApply = await prisma.applicant.count({
      where: {
        jobseekerId,
        AND: {
          jobId,
        },
      },
    });

    if (isApply) {
      throw new Error('You have applied for this job');
    }

    const res = await prisma.applicant.create({
      data: {
        resume,
        coverLetter,
        jobseekerId,
        jobId,
      },
    });

    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        totalApplicants: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      status: 'success',
      message: 'Successfully submitted application',
      data: res,
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
