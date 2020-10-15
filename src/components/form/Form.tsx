import * as React from 'react';
import {
  Errors,
  ValidationProp,
  Values,
  FormContext,
  FieldProps,
  SubmitResult,
} from './FormTypes';

interface Props {
  defaultValues: Values;
  validationRules: ValidationProp;
  onSubmit: (values: Values) => Promise<SubmitResult>;
}

interface State {
  values: Values;
  errors: Errors;
  submitting: boolean;
  submitted: boolean;
}
const FormCtx = React.createContext<FormContext>({values: {}, errors: {}});

export default class Form extends React.Component<Props, State> {
  static defaultProps = {};
  readonly state: State = {
    values: this.props.defaultValues,
    errors: Object.keys(this.props.defaultValues).reduce((acc, current) => {
      return {...acc, [current]: []};
    }, {}),
    submitted: false,
    submitting: false,
  };

  public static Field: React.FunctionComponent<FieldProps> = props => {
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

  private setValue = (fieldName: string, value: any) => {
    const values = {...this.state.values, [fieldName]: value};
    this.setState({values});
  };

  private validate = (fieldName: string) => {
    const rules = this.props.validationRules[fieldName];
    const errors: string[] = [];
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const error = rule.validator(fieldName, this.state.values, rule.arg);
        if (error) {
          errors.push(error);
        }
      });
    } else {
      if (rules) {
        const error = rules.validator(fieldName, this.state.values, rules.arg);
        if (error) {
          errors.push(error);
        }
      }
    }
    const newErrors = {...this.state.errors, [fieldName]: errors};
    this.setState({errors: newErrors});
    return errors;
  };

  private validateForm(): boolean {
    const errors: Errors = {};
    let haveError: boolean = false;
    Object.keys(this.props.defaultValues).map(fieldName => {
      errors[fieldName] = this.validate(fieldName);
      if (errors[fieldName].length > 0) {
        haveError = true;
      }
      return null;
    });
    this.setState({errors});
    return !haveError;
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({submitting: true});
      const result = await this.props.onSubmit(this.state.values);
      if (!result.success) {
        this.setState({
          errors: result.errors || {},
          submitting: false,
          submitted: result.success,
        });
      }
      result.fallback && result.fallback();
    }
  };

  public render() {
    const context: FormContext = {
      setValue: this.setValue,
      values: this.state.values,
      errors: this.state.errors,
      validate: this.validate,
    };
    return (
      <FormCtx.Provider value={context}>
        <form
          className="form form--login"
          noValidate={true}
          onSubmit={this.handleSubmit}>
          {this.props.children}
          <div className="form-group">
            <button
              type="submit"
              disabled={this.state.submitting || this.state.submitted}>
              Submit
            </button>
          </div>
        </form>
      </FormCtx.Provider>
    );
  }
}
