import * as React from "react";
import styled from "styled-components";
import { useLogout } from "../hooks/useAuthToken";
import Badge from "../shared/Badge/Badge";

const LinkButton = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  firstName?: string;
  lastName?: string;
}
const SideBarProfile: React.FunctionComponent<Props> = (props) => {
  const { firstName, lastName } = props;
  const logout = useLogout();
  return (
    <div className="user-profile">
      <div className="user-profile__info">
        <img className="icon c-gray-2" src="./assets/icons/user.svg" alt="" />
        <div className="user-profile__personal">
          <div className="user-profile__name">{`${firstName} ${lastName}`}</div>
          <Badge type="primary" label="ADMIN" />
        </div>
      </div>
      <div className="user-profile__arrow">
        <LinkButton className="fas fa-sign-out-alt" onClick={() => logout()} />
      </div>
    </div>
  );
};

export default SideBarProfile;
