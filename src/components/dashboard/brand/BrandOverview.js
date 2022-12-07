import React, { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import LoadingSM from "../../../shared/loading/LoadingSM";
// import useSuppliers from "../../../utilities/useSuppliers";

const BrandOverview = ({ brand }) => {
  const [expandState, setExpandState] = useState(true);
  const [expandProductState, setExpandProductState] = useState(true);
  const { products, isLoading: productLoading } = useProducts();
//   const { suppliers, isLoading: supplierLoading } = useSuppliers();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col gap-y-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={brand.logo.url}
                  alt={brand.logo.public_id}
                  loading="lazy"
                  className="h-12"
                />
              </div>
            </div>
            <h1 className="capitalize text-xl font-medium badge badge-primary">
              {brand.title}
            </h1>
          </div>

          {/* description */}
          <div className="flex flex-col gap-y-2">
            <button
              className="flex justify-between gap-x-8 w-full items-center bg-slate-100 rounded-lg text-lg p-2 font-medium"
              onClick={() => setExpandState(!expandState)}
            >
              Description
              {expandState === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-4 h-4 text-slate-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12h-15"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-4 h-4 text-slate-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>
              )}
            </button>
            {expandState && (
              <article className="text-slate-600">{brand.description}</article>
            )}
          </div>
        </div>

        {/* products */}
        <div className="flex flex-col gap-y-4">
          <button
            className="flex justify-between gap-x-8 w-full items-center bg-slate-100 rounded-lg text-lg p-2 font-medium"
            onClick={() => setExpandProductState(!expandProductState)}
          >
            Products
            {expandState === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                class="w-4 h-4 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                class="w-4 h-4 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            )}
          </button>
          <div className="flex flex-col gap-y-4">
            {expandProductState &&
              products?.map((product) =>
                product.brand._id === brand._id ? (
                  productLoading ? (
                    <LoadingSM size={16} />
                  ) : (
                    <div key={product._id}>
                      <div className="flex gap-x-4">
                        <div className="avatar">
                          <div className="w-24 rounded-xl ring ring-secondary ring-offset-base-100 ring-offset-2">
                            <img
                              src={
                                product.thumbnails[
                                  getRandomInt(product.thumbnails.length)
                                ].url
                              }
                              alt={
                                product.thumbnails[
                                  getRandomInt(product.thumbnails.length)
                                ].public_id
                              }
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <h1 className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                            {product.title}
                          </h1>
                          <p className="flex gap-x-4 items-center">
                            <div className="avatar">
                              <div className="w-8 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img
                                  src={product.brand.logo.url}
                                  alt={product.brand.public_id}
                                  loading="lazy"
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <span className="badge badge-accent">
                              {product.brand.title}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
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
                      <span>No products exist!</span>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
        
        {/* supplier */}
        {/* <div className="flex flex-col gap-y-4">
          <button
            className="flex justify-between gap-x-8 w-full items-center bg-slate-100 rounded-lg text-lg p-2 font-medium"
            onClick={() => setExpandProductState(!expandProductState)}
          >
            Products
            {expandState === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                class="w-4 h-4 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                class="w-4 h-4 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            )}
          </button>
          <div className="flex flex-col gap-y-4">
            {expandProductState &&
              products?.map((product) =>
                product.brand._id === brand._id ? (
                  productLoading ? (
                    <LoadingSM size={16} />
                  ) : (
                    <div key={product._id}>
                      <div className="flex gap-x-4">
                        <div className="avatar">
                          <div className="w-24 rounded-xl ring ring-secondary ring-offset-base-100 ring-offset-2">
                            <img
                              src={
                                product.thumbnails[
                                  getRandomInt(product.thumbnails.length)
                                ].url
                              }
                              alt={
                                product.thumbnails[
                                  getRandomInt(product.thumbnails.length)
                                ].public_id
                              }
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <h1 className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                            {product.title}
                          </h1>
                          <p className="flex gap-x-4 items-center">
                            <div className="avatar">
                              <div className="w-8 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img
                                  src={product.brand.logo.url}
                                  alt={product.brand.public_id}
                                  loading="lazy"
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <span className="badge badge-accent">
                              {product.brand.title}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
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
                      <span>No products exist!</span>
                    </div>
                  </div>
                )
              )}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default BrandOverview;
