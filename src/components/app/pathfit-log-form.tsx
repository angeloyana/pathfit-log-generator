import { zodResolver } from '@hookform/resolvers/zod';
import { WandSparkles } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { type PathfitLogData, pathfitLogSchema } from '@/lib/validators';

import { GeneralFieldSet } from './general-field-set';

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
