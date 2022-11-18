import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>{children} | Ciseco</title>
      </Helmet>
    </>
  );
};

export default Title;
