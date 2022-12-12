import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSM from "../../shared/loading/LoadingSM";
import Button from "../Button";

const BannerUpdate = ({ banner, refetch }) => {
  const [bannerInfo, setBannerInfo] = useState({
    title: banner?.title,
    description: banner?.description,
    url: banner?.url,
    thumbnail: banner?.thumbnail,
  });
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);

  function handleUpdateBanner(event) {
    event.preventDefault();

    const bannerInformation = {
      title: bannerInfo?.title,
      description: bannerInfo?.description,
      url: bannerInfo?.url,
      thumbnail: bannerInfo?.thumbnail,
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
          body: JSON.stringify(bannerInformation),
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
        setBannerInfo({
          ...bannerInfo,
          thumbnail: {
            url: response.data.path,
            public_id: response.data.filename,
          },
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
        className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
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
            value={bannerInfo?.title}
            onChange={(e) =>
              setBannerInfo({ ...bannerInfo, title: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* banner description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Banner Description: {bannerInfo?.description?.length} {"<="} 500
            </span>
          </label>
          <textarea
            name="description"
            value={bannerInfo?.description}
            onChange={(e) =>
              setBannerInfo({ ...bannerInfo, description: e.target.value })
            }
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
            value={bannerInfo?.url}
            onChange={(e) =>
              setBannerInfo({ ...bannerInfo, url: e.target.value })
            }
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

        {loading ? <LoadingSM size={8} /> : <Button>Update banner</Button>}
      </form>
    </>
  );
};

export default BannerUpdate;
