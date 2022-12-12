import React, { useState } from "react";
import { toast } from "react-toastify";
import BlogUpdate from "../../../components/dashboard/BlogUpdate";
import Modal from "../../../components/Modal";
import Title from "../../../components/Title";
import useBlogs from "../../../hooks/useBlogs";
import LoadingSM from "../../../shared/loading/LoadingSM";

const ManageBlogs = () => {
  const { blogs, loading: blogsLoading, refetch } = useBlogs();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  function handleRemoveBanner(id) {
    setLoading(true);
    const removeBanner = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/blog/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
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
    removeBanner();
  }

  return (
    <section>
      <Title>Manage Blogs</Title>
      {blogsLoading ? (
        <LoadingSM size={24} />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {blogs?.map((blog) =>
            loading ? (
              <LoadingSM size={16} />
            ) : (
              <div key={blog._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={blog.thumbnail.url}
                    alt={blog.thumbnail.public_id}
                    loading="lazy"
                    className="w-full h-[281px] object-cover object-top"
                  />
                </figure>
                <div className="card-body">
                  <p className="card-title text-sm badge badge-primary text-white">
                    {blog.name}
                  </p>
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="text-gray-500 h-20 overflow-x-hidden overflow-y-scroll" title={blog.description}>{blog.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-2">
                      <button
                        className="btn btn-sm btn-circle btn-accent"
                        onClick={() => {
                          setShowEditModal(true);
                          setBlog(blog);
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
                        onClick={() => handleRemoveBanner(blog._id)}
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
          modalHeader={"Edit Blog"}
          content={<BlogUpdate blog={blog} refetch={refetch} />}
        />
      )}
    </section>
  );
};

export default ManageBlogs;
