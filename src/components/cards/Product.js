import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { OpenOverviewModal } from "../../pages/Home";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../utilities/useFavorite";
import useRandomInt from "../../utilities/useRandomInt";

const Product = ({ product }) => {
  const { openModal, setOpenModal, setProduct } = useContext(OpenOverviewModal);
  const [favoritesId, setFavoritesId] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setFavoritesId(localStorage?.getItem("favorites"));
    }, 1000);
  }, []);

  return (
    <section className="lg:p-6 md:p-6 p-2 hover:shadow rounded-xl flex flex-col gap-y-4 relative">
      <div className="flex overflow-x-scroll overflow-y-hidden rounded-xl">
        {product?.thumbnails?.map((thumbnail) => (
          <img
            key={thumbnail?._id}
            src={thumbnail?.url}
            alt={thumbnail?.public_id}
            loading="lazy"
            className="h-[300px] w-full object-cover rounded-xl"
          />
        ))}
        {/* add to favorites */}
        {favoritesId?.includes(product?._id) ? (
          <button
            class="w-9 h-9 flex items-center justify-center rounded-full shadow btn-ghost nc-shadow-lg absolute top-6 right-16 z-10"
            onClick={() => removeFromFavorites(product._id)}
          >
            <span className="tooltip" data-tip="Added to favorites">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-600"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </span>
          </button>
        ) : (
          <button
            class="w-9 h-9 flex items-center justify-center rounded-full shadow btn-ghost nc-shadow-lg absolute top-6 right-16 z-10"
            onClick={() => addToFavorites(product._id)}
          >
            <span className="tooltip" data-tip="Add to favorites">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </button>
        )}
        {/* brief overview */}
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full shadow btn-ghost nc-shadow-lg absolute top-6 right-6 z-10"
          onClick={() => {
            setOpenModal(!openModal);
            setProduct(product);
          }}
        >
          <span className="tooltip" data-tip="Brief Overview">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path
                fillRule="evenodd"
                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="whitespace-nowrap text-ellipsis overflow-hidden font-medium">
          {product?.title}
        </h2>
        <p className="flex items-center gap-x-2">
          Category:{" "}
          <span className="badge badge-outline">
            {product?.category?.title}
          </span>
        </p>
        <p className="flex items-center gap-x-2">
          Rating:{" "}
          <span className="flex text-sm">
            {[...Array(Math.round(useRandomInt(1, 5))).keys()]?.map(
              (rating) => (
                <svg
                  key={rating}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-secondary"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            )}
            ({useRandomInt(100, 990)})
          </span>
        </p>
        <p className="flex justify-between items-center">
          <p class="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
            <span class="text-green-500 !leading-none">
              ${product?.price}.00
            </span>
          </p>
          <span
            className="tooltip tooltip-left tooltip-secondary shadow rounded-full"
            data-tip="Add to cart"
          >
            <span className="btn btn-sm btn-primary btn-circle text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Product;
