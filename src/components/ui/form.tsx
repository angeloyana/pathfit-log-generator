import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  useFormContext,
  useFormState,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const useFormField = () => {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: ctx.name });
  const fieldState = getFieldState(ctx.name, formState);

  return { ...ctx, ...fieldState };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const useFormItem = () => {
  const ctx = React.useContext(FormItemContext);
  if (!ctx) {
    throw new Error('useFormItem should be used within <FormItem>');
  }
  return ctx;
};

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function FormItem(props: React.ComponentProps<typeof Field>) {
  const { invalid } = useFormField();
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <Field data-invalid={invalid} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel(props: React.ComponentProps<typeof FieldLabel>) {
  const { id } = useFormItem();
  return <FieldLabel htmlFor={id} {...props} />;
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { invalid } = useFormField();
  const { id } = useFormItem();

  return <Slot id={id} aria-invalid={invalid} {...props} />;
}

function FormError() {
  const { error } = useFormField();
  return error && <FieldError errors={[error]} />;
}

export { FormControl, FormError, FormField, FormItem, FormLabel };
