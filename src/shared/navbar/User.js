import React from "react";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://placeimg.com/80/80/people"
            alt="avatar"
            loading="lazy"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className="rounded-md">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile" className="flex justify-between">
            Profile <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <span className="flex justify-start">
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default User;
