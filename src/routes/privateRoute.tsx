import React, {ReactChildren, ReactChild} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuthToken} from '../components/hooks/useAuthToken';

interface Props {
  children: ReactChild | ReactChildren;
  path: string;
}

const PrivateRoute: React.FunctionComponent<Props> = ({
  children,
  ...rest
}: Props) => {
  const [authToken] = useAuthToken();

  return (
    <Route
      {...rest}
      render={({location}) =>
        authToken ? (
          children
        ) : (
          <Redirect to={{pathname: '/login', state: {from: location}}} />
        )
      }
    />
  );
};

export default PrivateRoute;
