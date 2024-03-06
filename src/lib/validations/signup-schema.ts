import { z } from 'zod';
import { ROLE_OPTIONS } from '@/constants';

const formSignupSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .regex(new RegExp(/^[a-z0-9]+$/), 'Username only contain alpha numeric')
      .min(5, 'Username must be at least 5 characters')
      .max(55, 'Username maximum 55 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Please use valid email'),
    role: z.enum(ROLE_OPTIONS, {
      required_error: 'You need to select a role type',
    }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 5 characters'),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });

export default formSignupSchema;
