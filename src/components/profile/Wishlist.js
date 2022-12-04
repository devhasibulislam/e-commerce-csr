import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SmallLoading from "../../shared/loading/SmallLoading";
import useProducts from "../../utilities/useProducts";
import Product from "../cards/Product";

const Wishlist = () => {
  const { products, loading } = useProducts();
  const [favoriteProductsId, setFavoriteProductsId] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setFavoriteProductsId(localStorage.getItem("favorites"));
    }, 1000);
  }, []);

  const matchedProducts = products?.filter((product) =>
    favoriteProductsId?.includes(product?._id)
  );

  console.log(matchedProducts);

  return (
    <>
      {loading ? (
        <SmallLoading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {matchedProducts?.map((product) => (
            <Product product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Wishlist;
