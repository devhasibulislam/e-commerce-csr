import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../../App";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import LoadingSM from "../../../shared/loading/LoadingSM";

const AddNewReview = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function handleAddNewReview(event) {
    event.preventDefault();

    const reviewInfo = {
      name: user.name,
      designation: event.target.designation.value,
      avatar: user.avatar,
      description: event.target.description.value,
    };

    const insertNewReview = async () => {
      const request = await fetch(`https://e-commerce-ssr.onrender.com/review`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(reviewInfo),
      });
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setLoading(false);
        event.target.reset();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    insertNewReview();
  }

  return (
    <section>
      <Title>Add New Review</Title>
      <form
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 bg-base-100 p-4 rounded-2xl shadow lg:mt-0 md:mt-0 mt-40"
        onSubmit={handleAddNewReview}
      >
        {/* reviewer name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Reviewer Name</span>
          </label>
          <input
            type="text"
            name="review"
            value={user.name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* reviewer designation */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Reviewer Designation</span>
          </label>
          <input
            type="text"
            name="designation"
            placeholder="Enter your designation"
            className="input input-bordered w-full"
          />
        </div>

        {/* banner description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Review Description</span>
          </label>
          <textarea
            name="description"
            placeholder="Min length 10 & Min length 50"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {loading ? <LoadingSM size={16} /> : <Button>Add review</Button>}
      </form>
    </section>
  );
};

export default AddNewReview;
