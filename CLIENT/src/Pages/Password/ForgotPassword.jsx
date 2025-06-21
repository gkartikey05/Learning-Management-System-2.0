import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { forgotPassword } from "../../Redux/Slices/AuthSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("All fields are required");
      return;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email Id");
      return;
    }

    const response = await dispatch(forgotPassword(email));
    if (response?.payload?.success) {
      setEmail("");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[92.4vh] py-8 px-4">
        <form
          noValidate
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-3 sm:gap-4 rounded-lg p-4 text-white w-full max-w-xs sm:max-w-sm shadow-[0_0_10px_black]"
        >
          <h2 className="text-center text-xl sm:text-2xl font-bold">
            Forgot Password
          </h2>

          <p className="text-justify text-sm sm:text-base">
            Enter your registered email, we will send you a verification link on
            your registered email from which you can reset your password
          </p>

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
              placeholder="Enter your registered email"
              className="w-full pl-8 sm:pl-10 pr-3 bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-base sm:text-lg cursor-pointer"
            type="submit"
          >
            Get Verification Link
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

export default ForgotPassword;
