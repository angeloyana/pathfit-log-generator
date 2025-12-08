import { useFormContext } from 'react-hook-form';

import { FormControl, FormError, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';

type MetricsFieldsProps = {
  baseName?: string;
};

export function MetricsFields({ baseName }: MetricsFieldsProps) {
  baseName = baseName ? baseName + '.' : '';
  const form = useFormContext();

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
