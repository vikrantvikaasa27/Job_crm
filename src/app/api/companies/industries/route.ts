import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const industries = await prisma.industry.findMany();

    return NextResponse.json({
      status: 'success',
      message: 'Success get list of industries',
      data: industries,
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
