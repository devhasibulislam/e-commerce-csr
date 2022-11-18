import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import DiscoverCard from "./DiscoverCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Discover = () => {
  // carousal data
  const items = [
    {
      title: "Explore new arrivals",
      header: "Shop latest from top brands",
      anchor: "/new-arrivals",
      photo: "/assets/discover/discover1.png",
      backgroundColor: "#fefde9",
    },
    {
      title: "Digital gift cards",
      header: "Given the gift of choice",
      anchor: "/gift-cards",
      photo: "/assets/discover/discover2.png",
      backgroundColor: "#fff2f2",
    },
    {
      title: "Sale collection",
      header: "Upto 80% of retail",
      anchor: "/sale-collection",
      photo: "/assets/discover/discover3.png",
      backgroundColor: "#eef6fe",
    },
    {
      title: "Black friday discount coupon",
      header: "Enjoy upto 55% cashback",
      anchor: "/discount-coupon",
      photo: "/assets/discover/discover4.png",
      backgroundColor: "#eefdf4",
    },
  ];

  // carousel configuration
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
        Discover More. <GreyText>Good things are waiting for you</GreyText>
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        className="py-4 gap-x-4 discover_carousel"
      >
        {items.map((item, index) => (
          <DiscoverCard key={index} item={item} />
        ))}
      </Carousel>
    </PrimaryContainer>
  );
};

export default Discover;
