'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { TMenu } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import Menu from './Menu';
import Avatar from '../Avatar';

interface ProfileAccountProps {
  account: User;
  onSignout: () => void;
}

const ProfileAccount = ({ account, onSignout }: ProfileAccountProps) => {
  const renderMenu = () => {
    return Menu[account.role].map((menu: TMenu, index: number) => (
      <li key={index}>
        <Link
          href={menu.href}
          className="flex items-center gap-2 py-2.5 text-sm font-medium"
        >
          {menu.icon}
          {menu.title}
        </Link>
      </li>
    ));
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center md:flex-row-reverse gap-2">
          <Avatar image={account.image} fallback={account.name!!} />
          <span>{account.name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-56 p-2.5" align="start">
        <ul>
          {Menu[account.role] && renderMenu()}
          <li>
            <Separator />
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full mt-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-500"
              onClick={onSignout}
            >
              Sign Out
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileAccount;
