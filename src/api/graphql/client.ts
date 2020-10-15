import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client';
import {useAuthToken} from '../../components/hooks/useAuthToken';

const httpLink = new HttpLink({uri: 'https://api.chavita.info/query'});

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
  const [authToken] = useAuthToken();
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  });
};
