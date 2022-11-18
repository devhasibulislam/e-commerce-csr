import React from "react";
import Title from "../../components/Title";
import Footer from "../../shared/footer/Footer";
import Navbar from "../../shared/navbar/Navbar";

const Dashboard = () => {
  return (
    <section>
      <Title>Dashboard</Title>
      <Navbar />
      This is Dashboard route
      <Footer />
    </section>
  );
};

export default Dashboard;
