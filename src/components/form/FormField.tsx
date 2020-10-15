import * as React from 'react';
import {FormCtx} from './Form';
import {FieldProps, FormContext} from './FormTypes';

export const FormField: React.FunctionComponent<FieldProps> = props => {
  const {name, label, type, options} = props;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    context: FormContext,
  ) => {
    if (context.setValue) {
      context.setValue(props.name, e.currentTarget.value);
    }
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    context: FormContext,
  ) => {
    if (context.validate) {
      context.validate(props.name);
    }
  };

  return (
    <FormCtx.Consumer>
      {context => (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          {(type === 'Text' || type === 'Email' || type === 'Password') && (
            <input
              type={type?.toLowerCase()}
              id={name}
              value={context.values[name]}
              onChange={e => handleChange(e, context)}
              onBlur={e => handleBlur(e, context)}
            />
          )}
          {type === 'TextArea' && (
            <textarea
              id={name}
              value={context.values[name]}
              onChange={e => handleChange(e, context)}
              onBlur={e => handleBlur(e, context)}></textarea>
          )}
          {type === 'Select' && (
            <select
              id={name}
              value={context.values[name]}
              onChange={e => handleChange(e, context)}
              onBlur={e => handleChange(e, context)}>
              {options &&
                options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          )}
          {context.errors[name] &&
            context.errors[name].length > 0 &&
            context.errors[name].map(error => (
              <span key={error} className="form-error">
                {error}
              </span>
            ))}
        </div>
      )}
    </FormCtx.Consumer>
  );
};
