import { zodResolver } from '@hookform/resolvers/zod';
import { WandSparkles } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ActivityLogsFields } from '@/components/app/activity-logs-fields';
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
          <Field orientation="responsive">
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
