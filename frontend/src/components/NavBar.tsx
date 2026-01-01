import React from "react";
import { Link } from "react-router";

const NavBar: React.FC = () => {
  return (
    <nav className="w-full py-3 px-6 md:px-12 flex items-center justify-between fixed top-0 z-50 shadow-md">
      <Link to={"/"} className="w-full font-bold">
        Rubik's Timer
      </Link>
      <ul className=" w-full flex justify-end gap-10 items-center">
        <li>
          <Link to={"/login"} className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
        </li>
        <li>
          <Link to={"/profile"} className="text-gray-600 hover:text-gray-900">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
