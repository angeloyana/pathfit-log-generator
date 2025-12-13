export const sexes = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
] as const;

export type Sex = (typeof sexes)[number]['value'];
