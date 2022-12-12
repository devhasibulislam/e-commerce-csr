import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSM from "../../../shared/loading/LoadingSM";
import Button from "../../Button";

const BrandUpdate = ({ brand, refetch }) => {
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);

  const [brandInfo, setBrandInfo] = useState({
    title: brand?.title,
    email: brand?.email,
    website: brand?.website,
    description: brand?.description,
    logo: brand?.logo,
    location: brand?.location,
    status: brand?.status,
  });

  function handleUpdateBrand(event) {
    event.preventDefault();

    const brandInformation = {
      title: brandInfo?.title,
      email: brandInfo?.email,
      website: brandInfo?.website,
      description: brandInfo?.description,
      location: brandInfo?.location,
      logo: brandInfo?.logo,
      status: brandInfo?.status,
    };

    const updateCategory = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/brand/${brand._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(brandInformation),
        }
      );
      const response = await request.json();
      if (response) {
        setLoading(false);
        toast.success(response.description);
        refetch();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    updateCategory();
  }

  function handleBrandLogo(event) {
    const formData = new FormData();
    formData.append("logo", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/brand/logo?public_id=${brand.logo.public_id}`,
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
        setBrandInfo({
          ...brandInfo,
          logo: {
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
    <section>
      <form
        className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
        onSubmit={handleUpdateBrand}
      >
        {/* brand title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand Title</span>
          </label>
          <input
            type="text"
            name="brand"
            value={brandInfo?.title}
            onChange={(e) =>
              setBrandInfo({ ...brandInfo, title: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* brand email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={brandInfo?.email}
            onChange={(e) =>
              setBrandInfo({ ...brandInfo, email: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* brand website */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand Website</span>
          </label>
          <input
            type="url"
            name="url"
            value={brandInfo?.website}
            onChange={(e) =>
              setBrandInfo({ ...brandInfo, website: e.target.value })
            }
            pattern="https://.*"
            size={"30"}
            className="input input-bordered w-full"
          />
        </div>

        {/* brand description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand Description</span>
          </label>
          <textarea
            name="description"
            value={brandInfo?.description}
            onChange={(e) =>
              setBrandInfo({ ...brandInfo, description: e.target.value })
            }
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* brand location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand Location</span>
          </label>
          <input
            type="text"
            name="location"
            value={brandInfo?.location}
            onChange={(e) =>
              setBrandInfo({ ...brandInfo, location: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* category thumbnails */}
        {thumbnailLoading === true ? (
          <div className="w-full">
            <LoadingSM size={8} />
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
                  name="logo"
                  className="file-input file-input-bordered w-full"
                  onChange={handleBrandLogo}
                />
              </>
            )}
          </div>
        )}

        {/* set status */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pick the product's brand</span>
          </label>
          <select
            className="select select-bordered w-full"
            onChange={(e) =>
              setBrandInfo({ ...brandInfo, status: e.target.value })
            }
          >
            <option value={"active"} selected={brandInfo?.status === "active"}>
              Active
            </option>
            <option
              value={"inactive"}
              selected={brandInfo?.status === "inactive"}
            >
              Inactive
            </option>
          </select>
        </div>

        {loading ? <LoadingSM size={8} /> : <Button>Update category</Button>}
      </form>
    </section>
  );
};

export default BrandUpdate;
