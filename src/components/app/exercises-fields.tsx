import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { FormControl, FormError, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type ExercisesFieldsProps = {
  baseName: string;
};

export function ExercisesFields({ baseName }: ExercisesFieldsProps) {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: baseName,
    control: form.control,
  });

  const handleAddExercise = () => {
    append({});
  };

  return (
    <FieldSet>
      <FieldLegend variant="label">Exercises</FieldLegend>
      <FieldDescription>Activities you did during the time span.</FieldDescription>
      <FieldGroup>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="focus-within:border-ring grid rounded-lg border p-6 shadow-xs"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-auto size-5"
              onClick={() => remove(index)}
            >
              <X />
            </Button>
            <FieldSet>
              <FieldGroup>
                <div className="grid gap-7 md:grid-cols-2">
                  <FormField
                    name={`${baseName}.${index}.name`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Push Ups"
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(e.target.value || undefined)}
                          />
                        </FormControl>
                        <FormError />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`${baseName}.${index}.frequency`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sets x Reps/Seconds</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Sets x Reps/Seconds"
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(e.target.value || undefined)}
                          />
                        </FormControl>
                        <FormError />
                      </FormItem>
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldSet>
          </div>
        ))}
        <Field orientation="responsive">
          <Button type="button" variant="outline" onClick={handleAddExercise}>
            <Plus />
            Add Exercise
          </Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
