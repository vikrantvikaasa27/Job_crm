import { Logo } from '@/components/atoms';
import { Metadata } from 'next';

import FormSignup from './_signupPartials/FormSignup';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUp = () => {
  return (
    <main className="max-w-96 w-full mx-auto my-5 md:my-10">
      <Logo variant="dark" width={175} heigth={39} className="block mx-auto" />
      <div className="mt-5">
        <FormSignup />
      </div>
    </main>
  );
};

export default SignUp;
