import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import LoadingSM from "../../shared/loading/LoadingSM";
import AccountButton from "./AccountButton";

const AccountMigration = () => {
  const user = useContext(UserContext);
  const [role, setRole] = useState(user?.role);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleAccountMigration(event) {
    event.preventDefault();

    const accountMigration = async () => {
      setLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/update-user?email=${user.email}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ status: "migrate", role: role }),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        setLoading(false);
        toast.warning("Migration successful, please wait for a while.");
        localStorage.removeItem("accessToken");
        navigate(0);
        event.target.reset();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    accountMigration();
  }

  return (
    <section className="grid lg:grid-cols-2 grid-cols-1">
      <form onSubmit={handleAccountMigration}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Choose where to migrate?</span>
          </label>
          <select
            className="select select-bordered"
            onChange={(e) => setRole(e.target.value)}
          >
            <option
              value={"buyer"}
              selected={user.role === "buyer"}
              disabled={user.role === "buyer"}
            >
              Buyer
            </option>
            <option
              value={"seller"}
              selected={user.role === "seller"}
              disabled={user.role === "seller"}
            >
              Seller
            </option>
            <option
              value={"supplier"}
              selected={user.role === "supplier"}
              disabled={user.role === "supplier"}
            >
              Supplier
            </option>
            <option
              value={"deliverer"}
              selected={user.role === "deliverer"}
              disabled={user.role === "deliverer"}
            >
              Deliverer
            </option>
          </select>
        </div>
        {loading ? (
          <LoadingSM size={8} />
        ) : (
          <AccountButton value={"Migrate Account"} />
        )}
      </form>
      <div />
    </section>
  );
};

export default AccountMigration;
