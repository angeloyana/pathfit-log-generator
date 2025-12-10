import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldSet } from '@/components/ui/field';
import type { PathfitLogData } from '@/lib/validators';

import { ActivityLogFields } from './activity-log-fields';

export function ActivityLogsFields() {
  const form = useFormContext<PathfitLogData>();
  const { fields, append, remove } = useFieldArray({
    name: 'activityLogs',
    control: form.control,
  });

  return (
    <>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="focus-within:border-ring flex flex-col rounded-lg border p-6"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="ml-auto size-5"
          >
            <X />
          </Button>
          <FieldSet>
            <FieldGroup>
              <ActivityLogFields name={`activityLogs.${index}`} />
            </FieldGroup>
          </FieldSet>
        </div>
      ))}
      <Field orientation="responsive">
        <Button type="button" variant="outline" onClick={() => append({})}>
          <Plus />
          Add Activity Log
        </Button>
      </Field>
    </>
  );
}
