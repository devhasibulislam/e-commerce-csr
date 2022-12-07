import React from "react";
import useProducts from "../../hooks/useProducts";
import SecondaryContainer from "../container/SecondaryContainer";
import GreyText from "../GreyText";
import ProductCarousel from "../ProductCarousel";
import LoadingSM from "../../shared/loading/LoadingSM";

const NewArrival = () => {
  const { products, loading } = useProducts();

  return (
    <SecondaryContainer>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        New Arrivals. <GreyText>REY backpacks & bags</GreyText>
      </h1>
      {loading ? <LoadingSM size={24} /> : <ProductCarousel products={products} />}
    </SecondaryContainer>
  );
};

export default NewArrival;
