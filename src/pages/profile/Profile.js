import React, { useState } from "react";
import SecondaryContainer from "../../components/container/SecondaryContainer";
import Title from "../../components/Title";
import Footer from "../../shared/footer/Footer";
import Navbar from "../../shared/navbar/Navbar";
import useMyself from "../../utilities/useMyself";

const Profile = () => {
  const [tabState, setTabState] = useState("Account info");
  const [user, loading] = useMyself(localStorage.getItem("accessToken"));

  const tabs = [
    "Account info",
    "Saved lists",
    "Change password",
    "Change billing",
    "Delete account",
  ];

  return (
    <>
      <Title>Profile</Title>
      <Navbar />
      <SecondaryContainer>
        <div className="flex flex-col gap-y-8">
          <h1 className="text-6xl underline font-medium">Account</h1>
          <h2 className="text-5xl">
            Welcome,{" "}
            <span className="text-primary font-serif">{user?.name}</span>
          </h2>
        </div>
        <div className="tabs grid lg:block md:grid-cols-4 grid-cols-3 lg:gap-0 gap-4 my-12">
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={`tab tab-bordered whitespace-nowrap ${
                tabState === tab && "tab-active"
              }`}
              onClick={() => setTabState(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </SecondaryContainer>
      <Footer />
    </>
  );
};

export default Profile;
