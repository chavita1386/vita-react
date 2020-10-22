import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import styled from 'styled-components';
import {useUserQuery} from '../api/graphql/queries/user';
import {SideBar} from '../components/SideBar';
import {User} from '../domain';
import AdminPlates from './AdminPlates';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 1fr;
  height: 100%;
  background-color: #fbfcfe;
`;

const MainWrapper = styled.main`
  padding: 1rem 1.5rem;
`;

export const UserCtx = React.createContext<User | null>(null);

const AdminIndex = () => {
  return <div>Welcome to Vita rest</div>;
};

const Admin = () => {
  const user = useUserQuery();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user) {
    return <span>Loading...</span>;
  }

  return (
    <UserCtx.Provider value={user}>
      <Wrapper>
        <SideBar />
        <MainWrapper>
          <Route exact path="/admin" component={AdminIndex} />
          <Route path="/admin/plates" component={AdminPlates} />
        </MainWrapper>
      </Wrapper>
    </UserCtx.Provider>
  );
};

export default Admin;
