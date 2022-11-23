import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src="logo.png" alt="logo" loading="lazy" className="h-[50px] object-cover" />
    </Link>
  );
};

export default Logo;
