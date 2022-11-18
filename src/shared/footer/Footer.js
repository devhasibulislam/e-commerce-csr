import React from "react";
import Logo from "../../components/Logo";
import Social from "./Social";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="border-t p-10">
      <footer className="footer container mx-auto">
        <div>
          <Logo />
          <p className="font-medium">
            Ciseco | E-Commerce Ltd.
            <br />
            Providing reliable services since 2021 to {year}
          </p>
        </div>
        <div>
          <span className="font-bold text-lg">Social</span>
          <div className="grid grid-flow-col gap-4">
            <Social />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
