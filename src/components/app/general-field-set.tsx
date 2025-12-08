import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { FormControl, FormError, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { periodicTerms } from '@/constants/periodic-terms';
import { sexes } from '@/constants/sexes';

export function GeneralFieldSet() {
  const form = useFormContext();

  return (
    <FieldSet>
      <FieldLegend>General</FieldLegend>
      <FieldDescription>Provide the required general information.</FieldDescription>
      <FieldGroup>
        <div className="grid gap-7 md:grid-cols-3">
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
            name="periodicTerm"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periodic Term</FormLabel>
                <Select value={field.value ?? ''} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a periodic term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {periodicTerms.map((term) => (
                      <SelectItem key={term.label} value={term.value}>
                        {term.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormError />
              </FormItem>
            )}
          />
          <FormField
            name="startOfTerm"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start of Term</FormLabel>
                <FormControl>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start font-normal">
                          {field.value?.toLocaleDateString() ?? 'Select a date'}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="grid w-auto gap-4 overflow-hidden" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="p-0"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormError />
              </FormItem>
            )}
          />
        </div>
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
        <div className="grid gap-7 md:grid-cols-2">
          <FormField
            name="birthDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start font-normal">
                          {field.value?.toLocaleDateString() ?? 'Select a date'}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="grid w-auto gap-4 overflow-hidden" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="p-0"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormError />
              </FormItem>
            )}
          />
          <FormField
            name="sex"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <Select value={field.value ?? ''} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sexes.map((sex) => (
                      <SelectItem key={sex.label} value={sex.value}>
                        {sex.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormError />
              </FormItem>
            )}
          />
        </div>
      </FieldGroup>
    </FieldSet>
  );
}
