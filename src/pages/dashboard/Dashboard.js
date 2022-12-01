import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Title from "../../components/Title";

const Dashboard = () => {
  const user = useContext(UserContext);
  const location = useLocation();

  const routes = [
    {
      title: "Add New Product",
      anchor: "/dashboard/add-new-product",
    },
    {
      title: "Manage Product",
      anchor: "/dashboard/manage-products",
    },
    {
      title: "Add New Category",
      anchor: "/dashboard/add-new-category",
    },
    {
      title: "Manage Categories",
      anchor: "/dashboard/manage-categories",
    },
  ];

  return (
    <section>
      <Title>Dashboard</Title>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* dashboard navbar */}
          <div className="w-full navbar fixed bg-white shadow lg:hidden">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              Welcome to dashboard,{" "}
              <span className="text-primary">{user.name}</span>
            </div>
          </div>
          {/* dashboard content */}
          <div className="lg:my-0 my-16 p-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side shadow">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  to={route.anchor}
                  className={location.pathname === route.anchor && "font-bold shadow"}
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
