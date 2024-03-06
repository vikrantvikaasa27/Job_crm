import { DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: string;
    accountId: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
      accountId: string;
    } & DefaultUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    accountId: string;
  }
}
