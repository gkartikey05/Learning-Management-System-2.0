import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer className="w-full py-5 px-4 sm:px-10 md:px-20 bg-gray-800 text-white flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0 text-center">
      <section className="text-base md:text-lg">
        © Copyright {year} | All rights reserved
      </section>

      <section className="flex items-center justify-center gap-12 text-2xl sm:gap-4 sm:text-2xl">
        <Link
          to={"#"}
          className="hover:text-yellow-500 transition duration-200 ease-in-out"
        >
          <BsFacebook />
        </Link>
        <Link
          to={"#"}
          className="hover:text-yellow-500 transition duration-200 ease-in-out"
        >
          <BsTwitterX />
        </Link>
        <Link
          to={"#"}
          className="hover:text-yellow-500 transition duration-200 ease-in-out"
        >
          <BsInstagram />
        </Link>
        <Link
          to={"#"}
          className="hover:text-yellow-500 transition duration-200 ease-in-out"
        >
          <BsLinkedin />
        </Link>
      </section>
    </footer>
  );
}

export default Footer;
