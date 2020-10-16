import React, { useEffect } from "react";
import styled from "styled-components";
import { useUserQuery } from "../api/graphql/queries/user";
import { SideBar } from "../components/SideBar";
import { User } from "../domain";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 1fr;
  height: 100%;
  background-color: #fbfcfe;
`;

export const UserCtx = React.createContext<User | null>(null);

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
        <main className="main">Content</main>
      </Wrapper>
    </UserCtx.Provider>
  );
};

export default Admin;
