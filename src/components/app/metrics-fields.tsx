import { useFormContext } from 'react-hook-form';

import { FormControl, FormError, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import type { PathfitLogData } from '@/lib/validators';

type MetricsFieldsProps = {
  name?: 'practicalTest.metrics';
};

export function MetricsFields({ name }: MetricsFieldsProps) {
  const baseName = name ? (`${name}.` as const) : '';
  const form = useFormContext<PathfitLogData>();

  return (
    <>
      <div className="grid gap-7 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`${baseName}weight`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
                    type="number"
                    step="any"
                    placeholder="Weight"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                      )
                    }
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>kg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${baseName}height`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
                    type="number"
                    step="any"
                    placeholder="Height"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                      )
                    }
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>m</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FormError />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name={`${baseName}waistCircumference`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Waist Circumference</FormLabel>
            <InputGroup>
              <FormControl>
                <InputGroupInput
                  {...field}
                  type="number"
                  step="any"
                  placeholder="Waist Circumference"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(
                      isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                    )
                  }
                />
              </FormControl>
              <InputGroupAddon align="inline-end">
                <InputGroupText>in</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FormError />
          </FormItem>
        )}
      />
    </>
  );
}
