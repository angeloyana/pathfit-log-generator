import { z } from 'zod';

export const pathfitLogSchema = z
  .object({
    pathfitNumber: z.number(),
    name: z.string(),
    section: z.string(),
  })
  .partial();

export type PathfitLogData = z.infer<typeof pathfitLogSchema>;
