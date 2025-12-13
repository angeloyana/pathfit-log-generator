import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { Sex } from '@/constants/sexes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function getAge(d: Date) {
  const birth = new Date(d);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

export function getBmiClassification(bmi: number) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function getWaistClassification(waistCircumference: number, sex: Sex) {
  const ranges = {
    male: [
      { label: 'Very Low', max: 33 },
      { label: 'Low', max: 36.5 },
      { label: 'Moderate', max: 40 },
      { label: 'High', max: 43 },
      { label: 'Very High', max: Infinity },
    ],
    female: [
      { label: 'Very Low', max: 27.5 },
      { label: 'Low', max: 31 },
      { label: 'Moderate', max: 34 },
      { label: 'High', max: 37.5 },
      { label: 'Very High', max: Infinity },
    ],
  };

  const list = sex.toLowerCase() === 'male' ? ranges.male : ranges.female;
  for (let i = 0; i < list.length; i++) {
    if (waistCircumference <= list[i].max) return list[i].label;
  }
}

export function getIntensity(pmhr: number, bpm: number) {
  const percent = (bpm / pmhr) * 100;
  if (percent >= 85) return 'High';
  if (percent >= 70) return 'Vigorous';
  if (percent >= 50) return 'Moderate';
  return 'Light';
}

export function calculateVo2Max(age: number, bpm: number) {
  const mhr = 208 - 0.7 * age;
  return Math.round((15.3 * mhr) / (bpm * 3));
}
