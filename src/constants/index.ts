import { EnumValues } from 'zod';

export const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export const ROLE_OPTIONS: EnumValues = ['JOBSEEKER', 'COMPANY'];

export const JOB_TYPES: EnumValues = [
  'Full-Time',
  'Part-Time',
  'Remote',
  'Internship',
] as const;

export const EMPLOYEE_OPTIONS: string[] = [
  '1-50',
  '51-150',
  '151-250',
  '251-500',
  '501-1000',
  '1000-above',
] as const;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

export const LINK_OPTIONS = [
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'Youtube',
  'Dribbble',
  'GitHub',
] as const;
