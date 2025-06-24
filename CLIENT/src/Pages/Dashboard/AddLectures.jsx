import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

const AddLectures = () => {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const getVideo = (event) => {
    const video = event.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log(source)
    setUserInput({ ...userInput, videoSrc: source, lecture: video });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const res = await dispatch(addCourseLecture(userInput));
    if (res?.payload?.success) {
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  };

  useEffect(() => {
    if (!courseDetails) {
      navigate(-1);
    }
  }, []);

  return (
    <HomeLayout>
      <div className=" text-white flex flex-col items-center justify-center gap-10 mx-16 min-h-[92.4vh]">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-xl text-green-500"
            >
              <AiOutlineArrowLeft />
            </button>
            <h2 className="text-xl text-yellow-500 font-semibold">
              Add your new lecture
            </h2>
          </header>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={userInput.title}
              onChange={handleInputChange}
              placeholder="Enter the title for lecture"
              className="bg-transparent px-3 py-1 border"
            />

            <textarea
              name="description"
              value={userInput.description}
              onChange={handleInputChange}
              placeholder="Enter the description for lecture"
              className="resize-none overflow-y-scroll h-24 bg-transparent px-3 py-1 border"
            />
            {userInput.videoSrc ? (
              <video
                src={userInput.videoSrc}
                muted
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>
            ) : (
              <div>
                <label
                  htmlFor="lecture"
                  className="flex justify-center items-center h-48 mx-auto border w-full font-semibold text-xl cursor-pointer"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  name="lecture"
                  id="lecture"
                  onChange={getVideo}
                  accept="video/mp4,video/x-m4v,video/*, .mp4"
                  className="hidden"
                />
              </div>
            )}

            <button className="btn btn-success font-semibold text-lg">
              Add Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLectures;
