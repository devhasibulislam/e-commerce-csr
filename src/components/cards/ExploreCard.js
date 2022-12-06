import React from "react";
import { Link } from "react-router-dom";
import GreyText from "../GreyText";

const ExploreCards = ({ category }) => {
  return (
    <section
      className="flex flex-col gap-y-8 bg-white p-12 rounded-2xl hover:shadow bg-right-bottom bg-no-repeat bg-contain"
      style={{ backgroundImage: `url(${category?.backgroundImage})` }}
    >
      <div className="flex justify-between items-center">
        <img
          src={category?.image}
          alt={category?.title}
          loading="lazy"
          className="w-[80px] h-[80px] object-cover rounded-full shadow-xl"
        />
        <span>{category?.productCount} products</span>
      </div>
      <div>
        <GreyText>{category?.title}</GreyText>
        <h2 className="text-2xl font-medium">{category?.header}</h2>
      </div>
      <Link to={category?.anchor} className="flex gap-x-2 items-center">
        See collection{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </section>
  );
};

export default ExploreCards;
