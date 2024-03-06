import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;

        const account = await prisma.account.findUnique({
          where: {
            email,
          },
          include: {
            jobseeker: true,
            company: true,
          },
        });

        if (!account) {
          throw new Error('Email not registered!');
        }

        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
          throw new Error('Wrong password!');
        }

        if (account.jobseeker !== null) {
          return {
            id: account.jobseeker.id,
            name: account.username,
            email: account.email,
            image: account.jobseeker.photo,
            role: account.role,
            accountId: account.id,
          };
        } else if (account.company !== null) {
          return {
            id: account.company.id,
            name: account.username,
            email: account.email,
            image: account.company.logo,
            role: account.role,
            accountId: account.id,
          };
        }

        return {
          id: account.id,
          name: account.username,
          email: account.email,
          image: null,
          role: account.role,
          accountId: account.id,
        };
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accountId = user.accountId;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accountId = token.accountId;

      return session;
    },
  },
} satisfies NextAuthOptions;
