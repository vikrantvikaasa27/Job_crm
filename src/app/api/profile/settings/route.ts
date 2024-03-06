import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();

    if (!session) {
      throw new Error('Unathorization');
    }

    const { accountId } = session.user;

    // find account by id
    const account = await prisma.account.findFirst({
      where: {
        id: accountId,
      },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    /// if user changes the email
    if (account.email !== data.email) {
      /// if the email has been used
      const isEmailExist = await prisma.account.findUnique({
        where: {
          email: data.email,
        },
      });

      if (isEmailExist) {
        throw new Error('Email already exist!');
      }
    }

    /// if user changes the password
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 8);

      await prisma.account.update({
        where: {
          id: accountId,
        },
        data: {
          username: data.username,
          email: data.email,
          password: hashedPassword,
        },
      });
    } else {
      /// if user don't changes the password
      await prisma.account.update({
        where: {
          id: accountId,
        },
        data: {
          username: data.username,
          email: data.email,
        },
      });
    }

    return NextResponse.json({
      status: 'Success',
      message: 'Success update profile account',
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
