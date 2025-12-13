import { formatDuration } from './utils.js';

type Config = Record<
  string,
  {
    x: number;
    y: number;
    size?: number;
    formatter: (v: any) => string; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
>;

export const config: Config = {
  pathfitNumber: {
    x: 216,
    y: 894,
    size: 14,
    formatter: String,
  },
  name: {
    x: 155,
    y: 869,
    formatter: (v) => v,
  },
  section: {
    x: 480,
    y: 869,
    formatter: (v) => v,
  },
  birthDate: {
    x: 139,
    y: 846,
    formatter: (v) => v.toLocaleDateString(),
  },
  age: {
    x: 80,
    y: 831,
    formatter: String,
  },
  pmhr: {
    x: 225,
    y: 831,
    formatter: (v) => v.toFixed(0),
  },
  thrLight: {
    x: 545,
    y: 831,
    formatter: (v) => String(Math.round(v)),
  },
  thrModerate: {
    x: 475,
    y: 831,
    formatter: (v) => String(Math.round(v)),
  },
  thrVigorous: {
    x: 395,
    y: 831,
    formatter: (v) => String(Math.round(v)),
  },
  thrHigh: {
    x: 310,
    y: 831,
    formatter: (v) => String(Math.round(v)),
  },
  metricsDate: {
    x: 71,
    y: 626,
    formatter: (v) => v.toLocaleDateString(),
  },
  weight: {
    x: 90,
    y: 612,
    formatter: (v) => v.toFixed(1),
  },
  height: {
    x: 90,
    y: 598,
    formatter: (v) => v.toFixed(1),
  },
  bmi: {
    x: 209,
    y: 612,
    formatter: (v) => v.toFixed(1),
  },
  bmiClassification: {
    x: 209,
    y: 598,
    formatter: (v) => v,
  },
  waistCircumference: {
    x: 400,
    y: 612,
    formatter: (v) => v.toFixed(1),
  },
  waistClassification: {
    x: 400,
    y: 598,
    formatter: (v) => v,
  },
  dbw: {
    x: 534,
    y: 612,
    formatter: (v) => v.toFixed(1),
  },
  dbwf: {
    x: 534,
    y: 598,
    formatter: (v) => v.toFixed(1),
  },
  date: {
    x: 71,
    y: 579,
    size: 8.5,
    formatter: (v) => v.toLocaleDateString(),
  },
  venue: {
    x: 71,
    y: 568,
    size: 8.5,
    formatter: (v) => v,
  },
  pulseRateBefore: {
    x: 96,
    y: 558.5,
    size: 8.5,
    formatter: (v) => v.toFixed(0),
  },
  pulseRateBefore3x: {
    x: 96,
    y: 548.5,
    size: 8.5,
    formatter: (v) => v.toFixed(0),
  },
  pulseRateAfter: {
    x: 96,
    y: 538,
    size: 8.5,
    formatter: (v) => v.toFixed(0),
  },
  pulseRateAfter3x: {
    x: 96,
    y: 528,
    size: 8.5,
    formatter: (v) => v.toFixed(0),
  },
  intensity: {
    x: 83,
    y: 517,
    size: 8.5,
    formatter: (v) => v,
  },
  timeStarted: {
    x: 88,
    y: 507,
    size: 8.5,
    formatter: (v) => v,
  },
  timeEnded: {
    x: 88,
    y: 496,
    size: 8.5,
    formatter: (v) => v,
  },
  vo2MaxBefore: {
    x: 101,
    y: 486,
    size: 8.5,
    formatter: (v) => v.toFixed(1),
  },
  vo2MaxAfter: {
    x: 101,
    y: 475,
    size: 8.5,
    formatter: (v) => v.toFixed(1),
  },
  duration: {
    x: 215,
    y: 475,
    size: 8.5,
    formatter: formatDuration,
  },
  frequency: {
    x: 297,
    y: 475,
    size: 8.5,
    formatter: String,
  },
  'exercise.name': {
    x: 173,
    y: 556,
    formatter: (v) => v,
  },
  'exercise.frequency': {
    x: 320,
    y: 556,
    formatter: (v) => v,
  },
  'foodLog.name': {
    x: 331,
    y: 556,
    formatter: (v) => v,
  },
  'foodLog.calories': {
    x: 469,
    y: 556,
    formatter: String,
  },

  totalCalories: {
    x: 393,
    y: 475,
    size: 8.5,
    formatter: String,
  },

  sleepTime: {
    x: 542,
    y: 569,
    size: 8.5,
    formatter: (v) => v,
  },
  wakeTime: {
    x: 542,
    y: 559,
    size: 8.5,
    formatter: (v) => v,
  },
  meal: {
    x: 523,
    y: 548,
    size: 8.5,
    formatter: (v) => v,
  },
  mealTime: {
    x: 523,
    y: 538,
    size: 8.5,
    formatter: (v) => v,
  },
  mealVenue: {
    x: 523,
    y: 528,
    size: 8.5,
    formatter: (v) => v,
  },
  moodBefore: {
    x: 537,
    y: 517,
    size: 8.5,
    formatter: (v) => v,
  },
  moodAfter: {
    x: 537,
    y: 507,
    size: 8.5,
    formatter: (v) => v,
  },
  hungerLevel: {
    x: 562,
    y: 496,
    size: 8.5,
    formatter: String,
  },
  fullnessLevel: {
    x: 562,
    y: 485,
    size: 8.5,
    formatter: String,
  },
};
