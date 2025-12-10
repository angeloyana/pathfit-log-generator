import { useFormContext } from 'react-hook-form';

import { ActivityLogFields } from '@/components/app/activity-log-fields';
import { MetricsFields } from '@/components/app/metrics-fields';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

export function PracticalTestFields() {
  const form = useFormContext();
  const practicalTest = form.watch('practicalTest');
  const showFields = !!practicalTest;

  const handleToggleFields = (show: boolean) => {
    form.setValue('practicalTest', show ? {} : undefined);
  };

  return (
    <FieldSet>
      <FieldLegend>Practical Test</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldDescription>
              Include practical test fields, such as metrics and activity log.
            </FieldDescription>
          </FieldContent>
          <Switch checked={showFields} onCheckedChange={handleToggleFields} />
        </Field>
        {showFields && (
          <>
            <FieldSet>
              <FieldLegend>Metrics</FieldLegend>
              <FieldDescription>Body measurements before the term ends.</FieldDescription>
              <FieldGroup>
                <MetricsFields baseName="practicalTest.metrics" />
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Activity Log</FieldLegend>
              <FieldDescription>Activity log during the practical test.</FieldDescription>
              <FieldGroup>
                <ActivityLogFields baseName="practicalTest.activityLog" />
              </FieldGroup>
            </FieldSet>
          </>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
