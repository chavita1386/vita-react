import * as React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import {useAppApolloClient} from '../api/graphql/client';
import PrivateRoute from './privateRoute';
import {AdminPage, LoginPage} from '../pages';

const Routes: React.FC = () => {
  const client = useAppApolloClient();
  return (
    <ApolloProvider client={client}>
      <div>
        <Router>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/admin">
            <AdminPage />
          </PrivateRoute>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default Routes;
