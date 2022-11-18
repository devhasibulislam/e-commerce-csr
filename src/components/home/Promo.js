import React from "react";
import { Link } from "react-router-dom";
import GreyText from "../GreyText";

const Promo = () => {
  return (
    <section
      className="container mx-auto bg-[#fefde9] py-20 lg:px-20 md:px-10 px-4  rounded-3xl"
      style={{ backgroundImage: "url(/assets/dotted.svg)" }}
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-12 gap-y-8 items-center">
        <img
          src="/assets/promo.png"
          alt="motivation"
          className="lg:scale-x-[1] scale-x-[-1] shadow rounded-3xl h-[500px] mx-auto object-cover"
        />
        <div className="flex flex-col gap-y-8">
          <Link to="/">
            <img src="/logo.svg" alt="logo" width="112" />
          </Link>
          <h1 className="text-7xl font-extrabold">
            Special offer in kids products
          </h1>
          <p>
            <GreyText>
              Fashion is a form of self-expression and autonomy at a particular
              period and place.
            </GreyText>
          </p>
          <div className="flex justify-start gap-x-4">
            <button className="lg:px-12 lg:py-4 px-6 py-2 rounded-full bg-black text-white text-lg">
              Discover more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
