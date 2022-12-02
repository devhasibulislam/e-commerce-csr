import React, { useState } from "react";
import { toast } from "react-toastify";
import Title from "../../../components/Title";
import SmallLoading from "../../../shared/loading/SmallLoading";
import TinyLoading from "../../../shared/loading/TinyLoading";
import useReviews from "../../../utilities/useReviews";

const ManageReviews = () => {
  const { reviews, loading: reviewsLoading, refetch } = useReviews();
  const [loading, setLoading] = useState(false);

  function handleRemoveReview(id) {
    setLoading(true);
    const removeBanner = async () => {
      const request = await fetch(`https://e-commerce-ssr.onrender.com/review/${id}`, {
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
      <Title>Manage Reviews</Title>
      {reviewsLoading ? (
        <SmallLoading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {reviews?.map((review) =>
            loading ? (
              <TinyLoading />
            ) : (
              <div key={review._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={review.avatar.url}
                    alt={review.avatar.public_id}
                    loading="lazy"
                    className="w-full h-[281px] object-cover object-top"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{review.title}</h2>
                  <p className="text-gray-500">{review.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="badge badge-success">{review.designation}</span>
                    <div className="flex gap-x-2">
                      <button
                        className="btn btn-sm btn-circle btn-error"
                        onClick={() => handleRemoveReview(review._id)}
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
    </section>
  );
};

export default ManageReviews;
