import {Validator, Values} from './FormTypes';

export const required: Validator = (
  fieldName: string,
  values: Values,
  args?: any,
): string => {
  const value = values[fieldName];
  return value === undefined || value === null || value === ''
    ? `Field ${fieldName} must be populated`
    : '';
};

export const minLength: Validator = (
  fieldName: string,
  values: Values,
  length?: any,
): string => {
  const value = values[fieldName];
  return value?.length < length
    ? `Field ${fieldName} must be at least ${length} characters`
    : '';
};
