export interface Values {
  [key: string]: any;
}

export type Validator = (
  fieldName: string,
  values: Values,
  args?: any,
) => string;

export interface Validation {
  validator: Validator;
  arg?: any;
}

export interface ValidationProp {
  [key: string]: Validation | Validation[];
}

export interface Errors {
  [key: string]: string[];
}

export interface SubmitResult {
  success: boolean;
  errors?: Errors;
  fallback?: () => any;
}

/*
 * Form field
 * */

export enum InputType {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  TextArea = 'texarea',
  Select = 'select',
}

export interface FieldProps {
  name: string;
  label: string;
  type?: InputType;
  options?: string[];
}

/*
 *
 * Form context
 *
 * */

export interface FormContext {
  values: Values;
  errors: Errors;
  validate?: (fieldName: string) => void;
  setValue?: (fieldName: string, value: any) => void;
}
