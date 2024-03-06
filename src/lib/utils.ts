import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabaseGetFile } from './supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageSrc = (
  image: string | undefined | null,
  username: string
): string => {
  if (image) {
    const { url } = supabaseGetFile(image, 'images');
    return url;
  }

  return `https://ui-avatars.com/api/?name=${username}`;
};

export const activeMenu = (currPath: string, path: RegExp) => {
  if (path.test(currPath)) {
    return 'text-primary relative after:w-1/2 after:h-0.5 after:bg-primary after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2';
  }

  return '';
};
