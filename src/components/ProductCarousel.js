import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./cards/Product";

const ProductCarousel = ({ products }) => {
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
    <Carousel
      responsive={responsive}
      swipeable={true}
      draggable={true}
      arrows={true}
      infinite={true}
      className="py-4 discover_carousel"
    >
      {products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
