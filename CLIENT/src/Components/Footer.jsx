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
    <footer className="w-full pt-2.5 pb-1.5 px-4 sm:py-3 sm:px-10 lg:px-16 bg-gray-800 text-white flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-0 text-center">
      <section className="text-sm md:text-base">
        © Copyright {year} | All rights reserved
      </section>

      <section className="flex items-center justify-center gap-11 text-2xl sm:gap-6 lg:gap-8 sm:text-2xl">
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
