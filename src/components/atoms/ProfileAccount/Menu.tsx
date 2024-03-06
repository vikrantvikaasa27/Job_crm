import { TMenu } from '@/types';
import { ClipboardList, Settings, User } from 'lucide-react';

const companyMenu: TMenu[] = [
  {
    title: 'Dashboard',
    href: '/dashboard/company',
    icon: <User className="w-5 h-5" />,
  },
  {
    title: 'Job Listings',
    href: '/dashboard/job-listings',
    icon: <ClipboardList className="w-5 h-5" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

const jobseekerMenu: TMenu[] = [];

const Menu: Record<string, TMenu[]> = {
  COMPANY: companyMenu,
  JOBSEEKER: jobseekerMenu,
};

export default Menu;
