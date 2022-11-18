import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "../../components/NavDropdown";
import { ItemContext } from "./Navbar";

const Dropdown = () => {
  const {
    items,
    dropdownState,
    setDropdownState,
    selectDropdownState,
    setSelectDropdownState,
  } = useContext(ItemContext);
  const style = "flex justify-between lg:gap-x-2";
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

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 relative"
      >
        {items.map((item, index) => (
          <li key={index} className="rounded-md">
            <Link
              // to={item.anchor}
              className={style}
              onMouseEnter={() => {
                setDropdownState(true);
                setSelectDropdownState(item.title);
              }}
            >
              {item.title} {arrow}
            </Link>
          </li>
        ))}
        <li className="rounded-md">
          <Link to="/blogs">Blogs</Link>
        </li>
        {dropdownState && <NavDropdown />}
      </ul>
    </div>
  );
};
export default Dropdown;
