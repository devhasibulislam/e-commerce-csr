import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSellers from "../../hooks/useSellers";
import Button from "../Button";
import LoadingSM from "../../shared/loading/LoadingSM";

const StoreUpdate = ({ store }) => {
  const [title, setTitle] = useState(store.title);
  const [description, setDescription] = useState(store.description);
  const [status, setStatus] = useState(store.status);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sellers, loading: usersLoading, refetch } = useSellers();

  function handleUpdateStore(event) {
    event.preventDefault();

    const storeInfo = {
      title: title,
      description: description,
      status: status,
      sellers: users,
    };

    const updateSpecificStore = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/store/${store?._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(storeInfo),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setLoading(false);
        refetch();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    updateSpecificStore();
  }

  useEffect(() => {
    const storeSellers = store?.sellers?.map((seller) => seller._id);
    setUsers(storeSellers);
  }, [store?.sellers]);

  return (
    <form
      className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
      onSubmit={handleUpdateStore}
    >
      {/* store title */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Brand Title</span>
        </label>
        <input
          type="text"
          name="brand"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* store description */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Brand Description</span>
        </label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
      </div>

      {/* store sellers */}
      {usersLoading ? (
        <LoadingSM size={16} />
      ) : (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pick the store's sellers</span>
          </label>
          <select
            className="select select-bordered w-full"
            onChange={(e) =>
              setUsers((sellers) => [...sellers, e.target.value])
            }
          >
            {sellers?.map((seller) => (
              <option
                key={seller._id}
                value={seller._id}
                disabled={users.includes(seller._id)}
                className="capitalize"
              >
                {seller.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* set status */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Pick the product's brand</span>
        </label>
        <select
          className="select select-bordered w-full"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={"active"} selected={status === "active"}>
            Active
          </option>
          <option value={"inactive"} selected={status === "inactive"}>
            Inactive
          </option>
        </select>
      </div>

      {loading ? <LoadingSM size={16} /> : <Button>Update store</Button>}
    </form>
  );
};

export default StoreUpdate;
