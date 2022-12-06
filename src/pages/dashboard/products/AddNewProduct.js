import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import SmallLoading from "../../../shared/loading/SmallLoading";
import TinyLoading from "../../../shared/loading/TinyLoading";
import useBrands from "../../../hooks/useBrands";
import useCategories from "../../../hooks/useCategories";

const AddNewProduct = () => {
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const { categories, isLoading: categoryLoading } = useCategories();
  const { brands, isLoading: brandLoading } = useBrands();

  function handleProductThumbnails(event) {
    const formData = new FormData();
    for (let thumbnail = 0; thumbnail < event.target.files.length; thumbnail++)
      formData.append("thumbnails", event.target.files[thumbnail]);

    const uploadThumbnails = async () => {
      setThumbnailsLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/product/thumbnails`,
        {
          method: "POST",
          body: formData,
        }
      );
      const response = await request.json();
      if (response?.acknowledgement) {
        for (let thumbnail = 0; thumbnail < response?.data?.length; thumbnail++)
          setThumbnails((thumbnails) => [
            ...thumbnails,
            {
              url: response?.data[thumbnail]?.path,
              public_id: response?.data[thumbnail]?.filename,
            },
          ]);
        toast.success(response.description);
        setSuccessfulState(true);
        setThumbnailsLoading(false);
      } else {
        toast.error(response.description);
        setThumbnailsLoading(false);
      }
    };
    uploadThumbnails();
  }

  function handleAddNewProduct(event) {
    event.preventDefault();

    const productInfo = {
      title: event.target.product.value,
      description: event.target.description.value,
      thumbnails: thumbnails,
      price: event.target.price.value,
      category: category,
      brand: brand,
    };

    const insertNewProduct = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/product`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(productInfo),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        event.target.reset();
        toast.success(response.description);
        setLoading(false);
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    insertNewProduct();
  }

  return (
    <>
      <Title>Add New Product</Title>
      {loading ? (
        <SmallLoading />
      ) : (
        <form
          className="flex flex-col gap-y-4 w-full lg:w-3/4"
          onSubmit={handleAddNewProduct}
        >
          {/* product title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Title</span>
            </label>
            <input
              type="text"
              name="product"
              placeholder="Min length 5 & Max length 50"
              className="input input-bordered w-full lg:w-3/4"
            />
          </div>

          {/* product description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Min length 10 & Max length 500"
              className="textarea textarea-bordered w-full lg:w-3/4"
            />
          </div>

          {/* product category */}
          {categoryLoading ? (
            <TinyLoading />
          ) : (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pick the product's category</span>
              </label>
              <select
                className="select select-bordered w-full lg:w-3/4"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled selected>
                  Choose a category
                </option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* product brand */}
          {brandLoading ? (
            <TinyLoading />
          ) : (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pick the product's brand</span>
              </label>
              <select
                className="select select-bordered w-full lg:w-3/4"
                onChange={(e) => setBrand(e.target.value)}
              >
                <option disabled selected>
                  Choose a brand
                </option>
                {brands?.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* product price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Price</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Won't be less than 5"
              className="input input-bordered w-full lg:w-3/4"
            />
          </div>

          {/* product thumbnails */}
          {thumbnailsLoading === true ? (
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
                      <span>
                        Your {thumbnails?.length} thumbnails uploaded
                        successfully!
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <label className="label">
                    <span className="label-text">At most 5 thumbnails </span>
                  </label>
                  <input
                    type="file"
                    name="thumbnails"
                    multiple
                    className="file-input file-input-bordered w-full lg:w-3/4"
                    onChange={handleProductThumbnails}
                  />
                </>
              )}
            </div>
          )}

          <Button>Add new product</Button>
        </form>
      )}
    </>
  );
};

export default AddNewProduct;
