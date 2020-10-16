import React, {FunctionComponent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useLoginMutation} from '../../api/graphql/mutations/login';
import {Form, required} from '../form';
import {InputType, SubmitResult, Values} from '../form/FormTypes';
import './loginForm.scss';

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
    <div className="login-form">
      <h2 className="title">
        Sign in <span className="branch">Vita Restaurant</span>
      </h2>
      <Form
        id="login"
        defaultValues={{email: '', password: ''}}
        validationRules={{
          email: {validator: required},
          password: {validator: required},
        }}
        onSubmit={handleSubmit}>
        <Form.Field
          id="usernameText"
          name="email"
          label="Email"
          type={InputType.Email}
        />
        <Form.Field
          id="passwordText"
          name="password"
          label="Password"
          type={InputType.Password}
        />
      </Form>
      {error && <span className="message message--error">{error}</span>}
    </div>
  );
};

export default LoginForm;
