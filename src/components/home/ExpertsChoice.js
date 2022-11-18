import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import ExpertCard from "../cards/ExpertCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ExpertsChoice = () => {
  const choices = [
    {
      title: "Suede Bomber Jacket",
      rating: {
        rates: 4,
        count: 249,
      },
      price: 252,
      about: "Orange",
      images: [
        "/assets/experts/jackets/experts1.png",
        "/assets/experts/jackets/experts2.png",
        "/assets/experts/jackets/experts3.png",
        "/assets/experts/jackets/experts4.png",
      ],
    },
    {
      title: "Downtown Pet Tote",
      rating: {
        rates: 2,
        count: 133,
      },
      price: 749,
      about: "Black & Orange",
      images: [
        "/assets/experts/totes/experts1.png",
        "/assets/experts/totes/experts2.png",
        "/assets/experts/totes/experts3.png",
        "/assets/experts/totes/experts4.png",
      ],
    },
    {
      title: "Cader Lather Sneakers",
      rating: {
        rates: 5,
        count: 1194,
      },
      price: 499,
      about: "Chocolate",
      images: [
        "/assets/experts/sneakers/experts1.png",
        "/assets/experts/sneakers/experts2.png",
        "/assets/experts/sneakers/experts3.png",
        "/assets/experts/sneakers/experts4.png",
      ],
    },
    {
      title: "Suede Bomber Jacket",
      rating: {
        rates: 4,
        count: 249,
      },
      price: 252,
      about: "Orange",
      images: [
        "/assets/experts/jackets/experts1.png",
        "/assets/experts/jackets/experts2.png",
        "/assets/experts/jackets/experts3.png",
        "/assets/experts/jackets/experts4.png",
      ],
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
        Products of the week. <GreyText>Chosen by our experts</GreyText>
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        className="py-4 discover_carousel"
      >
        {choices.map((choice, index) => (
          <ExpertCard key={index} product={choice} />
        ))}
      </Carousel>
    </PrimaryContainer>
  );
};

export default ExpertsChoice;
