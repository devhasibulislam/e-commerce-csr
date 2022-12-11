import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import useSellers from "../../../hooks/useSellers";
import LoadingSM from "../../../shared/loading/LoadingSM";

const AddNewStore = () => {
  const [seller, setSeller] = useState([]);
  const [loading, setLoading] = useState(false);

  const { sellers, loading: sellersLoading, refetch } = useSellers();

  function handleAddNewStore(event) {
    event.preventDefault();

    const storeInfo = {
      title: event.target.store.value,
      description: event.target.description.value,
      sellers: seller,
    };

    const insertStore = async () => {
      setLoading(true);
      const request = await fetch(`https://e-commerce-ssr.onrender.com/store`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(storeInfo),
      });
      const response = await request.json();
      if (response.acknowledgement) {
        setLoading(false);
        toast.success(response.description);
        refetch();
        event.target.reset();
      } else {
        setLoading(false);
        toast.error(response.description);
      }
    };
    insertStore();
  }

  return (
    <>
      <Title>Add New Store</Title>
      <form
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
        onSubmit={handleAddNewStore}
      >
        {/* Store title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Store Title</span>
          </label>
          <input
            type="text"
            name="store"
            placeholder="Min length 5 & Max length 50"
            className="input input-bordered w-full"
          />
        </div>

        {/* store description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Store Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Min length 10 & Max length 250"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* sellers box */}
        {sellers?.length === 0 ? (
          <div className="alert alert-info shadow-lg w-full">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No seller existing found!</span>
            </div>
          </div>
        ) : sellersLoading ? (
          <LoadingSM size={16} />
        ) : (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pick the seller</span>
            </label>
            <select
              className="select select-bordered w-full"
              onChange={(e) =>
                setSeller((seller) => [...seller, e.target.value])
              }
            >
              <option disabled selected>
                Choose a seller
              </option>
              {sellers?.map((user) =>
                !seller.includes(user._id) ? (
                  <option
                    key={user._id}
                    value={user._id}
                    className="capitalize"
                  >
                    {user.name}
                  </option>
                ) : (
                  <option disabled selected>
                    Selection aborted!
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {loading ? <LoadingSM size={16} /> : <Button>Add store</Button>}
      </form>
    </>
  );
};

export default AddNewStore;
