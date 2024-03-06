import { z } from 'zod';

const formCompanySocialShema = z.object({
  facebook: z.string(),
  instagram: z.string(),
  linkedin: z.string(),
  twitter: z.string(),
  youtube: z.string(),
});

export default formCompanySocialShema;
