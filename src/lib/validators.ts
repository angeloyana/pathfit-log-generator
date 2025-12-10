import { z } from 'zod';

import { periodicTerms } from '@/constants/periodic-terms';
import { sexes } from '@/constants/sexes';

const metricsFields = {
  weight: z.number(),
  height: z.number(),
  waistCircumference: z.number(),
};

const activityLogSchema = z
  .object({
    date: z.date(),
    venue: z.string(),
    timeStarted: z.string(),
    timeEnded: z.string(),
    pulseRateBefore: z.number(),
    pulseRateAfter: z.number(),
    frequency: z.number(),

    exercises: z.array(
      z
        .object({
          name: z.string(),
          frequency: z.string(),
        })
        .partial()
    ),
    foodLog: z.array(
      z
        .object({
          name: z.string(),
          calories: z.number(),
        })
        .partial()
    ),

    sleepTime: z.string(),
    wakeTime: z.string(),
    meal: z.string(),
    mealTime: z.string(),
    mealVenue: z.string(),
    moodBefore: z.string(),
    moodAfter: z.string(),
    hungerLevel: z.number(),
    fullnessLevel: z.number(),
  })
  .partial();

export const pathfitLogSchema = z
  .object({
    pathfitNumber: z.number(),
    periodicTerm: z.enum(periodicTerms.map(({ value }) => value)),
    startOfTerm: z.date(),
    name: z.string(),
    section: z.string(),
    birthDate: z.date(),
    sex: z.enum(sexes.map(({ value }) => value)),
    ...metricsFields,

    activityLogs: z.array(activityLogSchema),
    practicalTest: z
      .object({
        metrics: z.object(metricsFields).partial(),
        activityLog: activityLogSchema,
      })
      .partial(),
  })
  .partial();

export type PathfitLogData = z.infer<typeof pathfitLogSchema>;
