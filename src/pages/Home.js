import React, { useState } from "react";
import ProductOverview from "../components/dashboard/product/ProductOverview";
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
import Modal from "../components/Modal";
import ScrollToTop from "../components/ScrollToTop";
import Title from "../components/Title";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";

// context API
export const OpenOverviewModal = React.createContext(false);

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState({});

  return (
    <>
      <OpenOverviewModal.Provider
        value={{ openModal, setOpenModal, setProduct }}
      >
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
      </OpenOverviewModal.Provider>

      {openModal && (
        <Modal
          showModal={openModal}
          setShowModal={setOpenModal}
          modalHeader={"Product Overview"}
          content={<ProductOverview product={product} />}
        />
      )}
    </>
  );
};

export default Home;
