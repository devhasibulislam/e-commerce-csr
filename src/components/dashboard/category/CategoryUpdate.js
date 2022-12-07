import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSM from "../../../shared/loading/LoadingSM";
import Button from "../../Button";

const CategoryUpdate = ({ category }) => {
  const [title, setTitle] = useState(category?.title);
  const [description, setDescription] = useState(category?.description);
  const [thumbnail, setThumbnail] = useState({});
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);

  function handleUpdateCategory(event) {
    event.preventDefault();

    const categoryInfo = {
      title: title,
      description: description,
      thumbnail:
        Object.keys(thumbnail).length === 0 ? category.thumbnail : thumbnail,
    };

    const updateCategory = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/category/${category._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(categoryInfo),
        }
      );
      const response = await request.json();
      if (response) {
        setLoading(false);
        toast.success(response.description);
        event.target.reset();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    updateCategory();
  }

  // update thumbnail
  function handleCategoryThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/category/thumbnail?public_id=${category.thumbnail.public_id}`,
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
        onSubmit={handleUpdateCategory}
      >
        {/* category title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category Title</span>
          </label>
          <input
            type="text"
            name="category"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* category description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Category Description: {description.length} {"<="} 500
            </span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* category thumbnails */}
        {thumbnailLoading === true ? (
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
                    <span>Your thumbnails uploaded successfully!</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <label className="label">
                  <span className="label-text">
                    Thumbnails might be {"<="} 1MB{" "}
                  </span>
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  className="file-input file-input-bordered w-full"
                  onChange={handleCategoryThumbnail}
                />
              </>
            )}
          </div>
        )}

        {loading ? <LoadingSM size={16} /> : <Button>Update category</Button>}
      </form>
    </>
  );
};

export default CategoryUpdate;
