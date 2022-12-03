import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import ExpertCard from "../cards/ExpertCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useProducts from "../../utilities/useProducts";
import SmallLoading from "../../shared/loading/SmallLoading";

const ExpertsChoice = () => {
  const { products, loading } = useProducts();

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
        {loading ? (
          <SmallLoading />
        ) : (
          products?.map((product) => (
            <ExpertCard key={product?._id} product={product} />
          ))
        )}
      </Carousel>
    </PrimaryContainer>
  );
};

export default ExpertsChoice;
