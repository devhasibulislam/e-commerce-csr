import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import Cart from "./Cart";
import Dropdown from "./Dropdown";
import User from "./User";

export const ItemContext = React.createContext(<></>);

const Navbar = () => {
  const items = (
    <>
      <li className="rounded-md">
        <Link to="/">Home</Link>
      </li>
      <li className="rounded-md">
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li className="rounded-md">
        <Link to="/categories">Categories</Link>
      </li>
      <li className="rounded-md">
        <Link to="/blogs">Blogs</Link>
      </li>
    </>
  );

  return (
    <ItemContext.Provider value={items}>
      <section className="bg-base-100 shadow fixed w-full z-50">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <Dropdown />
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">{items}</ul>
          </div>
          <div className="navbar-end">
            <div className="flex gap-x-4 items-center">
              <Cart />
              <User />
            </div>
          </div>
        </div>
      </section>
    </ItemContext.Provider>
  );
};

export default Navbar;
