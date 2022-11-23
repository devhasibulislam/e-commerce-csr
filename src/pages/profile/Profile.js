import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import SecondaryContainer from "../../components/container/SecondaryContainer";
import ChangePassword from "../../components/profile/ChangePassword";
import DeleteAccount from "../../components/profile/DeleteAccount";
import EditProfile from "../../components/profile/EditProfile";
import Title from "../../components/Title";
import Footer from "../../shared/footer/Footer";
import SmallLoading from "../../shared/loading/SmallLoading";
import Navbar from "../../shared/navbar/Navbar";

const Profile = () => {
  const [tabState, setTabState] = useState("Account info");
  const { user, loading } = useContext(UserContext);

  const tabs = [
    "Account info",
    "My Wishlists",
    "Change password",
    "Change billing",
    "Delete account",
  ];

  return (
    <>
      <Title>Profile</Title>
      <Navbar />
      {loading ? (
        <SmallLoading />
      ) : (
        <SecondaryContainer>
          <div className="flex flex-col gap-y-8">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>Home</li>
                <li>My Profile</li>
                <li>{tabState}</li>
              </ul>
            </div>
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

          {tabState === "Account info" && <EditProfile />}
          {tabState === "My Wishlists" && <>My Wishlists</>}
          {tabState === "Change password" && <ChangePassword />}
          {tabState === "Change billing" && <>Change billing</>}
          {tabState === "Delete account" && <DeleteAccount />}
        </SecondaryContainer>
      )}
      <Footer />
    </>
  );
};

export default Profile;
