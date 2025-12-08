import { z } from 'zod';

import { periodicTerms } from '@/constants/periodic-terms';
import { sexes } from '@/constants/sexes';

export const pathfitLogSchema = z
  .object({
    pathfitNumber: z.number(),
    periodicTerm: z.enum(periodicTerms.map(({ value }) => value)),
    startOfTerm: z.date(),
    name: z.string(),
    section: z.string(),
    birthDate: z.date(),
    sex: z.enum(sexes.map(({ value }) => value)),
    weight: z.number(),
    height: z.number(),
    waistCircumference: z.number(),
  })
  .partial();

export type PathfitLogData = z.infer<typeof pathfitLogSchema>;
