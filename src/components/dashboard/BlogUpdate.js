import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSM from "../../shared/loading/LoadingSM";
import Button from "../Button";

const BlogUpdate = ({ blog, refetch }) => {
  const [blogInfo, setBlogInfo] = useState({
    name: blog?.name,
    title: blog?.title,
    description: blog?.description,
    thumbnail: blog?.thumbnail,
  });
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successfulState, setSuccessfulState] = useState(false);

  function handleUpdateBlog(event) {
    event.preventDefault();

    const blogInformation = {
      name: blogInfo?.name,
      title: blogInfo?.title,
      description: blogInfo?.description,
      thumbnail: blogInfo?.thumbnail,
    };

    const updateBlog = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/blog/${blog._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(blogInformation),
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
    updateBlog();
  }

  // update thumbnail
  function handleBlogThumbnail(event) {
    const formData = new FormData();
    formData.append("thumbnail", event.target.files[0]);

    const uploadThumbnail = async () => {
      setThumbnailLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/blog/thumbnail?public_id=${blog.thumbnail.public_id}`,
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
        setBlogInfo({
          ...blogInfo,
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
        onSubmit={handleUpdateBlog}
      >
        {/* blog title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Title</span>
          </label>
          <input
            type="text"
            name="name"
            value={blogInfo?.name}
            onChange={(e) => setBlogInfo({ ...blogInfo, name: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        {/* blog title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Title</span>
          </label>
          <input
            type="text"
            name="blog"
            value={blogInfo?.title}
            onChange={(e) =>
              setBlogInfo({ ...blogInfo, title: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* blog description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Blog Description: {blogInfo?.description?.length} {"<="} 500
            </span>
          </label>
          <textarea
            name="description"
            value={blogInfo?.description}
            onChange={(e) =>
              setBlogInfo({ ...blogInfo, description: e.target.value })
            }
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* stock thumbnails */}
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
                  onChange={handleBlogThumbnail}
                />
              </>
            )}
          </div>
        )}

        {loading ? <LoadingSM size={8} /> : <Button>Update blog</Button>}
      </form>
    </>
  );
};

export default BlogUpdate;
