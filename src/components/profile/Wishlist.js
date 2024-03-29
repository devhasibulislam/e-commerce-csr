import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import Product from "../cards/Product";
import LoadingSM from "../../shared/loading/LoadingSM";

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

  return (
    <>
      {loading ? (
        <LoadingSM size={24} />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {matchedProducts?.length === 0 ? (
            <div className="alert alert-warning shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Warning: Favorites are empty!!!</span>
              </div>
            </div>
          ) : (
            matchedProducts?.map((product) => <Product product={product} />)
          )}
        </div>
      )}
    </>
  );
};

export default Wishlist;
