import React, { useContext, useState } from "react";
import Title from "../../components/Title";
import FormLogo from "../../components/profile/FormLogo";
import AccountBanner from "../../components/profile/AccountBanner";
import AccountButton from "../../components/profile/AccountButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TinyLoading from "../../shared/loading/TinyLoading";
import SmallLoading from "../../shared/loading/SmallLoading";
import { UserContext } from "../../App";

const Signup = () => {
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  if (Object.keys(user).length !== 0) navigate("/");

  // upload avatar
  function handleUserAvatar(event) {
    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);

    const uploadAvatar = async () => {
      setAvatarLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/avatar`,
        {
          method: "POST",
          body: formData,
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setAvatarLoading(false);
        setAvatar({
          url: response.data.path,
          name: response.data.filename,
        });
      } else {
        toast.error(response.description);
      }
    };
    uploadAvatar();
  }

  // insert new user
  function handleSignupForm(event) {
    event.preventDefault();
    const phone = event.target.phone.value;

    const userInformation = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      avatar: avatar,
      phone: phone.length === 11 ? "+88" + phone : "+880" + phone,
    };

    const signupUser = async () => {
      setUserLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/sign-up`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInformation),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setUserLoading(false);
        event.target.reset();
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else {
        setUserLoading(false);
        toast.error(response.description);
      }
    };
    signupUser();
  }

  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <Title>Sign up</Title>
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="w-fit mx-auto">
            <FormLogo />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign up as a new user
            </h1>
            <div className="w-full flex-1">
              <div className="mx-auto max-w-xs mt-8">
                {userLoading ? (
                  <SmallLoading />
                ) : (
                  <form
                    className="flex flex-col gap-y-4"
                    onSubmit={handleSignupForm}
                  >
                    {/* name field */}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                    />

                    {/* email field */}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />

                    {/* password field */}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />

                    {/* confirm password field */}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required
                    />

                    {/* phone number field */}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="number"
                      name="phone"
                      placeholder="Phone"
                      required
                    />

                    {/* avatar upload field */}
                    {avatarLoading ? (
                      <TinyLoading />
                    ) : avatar === null ? (
                      <div className="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, JPEG (MAX {"<="} 1MB)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            name="avatar"
                            className="hidden"
                            onChange={handleUserAvatar}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex gap-x-2">
                        <img
                          src={avatar.url}
                          alt={avatar.name}
                          height={70}
                          width={70}
                          className="object-cover rounded shadow"
                        />
                        <p className="text-sm font-medium flex flex-col">
                          {avatar.name.split("/")[1].split("_")[1]}
                          <span className="bg-green-500 w-fit px-2 rounded-xl text-white">
                            Avatar Uploaded
                          </span>
                        </p>
                      </div>
                    )}

                    {/* submit button */}
                    <AccountButton value={"Sign Up"} />
                  </form>
                )}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?
                  <Link
                    to="/sign-in"
                    className="border-b border-gray-500 border-dotted"
                  >
                    {" "}
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AccountBanner />
      </div>
    </section>
  );
};

export default Signup;
