import { zodResolver } from '@hookform/resolvers/zod';
import { WandSparkles } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ActivityLogsFields } from '@/components/app/activity-logs-fields';
import { PracticalTestFields } from '@/components/app/practical-test-fields';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { type PathfitLogData, pathfitLogSchema } from '@/lib/validators';

import { GeneralFieldSet } from './general-field-set';
import { MetricsFields } from './metrics-fields';

export function PathfitLogForm() {
  const form = useForm<PathfitLogData>({
    resolver: zodResolver(pathfitLogSchema),
  });
  const [isSubmitPending, startSubmitTransition] = React.useTransition();

  const handleSubmit = (data: PathfitLogData) => {
    startSubmitTransition(async () => {
      toast(
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      );
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <GeneralFieldSet />
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Metrics</FieldLegend>
            <FieldDescription>Body measurements at the start of the term.</FieldDescription>
            <FieldGroup>
              <MetricsFields />
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Activity Logs</FieldLegend>
            <FieldDescription>Record of activities completed during the term.</FieldDescription>
            <FieldGroup>
              <ActivityLogsFields />
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <PracticalTestFields />
          <Field orientation="responsive">
            {import.meta.env.DEV && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset({
                    pathfitNumber: 1,
                    periodicTerm: 'midterm',
                    startOfTerm: new Date(),
                    name: 'Doe, John',
                    section: 'BSIT-21B',
                    birthDate: new Date(2000, 0, 15),
                    sex: 'male',
                    weight: 70,
                    height: 1.75,
                    waistCircumference: 32,
                    activityLogs: [
                      {
                        date: new Date(),
                        venue: 'Gym',
                        timeStarted: '08:00',
                        timeEnded: '09:00',
                        pulseRateBefore: 22,
                        pulseRateAfter: 35,
                        frequency: 3,
                        exercises: [{ name: 'Push-ups', frequency: '3 x 10' }],
                        foodLog: [{ name: 'Chicken Salad', calories: 350 }],
                        sleepTime: '22:00',
                        wakeTime: '06:00',
                        meal: 'Breakfast',
                        mealTime: '07:00',
                        mealVenue: 'Canteen',
                        moodBefore: 'Tired',
                        moodAfter: 'Energetic',
                        hungerLevel: 7,
                        fullnessLevel: 3,
                      },
                    ],
                    practicalTest: {
                      metrics: { weight: 70, height: 1.75, waistCircumference: 32 },
                      activityLog: {
                        date: new Date(),
                        venue: 'Gym',
                        timeStarted: '10:00',
                        timeEnded: '11:00',
                        pulseRateBefore: 20,
                        pulseRateAfter: 30,
                        frequency: 2,
                        exercises: [{ name: 'Sit-ups', frequency: '2 x 15' }],
                        foodLog: [{ name: 'Protein Shake', calories: 200 }],
                        sleepTime: '22:00',
                        wakeTime: '06:00',
                        meal: 'Breakfast',
                        mealTime: '07:00',
                        mealVenue: 'Canteen',
                        moodBefore: 'Tired',
                        moodAfter: 'Energetic',
                        hungerLevel: 6,
                        fullnessLevel: 4,
                      },
                    },
                  });
                }}
              >
                Fill-Up Sample Data
              </Button>
            )}
            <Button type="submit" disabled={isSubmitPending}>
              {isSubmitPending ? <Spinner /> : <WandSparkles />}
              Generate
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
