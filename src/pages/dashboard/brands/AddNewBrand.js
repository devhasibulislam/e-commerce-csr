import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import LoadingSM from "../../../shared/loading/LoadingSM";

const AddNewBrand = () => {
  const [thumbnailsLoading, setThumbnailsLoading] = useState(false);
  const [logo, setLogo] = useState({});
  const [successfulState, setSuccessfulState] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAddNewBrand(event) {
    event.preventDefault();

    const brandInfo = {
      title: event.target.brand.value,
      email: event.target.email.value,
      website: event.target.url.value,
      description: event.target.description.value,
      logo: logo,
      location: event.target.location.value,
    };

    const insertNewBrand = async () => {
      setLoading(true);
      const request = await fetch(`https://e-commerce-ssr.onrender.com/brand`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(brandInfo),
      });
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
    insertNewBrand();
  }

  function handleBrandLogo(event) {
    const formData = new FormData();
    formData.append("logo", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailsLoading(true);
      const request = await fetch(`https://e-commerce-ssr.onrender.com/brand/logo`, {
        method: "POST",
        body: formData,
      });
      const response = await request.json();
      if (response?.acknowledgement) {
        setLogo({
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
      <Title>Add New Brand</Title>
      <form
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
        onSubmit={handleAddNewBrand}
      >
        {/* brand title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand Title</span>
          </label>
          <input
            type="text"
            name="brand"
            placeholder="Min length 5 & Max length 50"
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
            placeholder="Provide brand email"
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
            placeholder="Enter an https:// URL:"
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
            placeholder="Min length 10 & Max length 250"
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
            placeholder="Min length 5 & Max length 50"
            className="input input-bordered w-full"
          />
        </div>

        {/* brand logo */}
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
                    <span>Your logo uploaded successfully!</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <label className="label">
                  <span className="label-text">Logo must be {"<="} 1MB</span>
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

        {loading ? <LoadingSM size={16} /> : <Button>Add new brand</Button>}
      </form>
    </>
  );
};

export default AddNewBrand;
