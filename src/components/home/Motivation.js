import React from "react";
import { Link } from "react-router-dom";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";

const Motivation = () => {
  return (
    <PrimaryContainer>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-12 gap-y-8">
        <div className="flex flex-col gap-y-8">
          <Link to="/">
            <img src="/logo.svg" alt="logo" width="112" />
          </Link>
          <h1 className="text-7xl font-extrabold">Earn free money with Ciseco</h1>
          <p>
            <GreyText>
              With Ciseco you will get freeship & savings combo...
            </GreyText>
          </p>
          <div className="flex gap-x-4">
            <button className="lg:px-12 lg:py-4 px-6 py-2 rounded-full bg-black text-white text-lg">Saving combo</button>
            <button className="lg:px-12 lg:py-4 px-6 py-2 rounded-full shadow hover:shadow-md">Discover more</button>
          </div>
        </div>
        <img src="/motivation.png" alt="motivation" className="lg:scale-x-[1] scale-x-[-1]" />
      </div>
    </PrimaryContainer>
  );
};

export default Motivation;
