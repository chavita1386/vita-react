import React, {FC} from 'react';
import styled from 'styled-components';
import LoginForm from '../components/login-form/loginForm';

const Wrapper = styled.section`
  display: grid;
  height: 100vh;
  justify-items: center;
  align-items: center;
`;

const LoginPage: FC<{}> = () => {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
};

export default LoginPage;
