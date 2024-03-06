import { cn } from '@/lib/utils';

interface SideLinkProps {
  title: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const SideLink = ({ title, active, children, onClick }: SideLinkProps) => {
  return (
    <li
      className={cn(
        'flex items-center gap-5 p-3 text-sm rounded-md hover:bg-primary/10 hover:text-primary cursor-pointer',
        active && 'text-white bg-primary'
      )}
      onClick={onClick}
    >
      {children}
      <span>{title}</span>
    </li>
  );
};

export default SideLink;
