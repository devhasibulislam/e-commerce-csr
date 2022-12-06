import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import NavDropdown from "../../components/NavDropdown";
import useMyself from "../../hooks/useMyself";
import Cart from "./Cart";
import Dropdown from "./Dropdown";
import Searchbar from "./Searchbar";
import User from "./User";

export const ItemContext = React.createContext([]);

const Navbar = () => {
  const [dropdownState, setDropdownState] = useState(false);
  const [selectDropdownState, setSelectDropdownState] = useState("");
  const [user, loading] = useMyself(localStorage?.getItem("accessToken"));

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      class="ml-1 -mr-1 h-4 w-4 text-slate-400"
    >
      <path
        fill-rule="evenodd"
        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );

  const style = "flex justify-between lg:gap-x-2";

  const items = [
    {
      title: "Categories",
      subItems: true,
    },
    {
      title: "Blogs",
      anchor: "/blogs",
      subItems: false,
    },
    {
      title: "Contact us",
      anchor: "/contact-us",
      subItems: false,
    },
  ];

  return (
    <ItemContext.Provider
      value={{
        items,
        dropdownState,
        setDropdownState,
        selectDropdownState,
        setSelectDropdownState,
        user,
        loading,
      }}
    >
      <section className="bg-base-100 shadow fixed w-full z-50">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <Dropdown />
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 relative">
              {items?.map((item, index) => (
                <>
                  <li key={index} className="rounded-md">
                    <Link
                      to={item?.anchor}
                      className={style}
                      onMouseEnter={() => {
                        item.subItems === true && setDropdownState(true);
                        setSelectDropdownState(item.title);
                      }}
                    >
                      {item.title} {item.subItems === true && arrow}
                    </Link>
                  </li>
                  {dropdownState && <NavDropdown />}
                </>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            <div className="flex gap-x-4 items-center">
              <Searchbar />
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
