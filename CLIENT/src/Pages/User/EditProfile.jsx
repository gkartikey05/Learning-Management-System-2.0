import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserDetails, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleUserAvatar(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleFormSubmit (e) {
    e.preventDefault();

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 3) {
      toast.error("Name should have more than 3 characters");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("fullName", data.fullName);

    const newUserData = [data.userId, formData];

    await dispatch(updateProfile(newUserData));
    await dispatch(getUserDetails());
    navigate("/user/profile");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-around rounded-lg p-4 text-white min-w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h2 className="text-center text-2xl font-bold">Edit Profile</h2>

          {/* input for image file */}
          <label className="cursor-pointer" htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            required
            type="file"
            name="image_uploads"
            id="image_uploads"
            onChange={handleUserAvatar}
            className="hidden"
            accept=".jpg, .jpeg, .png, .webp, .mp4"
          />

          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="fullName"
              title="Full Name"
              className="font-semibold text-lg"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                required
                type="text"
                name="fullName"
                id="fullName"
                autoComplete="current-fullName"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-3 bg-transparent px-2 py-2 border outline-none rounded-sm"
                value={data.fullName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Update Profile
          </button>

          <Link to={"/user/profile"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
