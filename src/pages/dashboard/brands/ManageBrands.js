import React, { useState } from "react";
import { toast } from "react-toastify";
import BrandOverview from "../../../components/dashboard/brand/BrandOverview";
import BrandUpdate from "../../../components/dashboard/brand/BrandUpdate";
import Modal from "../../../components/Modal";
import Title from "../../../components/Title";
import useBrands from "../../../hooks/useBrands";
import LoadingSM from "../../../shared/loading/LoadingSM";

const ManageBrands = () => {
  const [loading, setLoading] = useState(false);
  const { brands, loading: brandLoading, refetch } = useBrands();
  const [brand, setBrand] = useState({});
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const tinyLoading = (
    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
  );

  // delete product
  function handleRemoveBrand(id) {
    setLoading(true);
    const removeProduct = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/brand/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
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
    removeProduct();
  }

  return (
    <>
      <Title>Manage Brands</Title>
      {brandLoading ? (
        <LoadingSM size={24} />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Title</th>
                <th>Email</th>
                <th>Website</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands?.map((brand) => (
                <tr key={brand._id} className="hover">
                  <th title={brand._id}>{brand._id.slice(0, 5) + "..."}</th>
                  <td>
                    <img
                      src={brand.logo.url}
                      alt="category logo"
                      className="h-8 w-8 object-cover"
                      loading="lazy"
                    />
                  </td>
                  <td>{brand.title}</td>
                  <td>{brand.email}</td>
                  <td>{brand.website}</td>
                  <td>{brand.location}</td>
                  {loading ? (
                    <td>{tinyLoading}</td>
                  ) : (
                    <td className="flex gap-x-2">
                      {/* overview */}
                      <button
                        className="btn btn-sm btn-circle btn-primary"
                        onClick={() => {
                          setShowOverviewModal(true);
                          setBrand(brand);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>

                      {/* edit */}
                      <button
                        className="btn btn-sm btn-circle btn-secondary"
                        onClick={() => {
                          setShowUpdateModal(true);
                          setBrand(brand);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>

                      {/* delete */}
                      <button
                        className="btn btn-sm btn-circle btn-accent"
                        onClick={() => handleRemoveBrand(brand._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showOverviewModal && (
        <Modal
          showModal={showOverviewModal}
          setShowModal={setShowOverviewModal}
          modalHeader={"Brand Overview"}
          content={<BrandOverview brand={brand} />}
        />
      )}
      {showUpdateModal && (
        <Modal
          showModal={showUpdateModal}
          setShowModal={setShowUpdateModal}
          modalHeader={"Brand Update"}
          content={<BrandUpdate brand={brand} refetch={refetch} />}
        />
      )}
    </>
  );
};

export default ManageBrands;
