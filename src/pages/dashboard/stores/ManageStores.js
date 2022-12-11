import React, { useState } from "react";
import { toast } from "react-toastify";
import StoreUpdate from "../../../components/dashboard/StoreUpdate";
import Modal from "../../../components/Modal";
import Title from "../../../components/Title";
import useStores from "../../../hooks/useStores";
import LoadingSM from "../../../shared/loading/LoadingSM";

const ManageStores = () => {
  const [loading, setLoading] = useState(false);
  const { stores, loading: storesLoading, refetch } = useStores();
  const [store, setStore] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const tinyLoading = (
    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
  );

  // delete product
  function handleRemoveStore(id) {
    setLoading(true);
    const removeProduct = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/store/${id}`,
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
      <Title>Manage Stores</Title>
      {storesLoading ? (
        <LoadingSM size={24} />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stores?.map((store) => (
                <tr key={store._id} className="hover">
                  <th title={store._id}>{store._id.slice(0, 5) + "..."}</th>
                  <td>{store.title}</td>
                  <td>
                    <span
                      className="whitespace-normal tooltip tooltip-left"
                      data-tip={store.description}
                    >
                      {store.description.slice(0, 10) + "..."}
                    </span>
                  </td>
                  <td>
                    <select className="select select-sm select-bordered w-full lg:w-3/4">
                      {store?.sellers?.map((seller) => (
                        <option key={seller._id}>{seller.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="capitalize">{store.status}</td>
                  {loading ? (
                    <td>{tinyLoading}</td>
                  ) : (
                    <td className="">
                      {/* edit */}
                      <button
                        className="btn btn-sm btn-circle btn-secondary mr-1"
                        onClick={() => {
                          setShowUpdateModal(true);
                          setStore(store);
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
                        className="btn btn-sm btn-circle btn-accent ml-1"
                        onClick={() => handleRemoveStore(store._id)}
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
      {showUpdateModal && (
        <Modal
          showModal={showUpdateModal}
          setShowModal={setShowUpdateModal}
          modalHeader={"Store Update"}
          content={<StoreUpdate store={store} />}
        />
      )}
    </>
  );
};

export default ManageStores;
