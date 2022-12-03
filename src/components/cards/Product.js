import React, { useContext } from "react";
import { OpenOverviewModal } from "../../pages/Home";
import useRandomInt from "../../utilities/useRandomInt";

const Product = ({ product }) => {
  const { openModal, setOpenModal, setProduct } = useContext(OpenOverviewModal);

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
        <span
          className="tooltip tooltip-left tooltip-secondary absolute top-6 right-6 shadow rounded-full"
          data-tip="Brief overview"
          onClick={() => {
            setOpenModal(!openModal);
            setProduct(product);
          }}
        >
          <span className="btn btn-sm btn-ghost btn-circle rounded-full">
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
        </span>
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
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Product;
