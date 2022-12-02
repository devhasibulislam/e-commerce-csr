import React, { useState } from "react";
import { toast } from "react-toastify";
import TinyLoading from "../../shared/loading/TinyLoading";
import Button from "../Button";

const StockUpdate = ({ stock }) => {
  const [title, setTitle] = useState(stock?.title);
  const [description, setDescription] = useState(stock?.description);
  const [unit, setUnit] = useState(stock?.unit);
  const [price, setPrice] = useState(stock?.price);
  const [quantity, setQuantity] = useState(stock?.quantity);
  const [status, setStatus] = useState(stock?.status);
  const [thumbnail, setThumbnail] = useState({});
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);

  function handleUpdateStock(event) {
    event.preventDefault();

    const stockInfo = {
      title: title,
      description: description,
      unit: unit,
      price: price,
      quantity: quantity,
      status: status,
      thumbnail: thumbnail,
    };

    const stockUpdate = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/stock/${stock._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(stockInfo),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setLoading(false);
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    stockUpdate();
  }

  // update thumbnail
  function handleStockThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/stock/thumbnail?public_id=${stock.thumbnail.public_id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setSuccessfulState(true);
        setThumbnailLoading(false);
        setThumbnail({
          url: response.data.path,
          public_id: response.data.filename,
        });
      } else {
        toast.error(response.description);
        setThumbnailLoading(false);
      }
    };
    uploadThumbnail();
  }

  return (
    <>
      <form
        className="flex flex-col gap-y-4 w-full"
        onSubmit={handleUpdateStock}
      >
        {/* stock title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Title</span>
          </label>
          <input
            type="text"
            name="stock"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* stock description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Stock Description: {description.length} {"<="} 500
            </span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* for unit */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Unit</span>
          </label>
          <select
            className="select select-bordered w-full"
            onChange={(e) => setUnit(e.target.value)}
          >
            <option selected={stock.unit === "kg"} value={"kg"}>
              KG
            </option>
            <option selected={stock.unit === "litre"} value={"litre"}>
              LITRE
            </option>
            <option selected={stock.unit === "pcs"} value={"pcs"}>
              PCS
            </option>
            <option selected={stock.unit === "bag"} value={"bag"}>
              BAG
            </option>
          </select>
        </div>

        {/* stock quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Quantity</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* stock price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Price</span>
          </label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* for status */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Stock Status</span>
          </label>
          <select
            className="select select-bordered w-full"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected={stock.status === "in-stock"} value={"in-stock"}>
              In Stock
            </option>
            <option selected={stock.status === "out-of-stock"} value={"out-of-stock"}>
              Out of Stock
            </option>
            <option selected={stock.status === "discontinued"} value={"discontinued"}>
              Discontinued
            </option>
          </select>
        </div>

        {/* stock thumbnails */}
        {thumbnailLoading === true ? (
          <div className="w-full">
            <TinyLoading />
          </div>
        ) : (
          <div className="form-control">
            {successfulState === true ? (
              <>
                <div className="alert alert-success shadow-lg w-full rounded-lg">
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
                    <span>Your thumbnail uploaded successfully!</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <label className="label">
                  <span className="label-text">
                    Thumbnail might be {"<="} 1MB{" "}
                  </span>
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  className="file-input file-input-bordered w-full"
                  onChange={handleStockThumbnail}
                />
              </>
            )}
          </div>
        )}

        {loading ? <TinyLoading /> : <Button>Update stock</Button>}
      </form>
    </>
  );
};

export default StockUpdate;
