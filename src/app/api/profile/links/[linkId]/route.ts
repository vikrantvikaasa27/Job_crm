import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

type TDeleteParams = {
  params: {
    linkId: string;
  };
};

export async function DELETE(request: Request, { params }: TDeleteParams) {
  try {
    const session = await getServerSession(authOptions);
    const { linkId } = params;

    if (!session) {
      throw new Error('Unauthorization');
    }

    await prisma.socialMedia.delete({
      where: {
        id: linkId,
      },
    });

    return NextResponse.json({
      status: 'success',
      message: 'Success delete link',
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
