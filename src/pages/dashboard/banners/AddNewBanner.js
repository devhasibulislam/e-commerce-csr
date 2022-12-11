import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import LoadingSM from "../../../shared/loading/LoadingSM";

const AddNewBanner = () => {
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState({});
  const [successfulState, setSuccessfulState] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAddNewBanner(event) {
    event.preventDefault();

    const bannerInfo = {
      title: event.target.banner.value,
      description: event.target.description.value,
      url: event.target.url.value || "https://e-commerce-csr.vercel.app",
      thumbnail: thumbnail,
    };

    const insertNewBanner = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/banner`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(bannerInfo),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setLoading(false);
        event.target.reset();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    insertNewBanner();
  }

  function handleBannerThumbnails(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailsLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/banner/thumbnail`,
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
    <section>
      <Title>Add New Banner</Title>
      <form
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
        onSubmit={handleAddNewBanner}
      >
        {/* banner title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Banner Title</span>
          </label>
          <input
            type="text"
            name="banner"
            placeholder="Min length 5 & Max length 50"
            className="input input-bordered w-full"
          />
        </div>

        {/* banner description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Banner Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Min length 10 & Max length 250"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* banner url */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Banner URL</span>
          </label>
          <input
            type="url"
            name="url"
            placeholder="Enter an https:// URL:"
            pattern="https://.*"
            size={"30"}
            className="input input-bordered w-full"
          />
        </div>

        {/* banner thumbnail */}
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
                  onChange={handleBannerThumbnails}
                />
              </>
            )}
          </div>
        )}

        {loading ? <LoadingSM size={16} /> : <Button>Add new banner</Button>}
      </form>
    </section>
  );
};

export default AddNewBanner;
