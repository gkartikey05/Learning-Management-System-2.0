import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse, updateCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
    "Cyber Security",
    "Game Development",
    "AI & Robotics",
    "Blockchain",
    "DevOps",
  ];

  const { initialCourseData } = useLocation().state;
  const [isDisabled, setIsDisabled] = useState(!initialCourseData?.newCourse);

  const [userInput, setUserInput] = useState({
    title: initialCourseData?.title,
    category: initialCourseData?.category,
    createdBy: initialCourseData?.createdBy,
    description: initialCourseData?.description,
    thumbnail: null,
    previewImage: initialCourseData?.thumbnail?.secure_url,
  });

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let res = undefined;

    if (initialCourseData.newCourse) {
      console.log(userInput);
      if (
        !userInput.title ||
        !userInput.category ||
        !userInput.createdBy ||
        !userInput.description ||
        !userInput.thumbnail
      ) {
        toast.error("All fields are mandatory");
        return;
      }

      res = await dispatch(createNewCourse(userInput));
    } else {
      if (
        !userInput.title ||
        !userInput.category ||
        !userInput.createdBy ||
        !userInput.description
      ) {
        toast.error("All fields are mandatory");
        return;
      }

      const data = { ...userInput, id: initialCourseData._id };
      res = await dispatch(updateCourse(data));
    }

    if (res?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: undefined,
        previewImage: "",
      });

      setIsDisabled(false);
      navigate("/admin/dashboard");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center p-4 md:p-0 min-h-[92.4vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-3 md:p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            to={"/admin/dashboard"}
            className="absolute top-5.5 md:top-6 text-xl md:text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h2 className="text-center text-xl md:text-2xl mt-1 md:mt-0 font-bold">
            {!initialCourseData.newCourse ? "Update" : "Create new"}{" "}
            <span>Course</span>
          </h2>

          <main className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-5">
            <div className="space-y-3 md:space-y-6 w-full">
              <div
                onClick={() =>
                  !initialCourseData.newCourse
                    ? toast.error("Cannot update thumbnail image")
                    : ""
                }
              >
                <label className="cursor-pointer" htmlFor="image_uploads">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                      alt="preview image"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h3 className="font-bold text-base md:text-base md:text-lg">
                        Upload your course thumbnail
                      </h3>
                    </div>
                  )}
                </label>
                <input
                  onChange={getImage}
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  disabled={isDisabled}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-base md:text-lg font-semibold"
                  htmlFor="title"
                >
                  Course Title
                </label>
                <input
                  required
                  type="name"
                  name="title"
                  id="title"
                  placeholder="Enter the course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-1 w-full">
              <div className="flex flex-col gap-1">
                <label
                  className="text-base md:text-lg font-semibold"
                  htmlFor="createdBy"
                >
                  Instructor Name
                </label>
                <input
                  required
                  type="name"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructure name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-base md:text-lg font-semibold"
                  htmlFor="category"
                >
                  Course Category
                </label>
                {/* <input
                  required
                  type="name"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                /> */}
                <select
                  required
                  name="category"
                  id="category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                >
                  <option
                    value=""
                    disabled
                    className="bg-gray-900 px-5 py-1 border"
                  >
                    --Select--
                  </option>
                  {categoryOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-gray-900 px-5 py-1 border"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-base md:text-lg font-semibold"
                  htmlFor="description"
                >
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the course description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm mb-1 md:mb-0 py-2 font-semibold text-base md:text-lg cursor-pointer"
            type="submit"
          >
            {!initialCourseData.newCourse ? "Update Course" : "Create Course"}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
