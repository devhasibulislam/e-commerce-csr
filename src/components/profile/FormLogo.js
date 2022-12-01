import React from "react";
import { Link } from "react-router-dom";

const FormLogo = () => {
  return (
    <Link to="/">
      <img
        src={"logo.png"}
        height={39}
        width={128}
        loading="lazy"
        alt="E-Commerce Logo"
        title="E-Commerce Logo"
        className="w-32 mx-auto object-cover"
      />
    </Link>
  );
};

export default FormLogo;
