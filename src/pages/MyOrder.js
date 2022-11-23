import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import OrderSummaryCard from "../components/cards/OrderSummaryCard";
import SecondaryContainer from "../components/container/SecondaryContainer";
import Title from "../components/Title";
import Footer from "../shared/footer/Footer";
import SmallLoading from "../shared/loading/SmallLoading";
import Navbar from "../shared/navbar/Navbar";

const MyOrder = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const changeButton = (
    <button
      className="btn btn-sm btn-outline capitalize"
      onClick={() => navigate("/profile")}
    >
      Change
    </button>
  );

  const products = [
    {
      thumbnail: "/assets/summary/summary3.png",
      name: "Red Nylon Backpack",
      category: "Jacket",
      price: 74,
    },
    {
      thumbnail: "/assets/summary/summary2.png",
      name: "Waffle Knit Beanie",
      category: "Beanie",
      price: 132,
    },
    {
      thumbnail: "/assets/summary/summary1.png",
      name: "Travel Pet Carrier",
      category: "carrier",
      price: 28,
    },
  ];

  return (
    <>
      <Title>Orders</Title>
      <Navbar />
      <SecondaryContainer>
        <div className="text-sm breadcrumbs mb-12">
          <ul>
            <li>Home</li>
            <li>My orders</li>
            <li>Checkout summary</li>
          </ul>
        </div>
        {loading ? (
          <SmallLoading />
        ) : (
          <section className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-20 gap-y-8">
            <div className="flex flex-col gap-y-8">
              <h1 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                Checkout info
              </h1>
              <div className="mt-8 flex flex-col gap-y-12">
                {/* contact info */}
                <div className="flex justify-between py-2 px-4 rounded-lg shadow">
                  <span className="flex gap-x-4">
                    <svg
                      class="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span className="flex flex-col gap-y-1">
                      <span className="text-2xl font-medium">Contact info</span>
                      <span className="font-normal">{user.phone}</span>
                    </span>
                  </span>
                  {changeButton}
                </div>

                {/* shipping address */}
                <div className="flex justify-between py-2 px-4 rounded-lg shadow">
                  <span className="flex gap-x-4">
                    <svg
                      class="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span className="flex flex-col gap-y-1">
                      <span className="text-2xl font-medium">
                        Shipping address
                      </span>
                      <span className="font-normal">
                        {user?.shippingAddress}
                      </span>
                    </span>
                  </span>
                  {changeButton}
                </div>

                {/* user information */}
                <div className="flex flex-col gap-y-4 shadow p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-medium">
                      Information to shipping
                    </h1>
                    {changeButton}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      value={user.name}
                      readOnly
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Phone</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      value={user.phone}
                      readOnly
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Shipping</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      value={user.shippingAddress}
                      readOnly
                    />
                  </div>
                </div>

                {/* payment information */}
                <div className="flex flex-col gap-y-4 shadow p-4 rounded-lg">
                  <h1 className="text-2xl font-medium">Payment method</h1>
                  <div className="mockup-code">
                    <pre
                      data-prefix=">"
                      className="bg-warning text-warning-content"
                    >
                      <code>bKash payment method</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              <h1 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                Order summary
              </h1>
              <div className="grid grid-cols-1 gap-y-4">
                {products.map((product, index) => (
                  <OrderSummaryCard key={index} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </SecondaryContainer>
      <Footer />
    </>
  );
};

export default MyOrder;
