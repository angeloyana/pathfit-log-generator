import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FieldDescription, FieldSeparator } from '@/components/ui/field';
import { FormControl, FormError, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ExercisesFields } from './exercises-fields';
import { FoodLogFields } from './food-log-fields';

type ActivityLogFieldsProps = {
  baseName: string;
};

export function ActivityLogFields({ baseName }: ActivityLogFieldsProps) {
  const form = useFormContext();

  return (
    <>
      <FormField
        name={`${baseName}.date`}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
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
        name={`${baseName}.venue`}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Venue</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Venue"
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
          name={`${baseName}.timeStarted`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Started</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          name={`${baseName}.timeEnded`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Ended</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-7 md:grid-cols-2">
        <FormField
          name={`${baseName}.pulseRateBefore`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pulse Rate Before</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
                    type="number"
                    placeholder="Pulse Rate Before"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                      )
                    }
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>in 20 seconds</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          name={`${baseName}.pulseRateAfter`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pulse Rate After</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
                    type="number"
                    placeholder="Pulse Rate After"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                      )
                    }
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>in 20 seconds</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FormError />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name={`${baseName}.frequency`}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frequency</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="Frequency"
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber)
                }
              />
            </FormControl>
            <FieldDescription>
              How often do you perform these activities each week?
            </FieldDescription>
            <FormError />
          </FormItem>
        )}
      />
      <FieldSeparator />
      <ExercisesFields baseName={`${baseName}.exercises`} />
      <FieldSeparator />
      <FoodLogFields baseName={`${baseName}.foodLog`} />
      <FieldSeparator />
      <div className="grid gap-7 md:grid-cols-2">
        <FormField
          name={`${baseName}.sleepTime`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sleep Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          name={`${baseName}.wakeTime`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wake Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="time"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </FormControl>
              <FormError />
            </FormItem>
          )}
        />
      </div>
      <FormField
        name={`${baseName}.meal`}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meal</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. Breakfast"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value || undefined)}
              />
            </FormControl>
            <FormError />
          </FormItem>
        )}
      />
      <FormField
        name={`${baseName}.mealTime`}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meal Time</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="time"
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value || undefined)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </FormControl>
            <FormError />
          </FormItem>
        )}
      />
      <FormField
        name={`${baseName}.mealVenue`}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meal Venue</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Meal Venue"
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
          name={`${baseName}.moodBefore`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood Before</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Mood Before"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              </FormControl>
              <FieldDescription>How do you feel before eating?</FieldDescription>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          name={`${baseName}.moodAfter`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood After</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Mood After"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                />
              </FormControl>
              <FieldDescription>How do you feel after eating?</FieldDescription>
              <FormError />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-7 md:grid-cols-2">
        <FormField
          name={`${baseName}.hungerLevel`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hunger Level</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
                    placeholder="Hunger Level"
                    type="number"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                      )
                    }
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>1 - 10</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>How hungry do you feel before eating?</FieldDescription>
              <FormError />
            </FormItem>
          )}
        />
        <FormField
          name={`${baseName}.fullnessLevel`}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullness Level</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
                    placeholder="Fullness Level"
                    type="number"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber
                      )
                    }
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>1 - 10</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>How full do you feel before eating?</FieldDescription>
              <FormError />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
