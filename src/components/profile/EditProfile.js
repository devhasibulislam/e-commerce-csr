import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import SmallLoading from "../../shared/loading/SmallLoading";
import TinyLoading from "../../shared/loading/TinyLoading";
import AccountButton from "./AccountButton";

const EditProfile = () => {
  const { user, loading } = useContext(UserContext);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [dateState, setDateState] = useState("");

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setDOB(user?.dateOfBirth);
    setPhone(user?.phone);
    setAddress(user?.shippingAddress || "Your address");
    setRole(user?.role);
    setStatus(user?.status);

    setDateState(
      new Date(user?.dateOfBirth)?.getUTCDate() +
        "/" +
        (new Date(user?.dateOfBirth)?.getUTCMonth() + 1) +
        "/" +
        new Date(user?.dateOfBirth)?.getUTCFullYear()
    );
  }, [user]);

  // update avatar
  function handleUpdateUserAvatar(event) {
    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);

    const uploadAvatar = async () => {
      setAvatarLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/avatar?filename=${user.avatar.name}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setAvatarLoading(false);
        setAvatar({
          path: response.data.path,
          name: response.data.filename,
        });
      } else {
        toast.error(response.description);
      }
    };
    uploadAvatar();
  }

  function handleUpdateProfileInfo(event) {
    event.preventDefault();

    const userInfo = {
      name: event.target.name.value,
      email: event.target.email.value,
      avatar: avatar === null ? user?.avatar : avatar,
      dateOfBirth: event.target.dob.value,
      phone: event.target.phone.value,
      shippingAddress: event.target.address.value,
      role: event.target.role.value,
      status: event.target.status.value,
    };

    const signupUser = async () => {
      setUserLoading(true);
      const request = await fetch(
        `https://e-commerce-ssr.onrender.com/user/update-user?email=${user?.email}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(userInfo),
        }
      );
      const response = await request.json();
      if (response.acknowledgement) {
        toast.success(response.description);
        setUserLoading(false);
        event.target.reset();
      } else {
        setUserLoading(false);
        toast.error(response.description);
      }
    };
    signupUser();
  }

  return (
    <section className="grid lg:grid-cols-2 grid-cols-1">
      {loading || userLoading ? (
        <SmallLoading />
      ) : (
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleUpdateProfileInfo}
        >
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                readOnly
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* full name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* date of birth */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Your Date of Birth ({dateState})
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </span>
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={(event) => setDOB(event.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Phone</span>
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
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Address</span>
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
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* role */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Role</span>
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
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                readOnly
                className="input input-bordered w-full capitalize"
              />
            </label>
          </div>

          {/* status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Account Status</span>
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
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                readOnly
                className="input input-bordered w-full capitalize"
              />
            </label>
          </div>

          {/* avatar upload field */}
          {avatarLoading ? (
            <TinyLoading />
          ) : avatar === null ? (
            <div className="flex items-center justify-center w-full mt-4">
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
                  onChange={handleUpdateUserAvatar}
                />
              </label>
            </div>
          ) : (
            <div className="flex gap-x-2">
              <img
                src={avatar.path}
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

          <AccountButton value={"Update info"} />
        </form>
      )}
      <div />
    </section>
  );
};

export default EditProfile;
