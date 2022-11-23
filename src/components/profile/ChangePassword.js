import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import SmallLoading from "../../shared/loading/SmallLoading";
import AccountButton from "./AccountButton";

const ChangePassword = () => {
  const [successfulState, setSuccessfulState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, loading: userLoading } = useContext(UserContext);

  function handleChangePassword(event) {
    event.preventDefault();

    const userInformation = {
      email: user.email,
      password: newPassword,
    };

    const resetPassword = async () => {
      setLoading(true);
      const request = await fetch(
        `http://localhost:8080/user/reset-password`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInformation),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setLoading(false);
        setSuccessfulState(true);
        event.target.reset();
      } else {
        toast.error(response.description);
        setLoading(false);
      }
    };
    resetPassword();
  }

  return (
    <section className="grid lg:grid-cols-2 grid-cols-1">
      <>
        {userLoading || loading ? (
          <SmallLoading />
        ) : (
          successfulState === false && (
            <>
              <form
                className="flex flex-col gap-y-4"
                onSubmit={handleChangePassword}
              >
                {/* old password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Current password</span>
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
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="name"
                      className="input input-bordered w-full"
                      placeholder="Enter your current password"
                    />
                  </label>
                </div>

                {/* new password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New password</span>
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
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="name"
                      className="input input-bordered w-full"
                      placeholder="Enter your new password"
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                  </label>
                </div>

                {/* confirm password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm password</span>
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
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      name="name"
                      className={`input input-bordered w-full ${
                        confirmPassword !== "" &&
                        newPassword !== confirmPassword &&
                        "border-red-500"
                      }`}
                      placeholder="Retype your new password"
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                  </label>
                </div>

                <AccountButton value={"Change Password"} />
              </form>
            </>
          )
        )}
        {successfulState && (
          <div className="alert alert-success shadow-lg mt-4 rounded-lg">
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
              We've sent a token to <span className="badge">{user.email}</span>{" "}
              with 1 day validation.
            </div>
          </div>
        )}
      </>
      <div />
    </section>
  );
};

export default ChangePassword;

/**
 * Javascript regular expression password validation having special characters
 * https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
 * /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/
 */
