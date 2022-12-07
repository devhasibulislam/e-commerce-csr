import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSM from "../../shared/loading/LoadingSM";
import Button from "../Button";

const BannerUpdate = ({ banner, refetch }) => {
  const [title, setTitle] = useState(banner?.title);
  const [description, setDescription] = useState(banner?.description);
  const [url, setURL] = useState(banner?.url);
  const [thumbnail, setThumbnail] = useState(banner.thumbnail);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);

  function handleUpdateBanner(event) {
    event.preventDefault();

    const bannerInfo = {
      title: title,
      description: description,
      url: url,
      thumbnail: thumbnail,
    };

    const updateBanner = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/banner/${banner._id}`,
        {
          method: "PATCH",
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
        refetch();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    updateBanner();
  }

  // update thumbnail
  function handleBannerThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/banner/thumbnail?public_id=${banner.thumbnail.public_id}`,
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
        onSubmit={handleUpdateBanner}
      >
        {/* banner title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Banner Title</span>
          </label>
          <input
            type="text"
            name="banner"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* banner description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Banner Description: {description.length} {"<="} 500
            </span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* banner website */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand Website</span>
          </label>
          <input
            type="url"
            name="url"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            pattern="https://.*"
            size={"30"}
            className="input input-bordered w-full"
          />
        </div>

        {/* stock thumbnails */}
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
                  onChange={handleBannerThumbnail}
                />
              </>
            )}
          </div>
        )}

        {loading ? <LoadingSM size={16} /> : <Button>Update banner</Button>}
      </form>
    </>
  );
};

export default BannerUpdate;
