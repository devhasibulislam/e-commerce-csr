import React, { useState } from "react";

const OrderSummaryCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="flex justify-between shadow lg:w-2/3 p-4 rounded-lg">
      <div className="flex md:flex-row flex-col gap-x-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-[144px] object-cover bg-[#f1f5f9] rounded-xl shadow-sm"
        />
        <div className="flex flex-col justify-between lg:gap-y-0 md:gap-y-0 gap-y-4">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-medium whitespace-nowrap text-ellipsis overflow-hidden">
              {product.name}
            </h2>
            <p className="badge">{product.category}</p>
          </div>
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
      <div className="flex flex-col justify-between">
        <p className="text-sm badge badge-outline badge-success py-4 px-5 rounded-lg">
          $<span className="text-xl font-medium">{product.price * quantity}</span>
        </p>
        <button className="btn btn-sm btn-outline capitalize">Remove</button>
      </div>
    </section>
  );
};

export default OrderSummaryCard;
