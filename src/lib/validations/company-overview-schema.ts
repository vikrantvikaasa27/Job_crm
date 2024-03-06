import { z } from 'zod';
import { ACCEPTED_IMAGE_TYPES } from '@/constants';

const formCompanyOverviewSchema = z.object({
  name: z
    .string({ required_error: 'Company name is required' })
    .min(3)
    .max(100),
  logo: z
    .any()
    .refine(
      (file) => (file ? file?.size <= 5000000 : true),
      'Max image size is 500Kb.'
    )
    .refine(
      (file) => (file ? ACCEPTED_IMAGE_TYPES.includes(file?.type) : true),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  overview: z.string({ required_error: 'About is required' }).min(10),
  industry: z.string({ required_error: 'Industry is required' }),
  website: z.string({ required_error: 'Website is required' }).url(),
  location: z.string({ required_error: 'Location is required' }),
  employee: z.string({ required_error: 'Employee is required' }),
  dateFounded: z.date({ required_error: 'Date Founded is required' }),
});

export default formCompanyOverviewSchema;
