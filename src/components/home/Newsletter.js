import React from "react";
import { Link } from "react-router-dom";
import GreyText from "../GreyText";

const Newsletter = () => {
  const facilities = [
    {
      step: <span className="badge badge-primary">01</span>,
      title: "Saving combos",
    },
    {
      step: <span className="badge badge-secondary">02</span>,
      title: "Freeship",
    },
    {
      step: <span className="badge badge-accent">03</span>,
      title: "Premium magazine",
    },
  ];

  return (
    <section
      className="container mx-auto bg-[#f8fafc] py-20 lg:px-20 md:px-10 px-4  rounded-3xl"
      style={{ backgroundImage: "url(/assets/dotted.svg)" }}
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-12 gap-y-8 items-center">
        <div className="flex flex-col gap-y-8">
          <Link to="/">
            <img src="/logo.svg" alt="logo" width="112" loading="lazy" />
          </Link>
          <h1 className="text-7xl font-extrabold">
            Don't miss out on special offers
          </h1>
          <p>
            <GreyText>
              Register to receive news about the latest, savings combos,
              discount codes...
            </GreyText>
          </p>
          <div className="flex flex-col gap-y-2">
            {facilities.map((facility, index) => (
              <p key={index} className="flex items-center gap-x-2">
                {facility.step}
                <span className="text-lg font-medium">{facility.title}</span>
              </p>
            ))}
          </div>
          <div className="flex justify-start gap-x-4">
            <form class="relative lg:w-1/2 w-full">
              <input
                type="email"
                class="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-full text-sm font-normal h-11 px-4 py-3 shadow"
                required=""
                aria-required="true"
                placeholder="Enter your email"
              />
              <button
                class="ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-slate-900 hover:bg-slate-800 text-slate-50 absolute transform top-1/2 -translate-y-1/2 right-1 w-9 h-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <img
          src="/assets/newsletter.png"
          alt="newsletter"
          loading="lazy"
          className="lg:scale-x-[1] scale-x-[-1] shadow rounded-3xl h-[500px] mx-auto object-cover"
        />
      </div>
    </section>
  );
};

export default Newsletter;
