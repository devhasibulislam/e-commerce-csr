import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import TinyLoading from "../../../shared/loading/TinyLoading";

const AddNewStock = () => {
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState({});
  const [successfulState, setSuccessfulState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("kg");
  const [status, setStatus] = useState("in-stock");

  function handleAddNewStock(event) {
    event.preventDefault();

    const stockInfo = {
      title: event.target.stock.value,
      description: event.target.description.value,
      unit: unit,
      thumbnail: thumbnail,
      price: event.target.price.value,
      quantity: event.target.quantity.value,
      status: status,
    };

    const addNewStock = async () => {
      setLoading(true);
      const request = await fetch(`https://e-commerce-ssr.onrender.com/stock/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(stockInfo),
      });
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setLoading(false);
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    addNewStock();
  }

  function handleStockThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(`https://e-commerce-ssr.onrender.com/stock/thumbnail`, {
        method: "POST",
        body: formData,
      });
      const response = await request.json();
      if (response?.acknowledgement) {
        setThumbnail({
          url: response?.data?.path,
          public_id: response?.data?.filename,
        });
        toast.success(response.description);
        setSuccessfulState(true);
        setThumbnailLoading(false);
        event.target.reset();
      } else {
        toast.error(response.description);
        setThumbnailLoading(false);
      }
    };
    uploadThumbnail();
  }

  return (
    <>
      <Title>Add New Stock</Title>
      <form
        className="flex flex-col gap-y-4 w-full lg:w-3/4"
        onSubmit={handleAddNewStock}
      >
        {/* stock title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Title</span>
          </label>
          <input
            type="text"
            name="stock"
            placeholder="Min length 5 & Max length 70"
            className="input input-bordered w-full lg:w-3/4"
          />
        </div>

        {/* stock description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Min length 10 & Max length 250"
            className="textarea textarea-bordered w-full lg:w-3/4"
          />
        </div>

        {/* for unit */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Unit</span>
          </label>
          <select
            className="select select-bordered w-full lg:w-3/4"
            onChange={(e) => setUnit(e.target.value)}
          >
            <option disabled selected>
              Select Unit
            </option>
            <option value={"kg"}>KG</option>
            <option value={"litre"}>LITRE</option>
            <option value={"pcs"}>PCS</option>
            <option value={"bag"}>BAG</option>
          </select>
        </div>

        {/* stock thumbnail */}
        {thumbnailLoading === true ? (
          <div className="w-full lg:w-3/4">
            <TinyLoading />
          </div>
        ) : (
          <div className="form-control">
            {successfulState === true ? (
              <>
                <div className="alert alert-success shadow-lg w-full lg:w-3/4 rounded-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Your stock thumbnail uploaded successfully!</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <label className="label">
                  <span className="label-text">
                    Thumbnail must be {"<="} 1MB
                  </span>
                </label>
                <input
                  type="file"
                  name="logo"
                  className="file-input file-input-bordered w-full lg:w-3/4"
                  onChange={handleStockThumbnail}
                />
              </>
            )}
          </div>
        )}

        {/* stock price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Price</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="Won't be less than 5"
            className="input input-bordered w-full lg:w-3/4"
          />
        </div>

        {/* stock quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Quantity</span>
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Won't be negative or 0"
            className="input input-bordered w-full lg:w-3/4"
          />
        </div>

        {/* for status */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Status</span>
          </label>
          <select
            className="select select-bordered w-full lg:w-3/4"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled selected>
              Select Status
            </option>
            <option value={"in-stock"}>In Stock</option>
            <option value={"out-of-stock"}>Out of Stock</option>
            <option value={"discontinued"}>Discontinued</option>
          </select>
        </div>

        {loading ? <TinyLoading /> : <Button>Add new stock</Button>}
      </form>
    </>
  );
};

export default AddNewStock;
