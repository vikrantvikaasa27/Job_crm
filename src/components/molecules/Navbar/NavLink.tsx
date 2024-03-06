import { cn } from '@/lib/utils';

interface NavLinkProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

const NavLink = ({ title, active, onClick }: NavLinkProps) => {
  return (
    <li
      className={cn(
        'w-max font-medium text-muted-foreground hover:text-primary cursor-pointer relative',
        active &&
          'text-primary after:w-1/2 after:h-0.5 after:bg-primary after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2'
      )}
      onClick={onClick}
    >
      {title}
    </li>
  );
};

export default NavLink;
