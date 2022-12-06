import React from "react";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useBrands from "../../hooks/useBrands";
import SmallLoading from "../../shared/loading/SmallLoading";

const Department = () => {
  const { brands, loading } = useBrands();

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
        Bulk sorted by which. <GreyText>Shop by brands</GreyText>
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
          brands?.map((brand) => (
            <div
              key={brand?._id}
              className="flex flex-col gap-y-4 p-6 hover:shadow rounded-xl"
            >
              <img
                src={brand?.logo?.url}
                alt={brand?.logo?.public_id}
                loading="lazy"
                style={{ backgroundColor: "#e0e5fd" }}
                className="h-[300px] w-[336px] object-cover rounded-lg shadow-sm"
              />
              <article className="text-center">
                <h3 className="text-xl font-medium">{brand.title}</h3>
                <GreyText>{brand.email}</GreyText>
                <br />
                <GreyText>{brand.location}</GreyText>
              </article>
            </div>
          ))
        )}
      </Carousel>
    </PrimaryContainer>
  );
};

export default Department;
