import React, { useState } from "react";
import { toast } from "react-toastify";
import BannerUpdate from "../../../components/dashboard/BannerUpdate";
import Modal from "../../../components/Modal";
import Title from "../../../components/Title";
import SmallLoading from "../../../shared/loading/SmallLoading";
import TinyLoading from "../../../shared/loading/TinyLoading";
import useBanners from "../../../utilities/useBanners";

const ManageBanners = () => {
  const { banners, loading: bannersLoading, refetch } = useBanners();
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  function handleRemoveBanner(id) {
    setLoading(true);
    const removeBanner = async () => {
      const request = await fetch(`https://e-commerce-ssr.onrender.com/banner/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
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
    removeBanner();
  }

  return (
    <section>
      <Title>Manage Banners</Title>
      {bannersLoading ? (
        <SmallLoading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {banners?.map((banner) =>
            loading ? (
              <TinyLoading />
            ) : (
              <div key={banner._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={banner.thumbnail.url}
                    alt={banner.thumbnail.public_id}
                    loading="lazy"
                    className="w-full h-[281px] object-cover object-top"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{banner.title}</h2>
                  <p className="text-gray-500">{banner.description}</p>
                  <div className="flex justify-between items-center">
                    <button className="btn btn-sm btn-success">
                      <span
                        className="tooltip flex gap-x-2 items-center capitalize"
                        data-tip={banner.url}
                      >
                        Explore Now{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <div className="flex gap-x-2">
                      <button
                        className="btn btn-sm btn-circle btn-accent"
                        onClick={() => {
                          setShowEditModal(true);
                          setBanner(banner);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-sm btn-circle btn-error"
                        onClick={() => handleRemoveBanner(banner._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {showEditModal && (
        <Modal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          modalHeader={"Edit Banner"}
          content={<BannerUpdate banner={banner} refetch={refetch} />}
        />
      )}
    </section>
  );
};

export default ManageBanners;
