import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "../cards/ReviewCard";
import useReviews from "../../utilities/useReviews";
import SmallLoading from "../../shared/loading/SmallLoading";

const Reviews = () => {
  const { reviews, loading } = useReviews();

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
        <GreyText>Let's see what people think of Canim</GreyText>
      </h1>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        arrows={true}
        infinite={true}
        className="py-4 discover_carousel"
      >
        {loading ? (
          <SmallLoading />
        ) : (
          reviews?.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        )}
      </Carousel>
    </PrimaryContainer>
  );
};

export default Reviews;
