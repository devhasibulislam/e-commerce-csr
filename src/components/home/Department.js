import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Department = () => {
  // carousel data
  const departments = [
    {
      title: "Travel Kit",
      categoryCount: 20,
      image: "/assets/department/department1.png",
      backgroundColor: "#e0e6fe",
    },
    {
      title: "Beauty Products",
      categoryCount: 10,
      image: "/assets/department/department2.png",
      backgroundColor: "#d8dce0",
    },
    {
      title: "Sports Kit",
      categoryCount: 34,
      image: "/assets/department/department3.png",
      backgroundColor: "#cee0eb",
    },
    {
      title: "Pets Food",
      categoryCount: 12,
      image: "/assets/department/department4.png",
      backgroundColor: "#ffeed7",
    },
    {
      title: "Travel Kit",
      categoryCount: 20,
      image: "/assets/department/department1.png",
      backgroundColor: "#e0e6fe",
    },
  ];

  // carousel configuration
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <PrimaryContainer>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        Sort by dept. <GreyText>Shop by department</GreyText>
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        className="py-4 discover_carousel"
      >
        {departments.map((department, index) => (
          <div key={index} className="flex flex-col gap-y-4 p-6 hover:shadow rounded-xl">
            <img
              src={department.image}
              alt={department.title}
              loading="lazy"
              style={{ backgroundColor: department.backgroundColor }}
              className="h-[300px] w-full object-contain rounded-lg"
            />
            <article className="text-center">
              <h3 className="text-xl font-medium">{department.title}</h3>
              <GreyText>{department.categoryCount}+ categories</GreyText>
            </article>
          </div>
        ))}
      </Carousel>
    </PrimaryContainer>
  );
};

export default Department;
