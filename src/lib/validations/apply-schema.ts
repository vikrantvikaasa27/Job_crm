import { z } from 'zod';

const formApplySchema = z.object({
  fullname: z
    .string({ required_error: 'Full name is required' })
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name maximum 50 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please use valid email'),
  phoneNumber: z
    .string({ required_error: 'Phone number is required' })
    .min(10, 'Phone number must be at least 10 numbers')
    .max(15, 'Phone number maximum 15 numbers'),
  linkedIn: z.optional(z.string().url('Please use valid url')),
  portofolio: z.optional(z.string().url('Please use valid url')),
  coverLetter: z.optional(z.string()),
  resume: z
    .any()
    .refine((file) => file, 'Resume is required')
    .refine(
      (file) => (file ? file.size <= 5000000 : true),
      'Max image size is 500Kb.'
    )
    .refine(
      (file) => (file ? file.type === 'application/pdf' : true),
      'Only .pdf formats are supported.'
    ),
});

export default formApplySchema;
