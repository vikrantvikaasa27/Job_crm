import { z } from 'zod';

const formSigninSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please use valid email'),
  password: z.string({ required_error: 'Password is required' }),
});

export default formSigninSchema;
