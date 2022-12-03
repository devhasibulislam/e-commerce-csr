import React from "react";
import SmallLoading from "../../shared/loading/SmallLoading";
import useProducts from "../../utilities/useProducts";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import ProductCarousel from "../ProductCarousel";

const BestSelling = () => {
  const { products, loading } = useProducts();

  return (
    <PrimaryContainer>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        Best Sellers. <GreyText>Best selling of the month</GreyText>
      </h1>
      {loading ? <SmallLoading /> : <ProductCarousel products={products} />}
    </PrimaryContainer>
  );
};

export default BestSelling;
