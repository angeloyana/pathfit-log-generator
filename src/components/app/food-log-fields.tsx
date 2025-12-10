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

type FoodLogFieldsProps = {
  baseName: string;
};

export function FoodLogFields({ baseName }: FoodLogFieldsProps) {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: baseName,
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
                    name={`${baseName}.${index}.name`}
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
                    name={`${baseName}.${index}.calories`}
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
