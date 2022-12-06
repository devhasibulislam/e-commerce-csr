import React, { useState } from "react";
import { toast } from "react-toastify";
import TinyLoading from "../../../shared/loading/TinyLoading";
import useBrands from "../../../hooks/useBrands";
import useCategories from "../../../hooks/useCategories";
import Button from "../../Button";

const ProductUpdate = ({ product }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);
  const [category, setCategory] = useState(product.category._id);
  const [brand, setBrand] = useState(product.brand._id);
  const [loading, setLoading] = useState(false);
  const {categories, isLoading: categoryLoading} = useCategories();
  const {brands, isLoading: brandLoading} = useBrands();

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);

  function handleProductThumbnails(event) {
    const formData = new FormData();
    for (let thumbnail = 0; thumbnail < event.target.files.length; thumbnail++)
      formData.append("thumbnails", event.target.files[thumbnail]);

    const uploadThumbnails = async () => {
      setThumbnailsLoading(true);
      const request = await fetch(`https://e-commerce-ssr.onrender.com/product/thumbnails`, {
        method: "POST",
        body: formData,
      });
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

  function handleUpdateProduct(event) {
    event.preventDefault();

    const productInfo = {
      title: title,
      description: description,
      category: category,
      brand: brand,
      price: price,
      thumbnails: thumbnails.length === 0 ? product.thumbnails : thumbnails,
    };

    const updateProduct = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/product/${product._id}`,
        {
          method: "PATCH",
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
    updateProduct();
  }

  return (
    <>
      <form
        className="flex flex-col gap-y-4 w-full"
        onSubmit={handleUpdateProduct}
      >
        {/* product title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Title</span>
          </label>
          <input
            type="text"
            name="product"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* product description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Product Description: {description.length} {"<="} 500
            </span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
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
              className="select select-bordered w-full"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected>{product.category.title}</option>
              {categories?.map(
                (category) =>
                  product.category.title !== category.title && (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  )
              )}
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
              className="select select-bordered w-full"
              onChange={(e) => setBrand(e.target.value)}
            >
              <option selected>{product.brand.title}</option>
              {brands?.map(
                (brand) =>
                  product.brand.title !== brand.title && (
                    <option key={brand._id} value={brand._id}>
                      {brand.title}
                    </option>
                  )
              )}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* product thumbnails */}
        {thumbnailsLoading === true ? (
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
                  className="file-input file-input-bordered w-full"
                  onChange={handleProductThumbnails}
                />
              </>
            )}
          </div>
        )}

        {loading ? <TinyLoading /> : <Button>Update product</Button>}
      </form>
    </>
  );
};

export default ProductUpdate;
