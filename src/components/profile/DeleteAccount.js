import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import SmallLoading from "../../shared/loading/SmallLoading";
import AccountButton from "./AccountButton";

const DeleteAccount = () => {
  const [removeStatement, setRemoveStatement] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function handleRemoveAccount(event) {
    event.preventDefault();

    const deleteUser = async () => {
      setLoading(true);
      const request = await fetch(
        `http://localhost:8080/user/remove-user?id=${user._id}`,
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
        navigate("/");
        event.target.reset();
      } else {
        toast.error(response.description);
      }
    };
    deleteUser();
  }

  return (
    <section className="grid lg:grid-cols-2 grid-cols-1">
      <div className="flex flex-col gap-y-4">
        {loading ? (
          <SmallLoading />
        ) : (
          <form onSubmit={handleRemoveAccount}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Type <span className="badge">Remove Me</span> to delete
                  account
                </span>
              </label>
              <label className="input-group">
                <span>
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
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  name="email"
                  className={`input input-bordered w-full ${
                    removeStatement !== "" &&
                    removeStatement !== "Remove Me" &&
                    "border-red-500"
                  }`}
                  placeholder="Type 'Remove Me' to delete account"
                  onChange={(event) => setRemoveStatement(event.target.value)}
                />
              </label>
            </div>
            {removeStatement === "Remove Me" && (
              <AccountButton value={"Delete Account"} />
            )}
          </form>
        )}
      </div>
      <div />
    </section>
  );
};

export default DeleteAccount;
