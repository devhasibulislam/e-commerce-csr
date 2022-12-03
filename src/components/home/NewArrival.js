import React from "react";
import SmallLoading from "../../shared/loading/SmallLoading";
import useProducts from "../../utilities/useProducts";
import SecondaryContainer from "../container/SecondaryContainer";
import GreyText from "../GreyText";
import ProductCarousel from "../ProductCarousel";

const NewArrival = () => {
  const { products, loading } = useProducts();

  return (
    <SecondaryContainer>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold mb-4">
        New Arrivals. <GreyText>REY backpacks & bags</GreyText>
      </h1>
      {loading ? <SmallLoading /> : <ProductCarousel products={products} />}
    </SecondaryContainer>
  );
};

export default NewArrival;
