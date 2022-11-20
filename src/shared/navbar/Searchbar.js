import React from "react";

const Searchbar = () => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle shadow">
        <div className="indicator">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M22 22L20 20"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-96 bg-base-100 shadow p-4"
      >
        <input
          type="text"
          name="search"
          placeholder="Type product or category name"
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
};

export default Searchbar;
