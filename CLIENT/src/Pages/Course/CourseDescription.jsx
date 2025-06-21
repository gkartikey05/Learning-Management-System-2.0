import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[92.4vh] px-4 md:px-15 lg:px-20 flex items-center justify-center text-white">
        <div className="flex flex-col-reverse md:flex-row w-full justify-between flex-wrap gap-5 relative">
          <div className="space-y-5 w-full md:w-[50%] xl:w-[48%]">
            <img
              className="w-full h-40 md:h-50 lg:h-60 xl:h-70"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold text-sm lg:text-base">
                    Total Lectures :{" "}
                  </span>
                  <span className="text-sm lg:text-base">
                    {state.numbersOfLectures}
                  </span>
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold text-sm lg:text-base">
                    Instructor :{" "}
                  </span>
                  <span className="text-sm lg:text-base">
                    {state.createdBy}
                  </span>
                </p>
              </div>

              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/display-lectures", {
                      state: { ...state },
                    })
                  }
                  className="bg-yellow-600 text-base lg:text-lg xl:text-xl rounded-md font-bold px-5 py-2 lg:py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer"
                >
                  Subscribe to Course
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2 w-full md:w-[45%] xl:w-[48%]">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-center md:text-left text-yellow-500 mb-4">
              {state.title}
            </h2>

            <p className="text-yellow-500 lg:text-lg xl:text-xl font-bold">
              Course Description :
            </p>
            <p className="text-sm lg:text-base xl:text-lg">
              {state.description}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
