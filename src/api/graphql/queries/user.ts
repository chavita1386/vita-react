import {gql, useQuery} from '@apollo/client';

const userQueryGQL = gql`
  query user {
    user {
      id
      email
      firstName
      lastName
    }
  }
`;

export const useUserQuery = () => useQuery(userQueryGQL);
