import React from "react";
import useProducts from "../../hooks/useProducts";
import PrimaryContainer from "../container/PrimaryContainer";
import GreyText from "../GreyText";
import ProductCarousel from "../ProductCarousel";
import LoadingSM from "../../shared/loading/LoadingSM";

const BestSelling = () => {
  const { products, loading } = useProducts();

  return (
    <PrimaryContainer>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        Best Sellers. <GreyText>Best selling of the month</GreyText>
      </h1>
      {loading ? <LoadingSM size={24} /> : <ProductCarousel products={products} />}
    </PrimaryContainer>
  );
};

export default BestSelling;
