import { useFormContext } from 'react-hook-form';

import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { FormControl, FormError, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function GeneralFieldSet() {
  const form = useFormContext();

  return (
    <FieldSet>
      <FieldLegend>General</FieldLegend>
      <FieldDescription>Provide the required general information.</FieldDescription>
      <FieldGroup>
        <FormField
          name="pathfitNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pathfit</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="1, 2, 3, or 4"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(
                      isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                    )
                  }
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          name="section"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade/Section</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Grade/Section"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}
