import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const Banner = () => {
  // carousel data
  const items = [
    {
      title: "In this season, find the best 🔥",
      header: "Exclusive collection for everyone",
      anchor: "/categories/men",
      photo: "/assets/banner/slider1.png",
    },
    {
      title: "In this season, find the best 🔥",
      header: "Exclusive collection for everyone",
      anchor: "/categories/women",
      photo: "/assets/banner/slider2.png",
    }
  ];

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
    <section
      className="py-20 bg-[#deffe7] bg-contain bg-left-top"
      style={{ backgroundImage: "url(/assets/banner/slider_bg.svg)" }}
    >
      <Carousel
        responsive={responsive}
        infinite={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="grid lg:grid-cols-2 grid-cols-1 items-center justify-items-center lg:gap-x-4 gap-y-4"
          >
            <article className="flex flex-col lg:items-end items-center gap-y-4">
              <p className="font-semibold text-2xl">{item.title}</p>
              <h1 className="font-semibold lg:text-7xl md:text-6xl text-3xl lg:text-right text-center">
                {item.header}
              </h1>
              <Link
                to={item.anchor}
                className="w-fit bg-[#0f1629] px-8 py-4 text-white text-lg rounded-full flex items-center gap-x-2"
              >
                Explore now{" "}
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </Link>
            </article>
            <img
              src={item.photo}
              alt={`slider${index + 1}`}
              height="500"
              width="500"
              className="object-contain"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
