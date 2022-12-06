import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import SmallLoading from "../../shared/loading/SmallLoading";
import useBanners from "../../hooks/useBanners";

const Banner = () => {
  const { banners, loading } = useBanners();

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
      {loading ? (
        <SmallLoading />
      ) : (
        <div className="container mx-auto">
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
            {banners
              ?.map((banner) => (
                <div
                  key={banners?._id}
                  className="grid lg:grid-cols-2 grid-cols-1 items-center justify-items-center lg:gap-x-4 gap-y-4"
                >
                  <article className="flex flex-col lg:items-end items-center text-center gap-y-4">
                    <p className="font-semibold text-2xl">{banner?.title}</p>
                    <h1 className="font-semibold lg:text-7xl md:text-6xl text-3xl lg:text-right text-center">
                      {banner?.description}
                    </h1>
                    <Link
                      to={banner?.url}
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
                    src={banner?.thumbnail?.url}
                    alt={banner?.thumbnail?.public_id}
                    loading="lazy"
                    className="object-cover w-[500px] h-[500px]"
                  />
                </div>
              ))
              .reverse()}
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default Banner;
