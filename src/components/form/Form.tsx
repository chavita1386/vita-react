import * as React from 'react';
import {
  Errors,
  ValidationProp,
  Values,
  FormContext,
  FieldProps,
  SubmitResult,
} from './FormTypes';
import {FormField} from './FormField';
import {Button} from '../shared';

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
export const FormCtx = React.createContext<FormContext>({
  values: {},
  errors: {},
});

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

  public static Field: React.FunctionComponent<FieldProps> = FormField;

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
            <Button
              id="buttonForm"
              type="submit"
              style="primary"
              label="Sign in"
            />
          </div>
        </form>
      </FormCtx.Provider>
    );
  }
}
