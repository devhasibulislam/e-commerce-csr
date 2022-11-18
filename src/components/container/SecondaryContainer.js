import React from "react";

const SecondaryContainer = ({ children }) => {
  return (
    <section className="py-20 bg-[#f6f9fc]">
      <div className="container mx-auto lg:px-0 px-4">{children}</div>
    </section>
  );
};

export default SecondaryContainer;
