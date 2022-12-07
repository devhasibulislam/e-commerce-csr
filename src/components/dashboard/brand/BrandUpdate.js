import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSM from "../../../shared/loading/LoadingSM";
import Button from "../../Button";

const BrandUpdate = ({ brand }) => {
  const [title, setTitle] = useState(brand?.title);
  const [email, setEmail] = useState(brand?.email);
  const [website, setWebsite] = useState(brand?.website);
  const [location, setLocation] = useState(brand?.location);
  const [status, setStatus] = useState(brand?.status);
  const [description, setDescription] = useState(brand?.description);
  const [logo, setLogo] = useState(brand.logo);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);

  function handleUpdateBrand(event) {
    event.preventDefault();

    const categoryInfo = {
      title: title,
      email: email,
      website: website,
      description: description,
      logo: logo,
      location: location,
      status: status,
    };

    const updateCategory = async () => {
      setLoading(true);
      const request = await fetch(`https://e-commerce-ssr.onrender.com/brand/${brand._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(categoryInfo),
      });
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
        setLogo({
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
    <section>
      <form
        className="flex flex-col gap-y-4 w-full"
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full"
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
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={"active"} selected={brand.status === "active"}>
              Active
            </option>
            <option value={"inactive"} selected={brand.status === "inactive"}>
              Inactive
            </option>
          </select>
        </div>

        {loading ? <LoadingSM size={16} /> : <Button>Update category</Button>}
      </form>
    </section>
  );
};

export default BrandUpdate;
