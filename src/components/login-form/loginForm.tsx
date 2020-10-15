import React, {FunctionComponent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useLoginMutation} from '../../api/graphql/mutations/login';
import {Form, minLength, required} from '../form';
import {InputType, SubmitResult, Values} from '../form/FormTypes';

const LoginForm: FunctionComponent<{}> = () => {
  let history = useHistory();
  const [loginMutation] = useLoginMutation();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (values: Values): Promise<SubmitResult> => {
    const result = await loginMutation(values['email'], values['password'])
      .then(() => {
        return {
          errors: {},
          success: true,
          fallback: () => history.push('/admin'),
        };
      })
      .catch(e => {
        setError(e.message);
        return {
          errors: {
            server: [e.message],
          },
          success: false,
        };
      });
    return result;
  };

  return (
    <div className="login wrapper">
      {error && <span className="label label--error">{error}</span>}
      <h1>Login</h1>
      <Form
        defaultValues={{email: '', password: ''}}
        validationRules={{
          email: {validator: required},
          password: [{validator: required}, {validator: minLength, arg: 3}],
        }}
        onSubmit={handleSubmit}>
        <Form.Field name="email" label="Email" type={InputType.Email} />
        <Form.Field
          name="password"
          label="Password"
          type={InputType.Password}
        />
      </Form>
    </div>
  );
};

export default LoginForm;
