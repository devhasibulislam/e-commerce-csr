import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "../cards/ReviewCard";

const Reviews = () => {
  // carousel data
  const reviews = [
    {
      user: {
        name: "Tina Abie",
        designation: "Designer",
        avatar: "/assets/review/review1.png",
      },
      detail:
        "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland",
    },
    {
      user: {
        name: "Tina Abie",
        designation: "Designer",
        avatar: "/assets/review/review2.png",
      },
      detail:
        "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland",
    },
    {
      user: {
        name: "Tina Abie",
        designation: "Designer",
        avatar: "/assets/review/review3.png",
      },
      detail:
        "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland",
    },
    {
      user: {
        name: "Tina Abie",
        designation: "Designer",
        avatar: "/assets/review/review4.png",
      },
      detail:
        "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland",
    },
    {
      user: {
        name: "Tina Abie",
        designation: "Designer",
        avatar: "/assets/review/review5.png",
      },
      detail:
        "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland",
    },
    {
      user: {
        name: "Tina Abie",
        designation: "Designer",
        avatar: "/assets/review/review6.png",
      },
      detail:
        "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland",
    },
    {
      user: {
        name: "Tina Abie",
        designation: "Designer",
        avatar: "/assets/review/review7.png",
      },
      detail:
        "Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland",
    },
  ];

  // carousel configure
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
        Good news from far away.{" "}
        <GreyText>Let's see what people think of Ciseco</GreyText>
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        className="py-4 discover_carousel"
      >
        {reviews?.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </Carousel>
    </PrimaryContainer>
  );
};

export default Reviews;
