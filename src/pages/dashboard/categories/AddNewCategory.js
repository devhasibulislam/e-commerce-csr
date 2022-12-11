import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import LoadingSM from "../../../shared/loading/LoadingSM";

const AddNewCategory = () => {
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState({});
  const [successfulState, setSuccessfulState] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAddNewCategory(event) {
    event.preventDefault();

    const categoryInfo = {
      title: event.target.category.value,
      description: event.target.description.value,
      thumbnail: thumbnail,
    };

    const insertNewCategory = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/category`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(categoryInfo),
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
    insertNewCategory();
  }

  function handleCategoryThumbnails(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailsLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/category/thumbnail`,
        {
          method: "POST",
          body: formData,
        }
      );
      const response = await request.json();
      if (response?.acknowledgement) {
        setThumbnail({
          url: response?.data?.path,
          public_id: response?.data?.filename,
        });
        toast.success(response.description);
        setSuccessfulState(true);
        setThumbnailsLoading(false);
      } else {
        toast.error(response.description);
        setThumbnailsLoading(false);
      }
    };
    uploadThumbnail();
  }

  return (
    <>
      <Title>Add New Category</Title>
      {loading ? (
        <LoadingSM size={24} />
      ) : (
        <form
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
          onSubmit={handleAddNewCategory}
        >
          {/* category title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Title</span>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Min length 5 & Max length 50"
              className="input input-bordered w-full"
            />
          </div>

          {/* category description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Min length 10 & Max length 250"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* category thumbnail */}
          {thumbnailsLoading === true ? (
            <div className="w-full">
              <LoadingSM size={16} />
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
                      Thumbnail must be {"<="} 1MB
                    </span>
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    className="file-input file-input-bordered w-full"
                    onChange={handleCategoryThumbnails}
                  />
                </>
              )}
            </div>
          )}

          <Button>Add new category</Button>
        </form>
      )}
    </>
  );
};

export default AddNewCategory;
