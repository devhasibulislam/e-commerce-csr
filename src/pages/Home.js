import React from "react";
import Banner from "../components/home/Banner";
import BestSelling from "../components/home/BestSelling";
import Blogs from "../components/home/Blogs";
import Department from "../components/home/Department";
import Discover from "../components/home/Discover";
import ExpertsChoice from "../components/home/ExpertsChoice";
import Motivation from "../components/home/Motivation";
import NewArrival from "../components/home/NewArrival";
import Newsletter from "../components/home/Newsletter";
import Promo from "../components/home/Promo";
import Reviews from "../components/home/Reviews";
import StartExploring from "../components/home/StartExploring";
import Trending from "../components/home/Trending";
import WorkProcedure from "../components/home/WorkProcedure";
import ScrollToTop from "../components/ScrollToTop";
import Title from "../components/Title";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";

const Home = () => {
  return (
    <section id="home">
      <Title>Home</Title>
      <Navbar />
      <Banner />
      <Discover />
      <NewArrival />
      <WorkProcedure />
      <hr className="container mx-auto" />
      <Motivation />
      <StartExploring />
      <BestSelling />
      <Promo />
      <ExpertsChoice />
      <hr className="container mx-auto" />
      <Department />
      <Newsletter />
      <Trending />
      <Blogs />
      <Reviews />
      <Footer />
      <ScrollToTop />
    </section>
  );
};

export default Home;
