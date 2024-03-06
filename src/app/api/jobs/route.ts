import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const role = searchParams.get('role') ?? '';
    const location = searchParams.get('location') ?? '';
    const category = searchParams.get('category')
      ? searchParams.get('category')?.split(',')
      : undefined;

    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        category: true,
      },
      orderBy: {
        datePosted: 'desc',
      },
      where: {
        dueDate: {
          gt: new Date(),
        },
        role: {
          mode: 'insensitive',
          contains: role,
        },
        company: {
          location: {
            mode: 'insensitive',
            contains: location,
          },
        },
        category: {
          name: {
            mode: 'insensitive',
            in: category,
          },
        },
      },
    });

    if (!jobs.length) {
      return NextResponse.json({
        status: 'success',
        message: 'No data jobs',
        data: [],
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Success get list of jobs',
      data: jobs,
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
