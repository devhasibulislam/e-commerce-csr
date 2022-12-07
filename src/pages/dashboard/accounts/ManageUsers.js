import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../../App";
import Title from "../../../components/Title";
import LoadingSM from "../../../shared/loading/LoadingSM";

const ManageUsers = () => {
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);

  const userRoles = ["admin", "buyer", "seller", "supplier", "deliverer"];

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://e-commerce-ssr.onrender.com/user/query-users?role=${role}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
    refetchInterval: 1000,
  });

  const tinyLoading = (
    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
  );

  // make admin
  function handleMakeAdmin(email) {
    const makeUserAdmin = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/update-user?email=${email}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ role: "admin" }),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setLoading(false);
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    makeUserAdmin();
  }

  // delete user
  function handleRemoveUser(id) {
    setLoading(true);
    const removeProduct = async () => {
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/remove-user?id=${id}`,
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
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    removeProduct();
  }

  return (
    <>
      <Title>Manage Users</Title>
      {usersLoading ? (
        <LoadingSM size={24} />
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="tabs tabs-boxed w-fit">
            {userRoles.map((userRole, index) => (
              <span
                key={index}
                className={`tab capitalize ${
                  role === userRole && "tab-active"
                }`}
                onClick={() => {
                  setRole(userRole);
                }}
              >
                {userRole}
              </span>
            ))}
          </div>
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
                <span>No user found on this role!</span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                        {user.role === usr.role ? (
                          <span className="badge badge-success">Myself</span>
                        ) : loading ? (
                          tinyLoading
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-circle btn-success text-white mr-1"
                              onClick={() => handleMakeAdmin(usr.email)}
                            >
                              <span
                                className="tooltip tooltip-left tooltip-success"
                                data-tip="Make Admin"
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
                            <button
                              className="btn btn-sm btn-circle btn-error text-white ml-1"
                              onClick={() => handleRemoveUser(usr._id)}
                            >
                              <span
                                className="tooltip tooltip-left tooltip-error"
                                data-tip="Remove User"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ManageUsers;
