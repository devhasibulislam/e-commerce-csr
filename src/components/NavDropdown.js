import React, { useContext } from "react";
import TinyLoading from "../shared/loading/TinyLoading";
import { ItemContext } from "../shared/navbar/Navbar";
import useCategories from "../utilities/useCategories";

const NavDropdown = () => {
  const { categories, loading } = useCategories();

  const { setDropdownState, setSelectDropdownState } = useContext(ItemContext);

  return (
    <section
      className="absolute bg-white w-full lg:mt-4 lg:ml-0 lg:top-full md:top-0 md:mt-0 lg:left-0 md:ml-2 md:left-full top-full mt-2 left-0 rounded-box z-50 shadow-lg border h-30 overflow-y-scroll flex flex-col gap-y-4"
      onMouseLeave={() => {
        setDropdownState(false);
        setSelectDropdownState("");
      }}
    >
      {loading ? (
        <TinyLoading />
      ) : (
        categories?.map((category) => (
          <div
            key={category?._id}
            className="flex flex-row gap-x-2 w-full px-4 py-2 hover:shadow cursor-pointer hover:bg-slate-100"
          >
            <img
              src={category?.thumbnail?.url}
              alt={category?.thumbnail?.public_id}
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
            <article className="flex flex-col gap-y-1">
              <h2 className="font-medium capitalize">{category?.title}</h2>
              <p className="text-gray-500 capitalize text-left" title={category.description}>
                {category.description.slice(0, 30) + "..."}
              </p>
            </article>
          </div>
        ))
      )}
    </section>
  );
};

export default NavDropdown;
