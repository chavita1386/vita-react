import {gql, useQuery} from '@apollo/client';
import { User } from '../../../domain';

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

export const useUserQuery = ():User | null =>  { 
  const queryResult = useQuery(userQueryGQL) 
  if (queryResult?.data) {
    const user:User = {
      id: queryResult.data.user.id,
      email: queryResult.data.user.email,
      firstName: queryResult.data.user.firstName,
      lastName: queryResult.data.user.lastName,
    };
    return user;
  }
  return null; 
} ;
