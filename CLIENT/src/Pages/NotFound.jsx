import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1a2238]">
      <h2 className="text-9xl text-white font-extrabold tracking-wide">404</h2>
      <div className="bg-black text-white px-4 text-md rounded rotate-15 absolute">
        Page Not Found...
      </div>

      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#ff6a3d] group active:text-yellow-500 focus:outline-none focus:ring">
          <span
            onClick={() => navigate(-1)}
            className="relative block px-8 py-3 bg-[#1a2238] border border-current cursor-pointer"
          >
            Go Back
          </span>
        </a>
      </button>
    </div>
  );
}

export default NotFound;
