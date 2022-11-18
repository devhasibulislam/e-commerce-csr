import React from "react";

const PrimaryContainer = ({ children }) => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto lg:px-0 px-4">{children}</div>
    </section>
  );
};

export default PrimaryContainer;
