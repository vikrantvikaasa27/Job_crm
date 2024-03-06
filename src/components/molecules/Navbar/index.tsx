'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AlignJustify } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { ProfileAccount, Logo } from '@/components/atoms';
import { usePathname, useRouter } from 'next/navigation';

import NavLink from './NavLink';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [toggle, setToggle] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const handleNavigate = (path: string) => {
    router.push(path);
    setToggle(false);
  };

  const handleSignin = () => {
    router.push('/signin?callbackUrl=' + pathname);
  };

  const handleSignout = () => {
    signOut({ redirect: false });
    setToggle(false);
  };

  const linkContainer = cn(
    'w-full max-h-0 md:max-h-screen flex flex-col md:flex-row md:items-center gap-3 overflow-hidden transition-max-height duration-500 md:ml-10',
    toggle && 'max-h-screen'
  );

  return (
    <nav className="container px-5 sm:px-8 py-3 bg-white">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Logo variant="dark" />
          <Button
            size="icon"
            className="md:hidden"
            onClick={() => setToggle(!toggle)}
          >
            <AlignJustify />
          </Button>
        </div>
        <div className={linkContainer}>
          <ul className="w-full flex flex-col md:flex-row gap-3 md:gap-5 mt-5 md:mt-0">
            <NavLink
              title="Home"
              active={pathname === '/'}
              onClick={() => handleNavigate('/')}
            />
            <NavLink
              title="Jobs"
              active={pathname.startsWith('/jobs')}
              onClick={() => handleNavigate('/jobs')}
            />
            <NavLink
              title="Companies"
              active={pathname.startsWith('/companies')}
              onClick={() => handleNavigate('/companies')}
            />
          </ul>
          {status === 'unauthenticated' ? (
            <div className="min-h-12 flex flex-col md:flex-row md:items-center gap-3">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
                onClick={handleSignin}
              >
                Sign In
              </Button>
              <Button className="w-full" onClick={() => router.push('/signup')}>
                Sign Up
              </Button>
            </div>
          ) : status === 'authenticated' ? (
            <ProfileAccount account={session.user} onSignout={handleSignout} />
          ) : (
            <div className="h-12 w-12" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
