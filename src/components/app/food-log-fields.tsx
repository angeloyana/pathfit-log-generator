import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { FormControl, FormError, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import type { PathfitLogData } from '@/lib/validators';

type FoodLogFieldsProps = {
  name: `activityLogs.${number}.foodLog` | `practicalTest.activityLog.foodLog`;
};

export function FoodLogFields({ name }: FoodLogFieldsProps) {
  const form = useFormContext<PathfitLogData>();
  const { fields, append, remove } = useFieldArray({
    name,
    control: form.control,
  });

  const handleAddFood = () => {
    append({});
  };

  return (
    <FieldSet>
      <FieldLegend variant="label">Food Log</FieldLegend>
      <FieldDescription>Foods you ate before the activity.</FieldDescription>
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
                    name={`${name}.${index}.name`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Rice"
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(e.target.value || undefined)}
                          />
                        </FormControl>
                        <FormError />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`${name}.${index}.calories`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories</FormLabel>
                        <InputGroup>
                          <FormControl>
                            <InputGroupInput
                              {...field}
                              placeholder="Calories"
                              type="number"
                              step="any"
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                                )
                              }
                            />
                          </FormControl>
                          <InputGroupAddon align="inline-end">
                            <InputGroupText>cal</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
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
          <Button type="button" variant="outline" onClick={handleAddFood}>
            <Plus />
            Add Food
          </Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
