import {gql, useMutation} from '@apollo/client';
import {useAuthToken} from '../../../components/hooks/useAuthToken';

export const loginMutationGQL = gql`
  mutation login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      authToken {
        accessToken
        expiredAt
      }
    }
  }
`;

export const useLoginMutation = () => {
  const [, setAuthToken, removeAuthToken] = useAuthToken();

  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: data => {
      setAuthToken(data.login.authToken.accessToken);
    },
  });

  const login = (email: string, password: string) => {
    removeAuthToken();
    return mutation({
      variables: {
        email,
        password,
      },
    });
  };

  return [login, mutationResults] as const;
};
