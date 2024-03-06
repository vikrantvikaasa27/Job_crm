'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Menu,
  Users,
  LogOut,
  Building,
  Settings,
  ClipboardList,
} from 'lucide-react';

import SideLink from './SideLink';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setToggle(false);
  };

  const handleSignout = () => {
    signOut({ redirect: false });
    router.push('/');
  };

  return (
    <aside
      className={cn(
        'max-w-60 w-full px-5 py-7 border-r border-r-neutral-300 fixed inset-y-0 -left-60 md:left-0 z-10 duration-300 bg-white',
        toggle && 'left-0'
      )}
    >
      <Button
        size="icon"
        className="fixed top-4 right-5 md:hidden"
        onClick={() => setToggle(!toggle)}
      >
        <Menu />
      </Button>
      <h3 className="text-2xl font-medium">Dashboard</h3>
      <ul className="mt-5 space-y-3">
        <SideLink
          title="Home"
          active={pathname.endsWith('/company')}
          onClick={() => handleNavigate('/dashboard/company')}
        >
          <Home className="w-5 h-5" />
        </SideLink>
        <SideLink
          title="Job Listings"
          active={pathname.includes('job')}
          onClick={() => handleNavigate('/dashboard/company/job-listings')}
        >
          <div>
            <ClipboardList className="w-5 h-5" />
          </div>
        </SideLink>
        <SideLink
          title="All Applicants"
          active={pathname.endsWith('applicants')}
          onClick={() => handleNavigate('/dashboard/company/applicants')}
        >
          <div>
            <Users className="w-5 h-5" />
          </div>
        </SideLink>
        <SideLink
          title="Company Profile"
          active={pathname.endsWith('profile')}
          onClick={() => handleNavigate('/dashboard/company/profile')}
        >
          <div>
            <Building className="w-5 h-5" />
          </div>
        </SideLink>
        <SideLink
          title="Settings"
          active={pathname.endsWith('settings')}
          onClick={() => handleNavigate('/dashboard/company/settings')}
        >
          <div>
            <Settings className="w-5 h-5" />
          </div>
        </SideLink>
        <li>
          <Button
            type="button"
            variant="ghost"
            className="w-full flex items-center justify-start gap-5 p-3 text-sm bg-red-500/10 hover:bg-red-500/25 text-red-700 hover:text-red-700"
            onClick={handleSignout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
