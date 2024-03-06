import Link from 'next/link';
import Image from 'next/image';
import { logoDark, logoLight } from '@/images';

interface LogoProps {
  variant: 'light' | 'dark';
  width?: number;
  heigth?: number;
  className?: string;
}

const Logo = ({ variant, width = 192, heigth = 43, className }: LogoProps) => {
  return (
    <Link href="/" className="w-48">
      <Image
        src={variant === 'dark' ? logoDark : logoLight}
        alt="Logo"
        width={width}
        height={heigth}
        priority
        className={className}
      />
    </Link>
  );
};

export default Logo;
