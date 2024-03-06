import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();

    if (!session) {
      throw new Error('Unauthorization');
    }

    const companyId = session.user.id;
    const companyExist = await prisma.company.findFirst({
      where: {
        id: companyId,
      },
    });

    if (!companyExist) {
      throw new Error('Company not found');
    }

    await prisma.company.update({
      where: {
        id: companyId,
      },
      data: data,
    });

    return NextResponse.json({
      status: 'success',
      message: 'Success update profile company',
      data: null,
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
