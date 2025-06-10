import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutSuccess() {
  return (
    <HomeLayout>
      <div className="min-h-[89vh] flex items-center justify-center text-white">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h2 className="bg-green-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment Successful
          </h2>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">
                Welcome to the Pro Bundle
              </h3>
              <p className="text-left">
                Now you can enjoy the taste of learning from our vast library of
                courses from the top subject matter experts of the industry
              </p>
            </div>

            <AiFillCheckCircle className="text-5xl text-green-500" />
          </div>

          <Link
            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
            to={"/"}
          >
            <button>Go to Dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
