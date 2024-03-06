import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const existingAccount = await prisma.account.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingAccount) {
      throw new Error('Email is already use!');
    }

    const hashedPassword = await bcrypt.hash(data.password, 8);

    const newAccount = await prisma.account.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    if (newAccount.role === 'COMPANY') {
      await prisma.company.create({
        data: {
          name: newAccount.username,
          accountId: newAccount.id,
        },
      });
    } else if (newAccount.role === 'JOBSEEKER') {
      await prisma.jobseeker.create({
        data: {
          fullName: newAccount.username,
          accountId: newAccount.id,
        },
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Create account successfully.',
      data: newAccount,
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
