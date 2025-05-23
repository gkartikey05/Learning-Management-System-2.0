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
    <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20">
      <section className="text-lg">
        Copyright {year} | All rights reserved
      </section>
      <section className="flex items-center justify-center gap-5 text-2xl text-white">
        <Link to={"#"} className="hover:text-yellow-500 transition-all duration-200 ease-in-out">
          <BsFacebook />
        </Link>
        <Link to={"#"} className="hover:text-yellow-500 transition-all duration-200 ease-in-out">
          <BsTwitterX />
        </Link>
        <Link to={"#"} className="hover:text-yellow-500 transition-all duration-200 ease-in-out">
          <BsInstagram />
        </Link>
        <Link to={"#"} className="hover:text-yellow-500 transition-all duration-200 ease-in-out">
          <BsLinkedin />
        </Link>
      </section>
    </footer>
  );
}

export default Footer;
