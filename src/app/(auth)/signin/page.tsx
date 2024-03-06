import Image from 'next/image';
import { bgAuth } from '@/images';
import { Suspense } from 'react';
import { Metadata } from 'next';

import FormSignin from './_signinPartials/FormSignin';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignIn = () => {
  return (
    <Suspense>
      <main className="w-screen h-screen grid lg:grid-cols-2 overflow-hidden">
        <section className="hidden lg:block">
          <Image
            src={bgAuth}
            alt="Background"
            className="w-full h-full object-cover"
            placeholder="blur"
          />
        </section>
        <section className="w-full h-full flex items-center justify-center">
          <FormSignin />
        </section>
      </main>
    </Suspense>
  );
};

export default SignIn;
