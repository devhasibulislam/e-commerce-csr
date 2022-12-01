import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductOverview = ({ product }) => {
  const [expandState, setExpandState] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // carousel configuration
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <section className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-4 gap-y-4">
        <div>
          <Carousel
            responsive={responsive}
            infinite={true}
            swipeable={true}
            draggable={true}
            arrows={true}
          >
            {product.thumbnails?.map((thumb) => (
              <img
                src={thumb.url}
                alt={thumb.public_id}
                className="bg-[#e0e2e4] max-w-full object-cover mx-auto rounded-xl h-[352px] w-[352px]"
              />
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <div className="flex justify-between items-center">
              <p class="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                <span class="text-green-500 !leading-none">
                  ${product.price * quantity}.00
                </span>
              </p>
              <span className="badge badge-outline">
                {product.category.title}
              </span>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col justify-between lg:gap-x-4 md:gap-x-4 gap-y-4">
              <div className="flex gap-x-4 justify-center items-center">
                {/* minus */}
                <button
                  class="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                  type="button"
                  disabled={quantity === 1}
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                {/* value */}
                <span class="font-medium">{quantity}</span>
                {/* plus */}
                <button
                  class="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <button class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000">
                <svg
                  class="hidden sm:inline-block w-5 h-5"
                  viewBox="0 0 9 9"
                  fill="none"
                >
                  <path
                    d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span class="ml-3">Add to cart</span>
              </button>
            </div>
          </div>
          {/* description */}
          <div className="flex flex-col gap-y-2">
            <button
              className="flex justify-between w-full items-center bg-slate-100 rounded-lg text-lg p-2 font-medium"
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
              <article className="text-slate-600">
                {product.description}
              </article>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductOverview;
