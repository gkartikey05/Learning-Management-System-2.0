import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getUserAvatar(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createUserAccount(e) {
    e.preventDefault();
    if (!signupData.fullName || !signupData.email || !signupData.password) {
      toast.error("Please fill all the details");
      return;
    } else if (signupData.fullName.length < 3) {
      toast.error("Name should be atleast of 3 characters");
      return;
    } else if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email Id");
    } else if (!signupData.password.match(/^(?=.*[a-z]).+$/)) {
      toast.error("Password should have atleast one lowercase");
      return;
    } else if (!signupData.password.match(/^(?=.*[A-Z])/)) {
      toast.error("Password should have atleast one uppercase");
      return;
    } else if (!signupData.password.match(/^(?=.*[0-9])/)) {
      toast.error("Password should have atleast one digit");
      return;
    } else if (!signupData.password.match(/^.{8,}$/)) {
      toast.error("Password should have atleast 8 characters");
      return;
    } else if (
      !signupData.password.match(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/
      )
    ) {
      toast.error("Password should have atleast one special character");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) {
      navigate("/");
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
      });
      setPreviewImage("");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[89vh] py-8 px-4">
        <form
          noValidate
          onSubmit={createUserAccount}
          className="flex flex-col justify-center gap-3 sm:gap-4 rounded-lg p-4 text-white w-full max-w-xs sm:max-w-sm shadow-[0_0_10px_black]"
        >
          <h2 className="text-center text-xl sm:text-2xl font-bold">
            Registration Page
          </h2>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                alt="user avatar"
                title="Avatar"
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle
                title="Avatar"
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full m-auto"
              />
            )}
          </label>
          <input
            type="file"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
            name="image_uploads"
            className="hidden"
            onChange={getUserAvatar}
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullName"
              title="Full Name"
              className="font-semibold text-sm sm:text-base"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
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
                className="w-full pl-8 sm:pl-10 pr-3 bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
                value={signupData.fullName}
                onChange={handleUserInput}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              title="Email"
              className="font-semibold text-sm sm:text-base"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                required
                type="email"
                name="email"
                id="email"
                autoComplete="current-email"
                placeholder="Enter your email"
                className="w-full pl-8 sm:pl-10 pr-3 bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
                value={signupData.email}
                onChange={handleUserInput}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              title="Password"
              className="font-semibold text-sm sm:text-base"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full pl-8 sm:pl-10 pr-8 bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
                value={signupData.password}
                onChange={handleUserInput}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm mt-2 py-2 text-sm sm:text-base font-semibold cursor-pointer"
          >
            Create account
          </button>

          <p className="text-center text-sm sm:text-[16px]">
            Already have an account?{" "}
            <Link to={"/login"} className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
