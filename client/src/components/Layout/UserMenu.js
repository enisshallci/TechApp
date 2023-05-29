import React from "react";
import { NavLink } from "react-router-dom";
import Wishlist from "../../pages/user/Wishlist";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
          to="/dashboard/user/wishlist"
          className="list-group-item list-group-item-action"
        >
          Wishlist
        </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
