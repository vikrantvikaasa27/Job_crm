import { z } from 'zod';

const formLinkSchema = z.object({
  name: z.string({ required_error: 'Link name is required' }),
  link: z
    .string({ required_error: 'Link url is required' })
    .url('Link url must be valid url'),
});

export default formLinkSchema;
