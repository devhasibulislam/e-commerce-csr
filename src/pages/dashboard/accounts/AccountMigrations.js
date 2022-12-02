import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Title from "../../../components/Title";

const AccountMigrations = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: users,
    isLoading: usersLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/user/query-users?status=migrate", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const tinyLoading = (
    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
  );

  function handleAccountMigration(email) {
    const accountMigration = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/update-user?email=${email}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ status: "active" }),
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
    accountMigration();
  }

  return (
    <>
      <Title>Account Migrations</Title>
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-y-4">
          <div className="overflow-x-auto">
            {users?.data?.length === 0 ? (
              <div className="alert alert-warning shadow-lg">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>No migration request found!</span>
                </div>
              </div>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data?.map((usr) => (
                    <tr key={usr._id} className="hover">
                      <th title={usr._id}>{usr._id.slice(0, 5) + "..."}</th>
                      <td>
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={usr.avatar.url}
                              alt={usr.avatar.public_id}
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{usr.name}</td>
                      <td>{usr.email}</td>
                      <td>{usr.phone}</td>
                      <td className="capitalize">{usr.role}</td>
                      <td>
                        {usersLoading || loading ? (
                          tinyLoading
                        ) : (
                          <button
                            className="btn btn-sm btn-circle btn-success text-white mr-1"
                            onClick={() => handleAccountMigration(usr.email)}
                          >
                            <span
                              className="tooltip tooltip-left tooltip-success"
                              data-tip="Accept Migration"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountMigrations;
