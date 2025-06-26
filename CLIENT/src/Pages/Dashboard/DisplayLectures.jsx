import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/Slices/LectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLecture(state._id));
  };

  useEffect(() => {
    (async () => {
      if (!state) navigate("/courses");
      await dispatch(getCourseLecture(state._id));
    })();
  }, [dispatch, navigate, state]);
  return (
    <Layout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[92.4vh] py-10 text-white mx-[5%]">
        <h2 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {state?.title}
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-10 w-full">
          <div className="space-y-5 md:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
              <h3>
                <span className="text-yellow-500">Title : </span>
                {lectures && lectures[currentVideo]?.title}
              </h3>
              <p>
                {" "}
                <span className="text-yellow-500">Description : </span>
                {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          <ul className="md:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/add-lecture", {
                      state: { ...state },
                    })
                  }
                  className="btn btn-warning btn-sm rounded-md"
                >
                  Add New Lecture
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((lecture, index) => {
                return (
                  <li className="relative space-y-0.5" key={lecture._id}>
                    <p
                      className="cursor-pointer"
                      onClick={() => setCurrentVideo(index)}
                    >
                      <span className="text-yellow-500">
                        {" "}
                        Lecture {index + 1} :{" "}
                      </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleLectureDelete(state?._id, lecture?._id)
                        }
                        className="absolute right-0 top-0 btn btn-error btn-xs rounded-md"
                      >
                        Delete Lecture
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DisplayLectures;
