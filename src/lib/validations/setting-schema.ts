import { z } from 'zod';

const formCompanySettingSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .regex(new RegExp(/^[a-z0-9]+$/), 'Username only contain alpha numeric')
      .min(5, 'Username must be at least 5 characters')
      .max(55, 'Username maximum 55 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Please use valid email'),
    password: z
      .union([
        z.string().length(0, 'Password at least 6 character'),
        z.string().min(6),
      ])
      .optional()
      .transform((val) => (val === '' ? undefined : val)),
    confirmPassword: z.optional(z.string()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });

export default formCompanySettingSchema;
