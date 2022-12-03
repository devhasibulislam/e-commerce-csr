import React, { useEffect, useState } from "react";
import useRandomInt from "../../utilities/useRandomInt";
import GreyText from "../GreyText";

const ExpertCard = ({ product }) => {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    setThumbnails(product?.thumbnails);
  }, [product?.thumbnails]);

  return (
    <section className="flex flex-col gap-y-8 p-6 hover:shadow rounded-xl">
      <div className="flex flex-col gap-y-4">
        <img
          src={thumbnails[0]?.url}
          alt={thumbnails[0]?.public_id}
          loading="lazy"
          className="bg-[#eef0f2] rounded-xl mx-auto h-[300px] w-full object-cover"
        />
        <div className="grid grid-cols-3 gap-x-4">
          {thumbnails?.map(
            (thumbnail, index) =>
              index !== 0 && (
                <img
                  key={index}
                  src={thumbnail?.url}
                  alt={thumbnail?.public_id}
                  loading="lazy"
                  className="rounded-xl"
                />
              )
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <h2
            className="text-lg whitespace-nowrap text-ellipsis overflow-hidden font-medium"
            title={product?.title}
          >
            {product?.title}
          </h2>
          <p className="flex lg:flex-row flex-col md:gap-x-4 gap-x-2">
            <span
              className="tooltip tooltip-right"
              data-tip={product?.description}
            >
              <GreyText>{product?.description?.slice(0, 30)}</GreyText>
            </span>
            <span className="flex text-sm">
              {[...Array(Math.round(useRandomInt(1, 5))).keys()]?.map(
                (rete) => (
                  <svg
                    key={rete}
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
              ({useRandomInt(102, 993)})
            </span>
          </p>
        </div>
        <p class="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium w-fit ml-auto">
          <span class="text-green-500 !leading-none">${product?.price}.00</span>
        </p>
      </div>
    </section>
  );
};

export default ExpertCard;
