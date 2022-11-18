import React, { useContext } from "react";
import { ItemContext } from "../shared/navbar/Navbar";

const NavDropdown = () => {
  const {
    setDropdownState,
    selectDropdownState: category,
    setSelectDropdownState,
  } = useContext(ItemContext);

  return (
    <section
      className="absolute bg-white w-full lg:mt-4 lg:ml-0 lg:top-full md:top-0 md:mt-0 lg:left-0 md:ml-2 md:left-full top-full mt-2 left-0 p-6 rounded-box z-50"
      onMouseLeave={() => {
        setDropdownState(false);
        setSelectDropdownState("");
      }}
    >
      You are choosing {category} category
    </section>
  );
};

export default NavDropdown;
