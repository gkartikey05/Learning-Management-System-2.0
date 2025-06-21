import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="text-white w-[20rem] min-h-[24rem] md:min-h-[25rem] lg:w-[17rem] lg:min-h-[26rem] xl:w-[23rem] xl:min-h-[25rem] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg  group-hover:scale-[1.1]  transition-all ease-in-out duration-300 "
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>

      <div className="p-3 space-y-1 text-white">
        <h2 className="text-lg md:text-xl font-bold text-yellow-500 line-clamp-2">
          {data?.title}
        </h2>
        <p className="line-clamp-2 text-sm md:text-base">{data?.description}</p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold text-base md:text-base">
            Category :{" "}
          </span>
          {data?.category}
        </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold text-base md:text-base">
            Total Lectures :{" "}
          </span>
          {data?.numbersOfLectures}
        </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold text-base md:text-base">
            Instructor :{" "}
          </span>
          {data?.createdBy}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
