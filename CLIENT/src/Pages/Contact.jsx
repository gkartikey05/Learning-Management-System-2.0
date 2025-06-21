import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    } else if (
      !userInput.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email id");
      return;
    }

    try {
      const res = axiosInstance.post("/contact", { ...userInput });
      toast.promise(res, {
        loading: "Submitting your message...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to submit the form",
      });

      const response = await res;

      if (response?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[92.4vh] py-8 px-4">
        <form
          noValidate
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-2 sm:gap-4 rounded-lg p-3 text-white w-full max-w-xs sm:max-w-sm shadow-[0_0_10px_black]"
        >
          <h2 className="text-center text-xl sm:text-2xl font-bold">
            Contact Form
          </h2>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="font-semibold text-sm sm:text-base"
            >
              Name
            </label>
            <input
              required
              className="w-full bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-semibold text-sm sm:text-base"
            >
              Email
            </label>
            <input
              required
              className="w-full bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="font-semibold text-sm sm:text-base"
            >
              Message
            </label>
            <textarea
              required
              className="w-full bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm resize-none md:h-40 h-20"
              name="message"
              id="message"
              placeholder="Enter your message"
              value={userInput.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm mt-2 py-2 text-md sm:text-base font-semibold cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
