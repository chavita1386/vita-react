import React, {useEffect} from 'react';
import {useUserQuery} from '../api/graphql/queries/user';
import {useLogout} from '../components/hooks/useAuthToken';

const Admin = () => {
  const user = useUserQuery();
  const logout = useLogout();

  useEffect(() => {
    console.log(user.data);
  }, [user]);

  if (!user.data) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      Welcome to {user.data.user.firstName}{' '}
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

export default Admin;
