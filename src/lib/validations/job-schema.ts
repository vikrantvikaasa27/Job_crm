import { z } from 'zod';
import { JOB_TYPES } from '@/constants';

const formJobSchema = z.object({
  role: z
    .string({ required_error: 'Role is required' })
    .min(3, 'Role must be at least 3 characters'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, { message: 'Description must be at least 10 characters' }),
  dueDate: z.date({ required_error: 'Due date is required' }),
  jobType: z.enum(JOB_TYPES, {
    required_error: 'You need to select a job type',
  }),
  totalNeeds: z.string({ required_error: 'Total needs is required' }),
  salaryFrom: z.string({ required_error: 'Salary From is required' }),
  salaryTo: z.string({ required_error: 'Salary To is required' }),
  requiredSkills: z
    .string({ required_error: 'Required skills must be at least 1 skill' })
    .array()
    .nonempty({ message: 'Required skills must be at least 1 skill' }),
  benefits: z
    .object({
      name: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: 'Benefits must be at least 1 benefit' }),
  categoryId: z.string({ required_error: 'You need to select a category' }),
});

export default formJobSchema;
