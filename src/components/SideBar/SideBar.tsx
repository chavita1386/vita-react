import * as React from "react";
import { UserCtx } from "../../pages/AdminPage";
import { Link } from "../shared";
import "./SideBar.scss";
import SideBarProfile from "./SideBarProfile";

const menus = [
  {
    label: "Home",
    imageUrl: "./assets/icons/home.svg",
    to: "/admin",
  },
  {
    label: "Plates",
    imageUrl: "./assets/icons/plate.svg",
    to: "/admin/plates",
  },
  {
    label: "Stews",
    imageUrl: "./assets/icons/stew.svg",
    to: "/admin/stews",
  },
  {
    label: "Ingredients",
    imageUrl: "./assets/icons/ingredient.svg",
    to: "/admin/ingredients",
  },
];

const SideBar = () => {
  return (
    <UserCtx.Consumer>
      {(user) => (
        <div className="sidebar sidebar--admin">
          <div className="sidebar__wrapper">
            <div className="sidebar__header">
              <h2 className="sidebar__title">Vita-Rest</h2>
            </div>
            <div className="sidebar__user">
              <SideBarProfile
                firstName={user?.firstName}
                lastName={user?.lastName}
              />
            </div>
            <div className="sidebar__menu">
              <div className="menu menu--admin">
                {menus.map((menu) => (
                  <div key={menu.to} className="menu__item">
                    <Link
                      to={menu.to}
                      imageUrl={menu.imageUrl}
                      label={menu.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </UserCtx.Consumer>
  );
};

export default SideBar;
