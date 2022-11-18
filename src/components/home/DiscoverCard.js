import React from "react";
import { Link } from "react-router-dom";
import GreyText from "../GreyText";

const DiscoverCard = ({ item }) => {
  return (
    <section
      className="grid grid-cols-2 p-8 mx-2 rounded-xl hover:shadow"
      style={{ backgroundColor: item.backgroundColor }}
    >
      <article className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-4">
          <p className="text-sm font-medium">
            <GreyText>{item.title}</GreyText>
          </p>
          <h2 className="text-2xl font-semibold">{item.header}</h2>
        </div>
        <Link
          to={item.anchor}
          className="bg-white px-6 py-2 w-fit rounded-full shadow"
        >
          Show me all
        </Link>
      </article>
      <img src={item.photo} alt={item.title} />
    </section>
  );
};

export default DiscoverCard;
