import Image from 'next/image';
import { cn, getImageSrc } from '@/lib/utils';

interface AvatarProps {
  image: string | null | undefined;
  fallback: string;
  size?: number;
  className?: string;
}

const Avatar = ({ image, fallback, size = 48, className }: AvatarProps) => {
  return (
    <Image
      src={getImageSrc(image, fallback)}
      width={size}
      height={size}
      alt="avatar"
      className={cn('aspect-square object-cover rounded-full', className)}
    />
  );
};

export default Avatar;
