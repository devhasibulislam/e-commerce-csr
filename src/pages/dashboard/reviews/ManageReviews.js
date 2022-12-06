import React, { useState } from "react";
import { toast } from "react-toastify";
import Title from "../../../components/Title";
import SmallLoading from "../../../shared/loading/SmallLoading";
import TinyLoading from "../../../shared/loading/TinyLoading";
import useReviews from "../../../hooks/useReviews";

const ManageReviews = () => {
  const { reviews, loading: reviewsLoading, refetch } = useReviews();
  const [loading, setLoading] = useState(false);

  function handleRemoveReview(id) {
    setLoading(true);
    const removeBanner = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/review/${id}`,
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
      <Title>Manage Reviews</Title>
      {reviewsLoading ? (
        <SmallLoading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {reviews?.map((review) =>
            loading ? (
              <TinyLoading />
            ) : (
              <div key={review?._id} class="p-4 w-full relative">
                <div class="h-full bg-gray-100 p-8 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="block w-5 h-5 text-gray-400 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <p class="leading-relaxed mb-6">{review.description}</p>
                  <span class="inline-flex items-center">
                    <img
                      alt={review?.avatar?.public_id}
                      src={review?.avatar?.url}
                      loading="lazy"
                      class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      style={{
                        boxShadow: "-3px -3px 0px 2px rgba(50,123,176,0.75)",
                      }}
                    />
                    <span class="flex-grow flex flex-col pl-4">
                      <span class="title-font font-medium text-gray-900">
                        {review?.name}
                      </span>
                      <span class="text-gray-500 text-sm">
                        {review?.designation}
                      </span>
                    </span>
                  </span>
                </div>
                <span
                  className="absolute btn btn-sm btn-circle text-white top-8 right-8"
                  onClick={() => handleRemoveReview(review?._id)}
                >
                  <span
                    className="tooltip tooltip-left tooltip-error capitalize"
                    data-tip="Remove Review"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default ManageReviews;
