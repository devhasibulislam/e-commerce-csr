import React, { useState } from "react";

const OrderSummaryCard = ({ product }) => {
  const [quantity, setQuantity] = useState(product?.quantity);

  return (
    <section className="shadow p-4 rounded-xl flex lg:flex-row md:flex-row flex-col lg:gap-x-0 md:gap-x-0 gap-y-4">
      {/* card left */}
      <div className="flex lg:flex-row md:flex-row flex-col lg:gap-x-4 md:gap-x-4 gap-y-4">
        {/* card thumbnail */}
        <img
          src={product?.thumbnails[0]?.url}
          alt={product?.thumbnails[0]?.public_id}
          className="h-36 object-cover bg-[#f1f5f9] rounded-xl shadow-sm"
        />
        <div className="flex flex-col justify-between lg:gap-y-0 md:gap-y-0 gap-y-4">
          {/* card upper portion */}
          <div>
            {/* card title */}
            <h2
              className="text-lg font-medium whitespace-nowrap text-ellipsis overflow-hidden lg:w-1/2 md:w-3/4 w-full"
              title={product?.title}
            >
              {product?.title}
            </h2>
            {/* card category */}
            <p className="badge">{product?.category?.title}</p>
          </div>
          {/* card lower portion */}
          <div className="flex gap-x-4 items-center">
            {/* minus */}
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
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
              class="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
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
        </div>
      </div>

      {/* card right */}
      <div className="flex lg:flex-col md:flex-col flex-row justify-between">
        <div class="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
          <span class="text-green-500 !leading-none">
            ${product.price * quantity}.00
          </span>
        </div>
        <button className="btn btn-sm btn-outline btn-error capitalize">Remove</button>
      </div>
    </section>
  );
};

export default OrderSummaryCard;
