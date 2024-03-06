import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name') ?? '';
    const location = searchParams.get('location') ?? '';
    const industry = searchParams.get('industry')
      ? searchParams.get('industry')?.split(',')
      : undefined;

    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
      where: {
        isCompleted: {
          equals: true,
        },
        name: {
          mode: 'insensitive',
          contains: name,
        },
        location: {
          mode: 'insensitive',
          contains: location,
        },
        industry: {
          mode: 'insensitive',
          in: industry,
        },
      },
    });

    if (!companies.length) {
      return NextResponse.json({
        status: 'success',
        message: 'No data companies',
        data: [],
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Success get list of companies',
      data: companies,
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
