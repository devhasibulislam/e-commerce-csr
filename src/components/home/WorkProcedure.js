import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";

const WorkProcedure = () => {
  const procedures = [
    {
      title: "Step 1",
      header: "Filter & Discover",
      body: "Smart filtering and suggestions make it easy to find",
      image: "/assets/procedure/procedure1.png",
    },
    {
      title: "Step 2",
      header: "Add to bag",
      body: "Easily select the correct items and add them to the cart",
      image: "/assets/procedure/procedure2.png",
    },
    {
      title: "Step 3",
      header: "Fast shipping",
      body: "The carrier will confirm and ship quickly to you",
      image: "/assets/procedure/procedure3.png",
    },
    {
      title: "Step 4",
      header: "Enjoy the product",
      body: "Have fun and enjoy your 5-star quality products",
      image: "/assets/procedure/procedure4.png",
    },
  ];

  return (
    <PrimaryContainer>
      <div
        className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 bg-no-repeat bg-contain gap-20 bg-right-top"
        style={{ backgroundImage: "url(/assets/procedure/procedure_bg.svg)" }}
      >
        {procedures?.map((procedure, index) => (
          <div key={index} className="shadow-sm hover:shadow hover:bg-white p-6 rounded-lg flex flex-col gap-y-4">
            <img
              src={procedure.image}
              alt={procedure.title}
              loading="lazy"
              className="h-[140px] w-[140px] object-cover mx-auto"
            />
            <article className="flex flex-col gap-y-4 items-center">
              <p className="badge badge-primary text-white">
                {procedure.title}
              </p>
              <h2 className=" text-xl font-semibold">{procedure.header}</h2>
              <p className="text-center">{procedure.body}</p>
            </article>
          </div>
        ))}
      </div>
    </PrimaryContainer>
  );
};

export default WorkProcedure;
